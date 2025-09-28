import { Connection, PublicKey, Keypair, Transaction, TransactionInstruction } from '@solana/web3.js';
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID, createTransferInstruction } from '@solana/spl-token';
import PolymersRaydiumClient from '../solana/raydium';
import BN from 'bn.js';

// Environment setup
const connection = new Connection(process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com', 'confirmed');
const PLY_MINT_ADDRESS = process.env.PLY_MINT_ADDRESS || '';

interface Recipient {
  user: PublicKey;
  nftMint: PublicKey;
}

interface StubReward {
  rewards: BN;
  instruction: TransactionInstruction;
}

/**
 * Devnet-ready PolymersRewardsDistributor stub
 * Simulates claim → swap → distribute pipeline
 */
export class PolymersRewardsDistributor {
  private wallet: Keypair;
  private raydiumClient: PolymersRaydiumClient;

  constructor(wallet: Keypair) {
    this.wallet = wallet;
    this.raydiumClient = new PolymersRaydiumClient(wallet);
  }

  /**
   * Claims rewards (stub), swaps SOL→PLY, distributes PLY to recipients.
   * @param recipients Array of { user, nftMint }
   * @param slippageBps Slippage tolerance (default: 50 = 0.5%)
   * @returns Transaction signature
   */
  async claimSwapDistributeBatch(recipients: Recipient[], slippageBps: number = 50): Promise<string> {
    if (recipients.length === 0) throw new Error('No recipients provided');

    // Step 1: Stub claim rewards
    const stubRewards: StubReward[] = recipients.map((r) => ({
      rewards: new BN(1_000_000_000), // 1 SOL per recipient (mock)
      instruction: new TransactionInstruction({
        keys: [],
        programId: new PublicKey('11111111111111111111111111111111'), // dummy
        data: Buffer.alloc(0),
      }),
    }));

    const totalSol = stubRewards.reduce((acc, r) => acc.add(r.rewards), new BN(0));

    console.log(`💰 Total mock rewards to swap: ${totalSol.toString()} lamports`);

    // Step 2: Swap total SOL to PLY via Raydium
    const swapSignature = await this.raydiumClient.batchSwapSolToPly([totalSol.toString()], slippageBps);
    console.log(`🔁 Mock swap executed, signature: ${swapSignature}`);

    // Step 3: Distribute PLY equally to recipients
    const plyMint = new PublicKey(PLY_MINT_ADDRESS);
    const distributorPlyAccount = await getAssociatedTokenAddress(plyMint, this.wallet.publicKey);

    const instructions: TransactionInstruction[] = [];
    const signers: Keypair[] = [this.wallet];

    const rewardPerRecipient = totalSol.div(new BN(recipients.length));

    for (const r of recipients) {
      const recipientPlyAccount = await getAssociatedTokenAddress(plyMint, r.user);

      const transferIx = createTransferInstruction(
        distributorPlyAccount,
        recipientPlyAccount,
        this.wallet.publicKey,
        rewardPerRecipient
      );

      instructions.push(transferIx);
    }

    // Build transaction
    const recentBlockhash = await connection.getLatestBlockhash('confirmed');
    const tx = new Transaction({
      recentBlockhash: recentBlockhash.blockhash,
      feePayer: this.wallet.publicKey,
    });
    tx.add(...instructions);

    tx.sign(signers);
    const signature = await connection.sendTransaction(tx, signers, {
      maxRetries: 3,
      preflightCommitment: 'confirmed',
    });
    await connection.confirmTransaction(signature, 'confirmed');

    console.log(`✅ PLY distributed to recipients, signature: ${signature}`);
    return signature;
  }
}

export default PolymersRewardsDistributor;
