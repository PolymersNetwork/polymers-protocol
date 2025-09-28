import { Connection, PublicKey, Keypair, Transaction, TransactionInstruction } from '@solana/web3.js';
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import PolymersSolanaClient from '../solana/hivemapper';
import PolymersRaydiumClient from '../solana/raydium';
import BN from 'bn.js';

// Environment setup
const connection = new Connection(process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com', 'confirmed');
const PLY_MINT_ADDRESS = process.env.PLY_MINT_ADDRESS || '';
const MAX_TX_SIZE = 1232; // Solana transaction size limit in bytes

/**
 * Interface for staking account data (extend as needed).
 */
interface StakingAccount {
  owner: PublicKey;
  nftMint: PublicKey;
  stakedAt: BN;
  esgPoints: number; // Assume stored in StakingAccount
  rewards: BN; // Pending rewards in lamports
}

/**
 * Polymers Protocol Rewards Distributor for batch claim, swap, and distribution.
 */
export class PolymersRewardsDistributor {
  private wallet: Keypair;
  private solanaClient: PolymersSolanaClient;
  private raydiumClient: PolymersRaydiumClient;

  constructor(wallet: Keypair) {
    this.wallet = wallet;
    this.solanaClient = new PolymersSolanaClient(wallet);
    this.raydiumClient = new PolymersRaydiumClient(wallet);
  }

  /**
   * Claims staking rewards, swaps SOL to PLY, and distributes to recipients in batched transactions.
   * @param recipients Array of { user, nftMint } for reward claims.
   * @param slippageBps Slippage tolerance for swaps (default: 50 = 0.5%).
   * @returns Array of transaction signatures.
   */
  async claimSwapDistributeBatch(
    recipients: { user: PublicKey; nftMint: PublicKey }[],
    slippageBps: number = 50
  ): Promise<string[]> {
    try {
      if (recipients.length === 0) throw new Error('No recipients provided');

      const signatures: string[] = [];
      const instructions: TransactionInstruction[] = [];
      const signers: Keypair[] = [this.wallet];
      let totalSolToSwap = new BN(0);
      const rewardShares: { user: PublicKey; amount: BN }[] = [];

      // Step 1: Claim rewards and calculate proportional shares
      let totalEsgPoints = 0;
      const stakingAccounts: { user: PublicKey; account: StakingAccount }[] = [];

      for (const { user, nftMint } of recipients) {
        const stakingAccount = await this.solanaClient.getStakingAccount(user, nftMint);
        if (!stakingAccount) throw new Error(`No staking account for ${user.toBase58()}/${nftMint.toBase58()}`);

        const { instruction, rewards } = await this.solanaClient.claimRewards(this.wallet, nftMint);
        instructions.push(instruction);
        totalSolToSwap = totalSolToSwap.add(new BN(rewards));

        // Use ESG points or staking duration for proportional rewards
        const esgPoints = stakingAccount.esgPoints || this.calculateEsgPointsFromDuration(stakingAccount.stakedAt);
        totalEsgPoints += esgPoints;
        stakingAccounts.push({ user, account: stakingAccount });
      }

      // Calculate proportional shares
      for (const { user, account } of stakingAccounts) {
        const esgPoints = account.esgPoints || this.calculateEsgPointsFromDuration(account.stakedAt);
        const share = totalEsgPoints > 0 ? (esgPoints / totalEsgPoints) * Number(totalSolToSwap) : 0;
        rewardShares.push({ user, amount: new BN(Math.floor(share)) });
      }

      // Step 2: Batch swap SOL to PLY
      if (totalSolToSwap.gt(new BN(0))) {
        const swapSignature = await this.raydiumClient.batchSwapSolToPly([totalSolToSwap.toString()], slippageBps);
        const swapTx = await connection.getTransaction(swapSignature, { commitment: 'confirmed' });
        if (swapTx) {
          instructions.push(...swapTx.transaction.message.instructions);
        }
      } else {
        throw new Error('No SOL to swap');
      }

      // Step 3: Distribute PLY to recipients in batches
      const plyMint = new PublicKey(PLY_MINT_ADDRESS);
      const distributorPlyAccount = await getAssociatedTokenAddress(plyMint, this.wallet.publicKey);
      const transferInstructions: TransactionInstruction[] = [];

      for (const { user, amount } of rewardShares) {
        if (amount.lte(new BN(0))) continue; // Skip zero rewards
        const recipientPlyAccount = await getAssociatedTokenAddress(plyMint, user);
        const transferInstruction = await this.createTransferInstruction(
          distributorPlyAccount,
          recipientPlyAccount,
          amount
        );
        transferInstructions.push(transferInstruction);
      }

      // Batch transfers to stay under 1232-byte limit
      const batchedInstructions = this.batchInstructions(transferInstructions);
      for (const batch of batchedInstructions) {
        const recentBlockhash = await connection.getLatestBlockhash('confirmed');
        const transaction = new Transaction({
          recentBlockhash: recentBlockhash.blockhash,
          feePayer: this.wallet.publicKey,
        });
        transaction.add(...instructions, ...batch);

        transaction.sign(signers);
        const signature = await connection.sendTransaction(transaction, signers, {
          maxRetries: 3,
          preflightCommitment: 'confirmed',
        });
        await connection.confirmTransaction(signature, 'confirmed');
        signatures.push(signature);
      }

      return signatures;
    } catch (error) {
      throw new Error(`Batch reward distribution failed: ${error.message}`);
    }
  }

  /**
   * Calculates ESG points based on staking duration (fallback if not stored).
   * @param stakedAt Timestamp (BN) when NFT was staked.
   * @returns ESG points (e.g., 1 point per day staked).
   */
  private calculateEsgPointsFromDuration(stakedAt: BN): number {
    const now = Math.floor(Date.now() / 1000);
    const daysStaked = Math.floor((now - stakedAt.toNumber()) / (24 * 60 * 60));
    return Math.max(1, daysStaked); // 1 point per day, minimum 1
  }

  /**
   * Batches instructions to stay under transaction size limit.
   * @param instructions Array of instructions.
   * @returns Array of instruction batches.
   */
  private batchInstructions(instructions: TransactionInstruction[]): TransactionInstruction[][] {
    const batches: TransactionInstruction[][] = [];
    let currentBatch: TransactionInstruction[] = [];
    let currentSize = 0;

    for (const instruction of instructions) {
      const sizeEstimate = instruction.data.length + 32 * instruction.keys.length; // Rough estimate
      if (currentSize + sizeEstimate > MAX_TX_SIZE - 100) {
        batches.push(currentBatch);
        currentBatch = [];
        currentSize = 0;
      }
      currentBatch.push(instruction);
      currentSize += sizeEstimate;
    }

    if (currentBatch.length > 0) {
      batches.push(currentBatch);
    }

    return batches;
  }

  /**
   * Creates a token transfer instruction for PLY distribution.
   * @param source Source ATA.
   * @param destination Destination ATA.
   * @param amount Amount to transfer.
   * @returns Transfer instruction.
   */
  private async createTransferInstruction(
    source: PublicKey,
    destination: PublicKey,
    amount: BN
  ): Promise<TransactionInstruction> {
    return require('@solana/spl-token').createTransferInstruction(
      source,
      destination,
      this.wallet.publicKey,
      amount,
      [],
      TOKEN_PROGRAM_ID
    );
  }
}

export default PolymersRewardsDistributor;
