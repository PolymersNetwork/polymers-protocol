import {
  Connection,
  PublicKey,
  Keypair,
  TransactionInstruction,
  sendAndConfirmTransaction,
  VersionedTransaction,
  TransactionMessage
} from '@solana/web3.js';
import { Token, getAssociatedTokenAddress, TOKEN_PROGRAM_ID, NATIVE_MINT } from '@solana/spl-token';
import { Liquidity, TokenAmount, Percent, LIQUIDITY_STATE_LAYOUT_V4 } from '@raydium-io/raydium-sdk-v2';
import BN from 'bn.js';
import fetch from 'node-fetch';
import PolymersSolanaClient from './PolymersSolanaClient';

const RAYDIUM_LIQUIDITY_API = 'https://api.raydium.io/v2/sdk/liquidity/mainnet.json';
const STAKING_PROGRAM_ID = process.env.STAKING_PROGRAM_ID || '';
const PLY_MINT_ADDRESS = process.env.PLY_MINT_ADDRESS || '';

interface RewardClaimSwapDistribution {
  user: Keypair;
  nftMint: string;
  swapInputMint?: string;  // Token to swap to PLY (optional)
  swapSlippageBps?: number;
  payoutAmount?: bigint;   // Will be computed from claim if not provided
}

interface PoolAggregate {
  totalInput: bigint;
  recipients: { address: string; amount: bigint }[];
}

export class PolymersRewardsDistributor {
  private connection: Connection;
  private wallet: Keypair;
  private stakingClient: PolymersSolanaClient;

  constructor(connection: Connection, wallet: Keypair, stakingClient: PolymersSolanaClient) {
    this.connection = connection;
    this.wallet = wallet;
    this.stakingClient = stakingClient;
  }

  /** Fetch Raydium pool keys for a token pair */
  private async fetchPoolKeys(baseMint: PublicKey, quoteMint: PublicKey): Promise<any | null> {
    const response = await fetch(RAYDIUM_LIQUIDITY_API);
    const pools = await response.json();
    const pool = pools.official.find((p: any) =>
      (p.baseMint === baseMint.toString() && p.quoteMint === quoteMint.toString()) ||
      (p.baseMint === quoteMint.toString() && p.quoteMint === baseMint.toString())
    );
    if (!pool) return null;
    return {
      id: new PublicKey(pool.id),
      baseMint: new PublicKey(pool.baseMint),
      quoteMint: new PublicKey(pool.quoteMint),
      lpMint: new PublicKey(pool.lpMint),
      version: pool.version,
      programId: new PublicKey(pool.programId),
      authority: new PublicKey(pool.authority),
      openOrders: new PublicKey(pool.openOrders),
      targetOrders: new PublicKey(pool.targetOrders),
      baseVault: new PublicKey(pool.baseVault),
      quoteVault: new PublicKey(pool.quoteVault),
      withdrawQueue: new PublicKey(pool.withdrawQueue),
      lpVault: new PublicKey(pool.lpVault),
      marketVersion: pool.marketVersion,
      marketProgramId: new PublicKey(pool.marketProgramId),
      marketId: new PublicKey(pool.marketId),
      marketAuthority: new PublicKey(pool.marketAuthority),
      marketBaseVault: new PublicKey(pool.marketBaseVault),
      marketQuoteVault: new PublicKey(pool.marketQuoteVault),
      marketBids: new PublicKey(pool.marketBids),
      marketAsks: new PublicKey(pool.marketAsks),
      marketEventQueue: new PublicKey(pool.marketEventQueue),
    };
  }

  /** Compute swap output for a given input */
  private async computeAmountOut(poolKeys: any, inputAmount: TokenAmount, slippageBps: number = 50): Promise<TokenAmount> {
    const { minAmountOut } = await Liquidity.computeAmountOut({
      poolKeys,
      amountIn: inputAmount,
      currencyOut: inputAmount.token,
      slippage: new Percent(slippageBps, 10000),
    });
    return new TokenAmount(inputAmount.token, minAmountOut);
  }

  /** Create SPL token transfer instruction */
  private createTransferInstruction(from: PublicKey, to: PublicKey, owner: PublicKey, amount: BN) {
    return Token.createTransferInstruction(TOKEN_PROGRAM_ID, from, to, owner, [], amount);
  }

  /**
   * Main method: claim rewards → swap → distribute PLY
   * All in a single atomic transaction
   */
  async claimSwapDistribute(claims: RewardClaimSwapDistribution[]): Promise<string> {
    const allInstructions: TransactionInstruction[] = [];
    const allSigners: Keypair[] = [];

    // 1️⃣ Claim rewards for each user
    for (const claim of claims) {
      const stakingPDA = await PublicKey.findProgramAddress(
        [Buffer.from('staking'), new PublicKey(claim.nftMint).toBuffer(), claim.user.publicKey.toBuffer()],
        new PublicKey(STAKING_PROGRAM_ID)
      );

      const claimIx = await this.stakingClient.stakingProgram.instruction.claimRewards(new BN(0), {
        accounts: {
          stakingAccount: stakingPDA[0],
          user: claim.user.publicKey,
          tokenProgram: TOKEN_PROGRAM_ID,
        },
        signers: [claim.user],
      });

      allInstructions.push(claimIx);
      allSigners.push(claim.user);
    }

    // 2️⃣ Aggregate swaps per input token
    const poolMap = new Map<string, PoolAggregate>();
    for (const claim of claims) {
      const inputMint = claim.swapInputMint || PLY_MINT_ADDRESS;
      if (!poolMap.has(inputMint)) {
        poolMap.set(inputMint, { totalInput: BigInt(0), recipients: [] });
      }
      const pool = poolMap.get(inputMint)!;
      const payout = claim.payoutAmount || BigInt(0);
      pool.totalInput += payout;
      pool.recipients.push({ address: claim.user.publicKey.toString(), amount: payout });
    }

    // 3️⃣ Swap + distribute per pool
    for (const [inputMint, poolData] of poolMap.entries()) {
      if (poolData.totalInput === BigInt(0)) continue;

      const inputPub = new PublicKey(inputMint);
      const outputPub = new PublicKey(PLY_MINT_ADDRESS);

      const inputTokenAccount = await getAssociatedTokenAddress(inputPub, this.wallet.publicKey);
      const outputTokenAccount = await getAssociatedTokenAddress(outputPub, this.wallet.publicKey);

      const poolKeys = await this.fetchPoolKeys(inputPub, outputPub);
      if (!poolKeys) throw new Error(`Pool not found for ${inputMint}/PLY`);

      const inputAmountObj = new TokenAmount(new Token(TOKEN_PROGRAM_ID, inputPub, 9), new BN(poolData.totalInput.toString()));
      const outputAmountObj = await this.computeAmountOut(poolKeys, inputAmountObj, 50);

      // Raydium swap instruction
      const { innerTransaction: swapTx } = await Liquidity.makeSwapInstructionSimple({
        connection: this.connection,
        poolKeys,
        userKeys: { tokenAccountIn: inputTokenAccount, tokenAccountOut: outputTokenAccount, owner: this.wallet.publicKey },
        amountIn: inputAmountObj,
        amountOut: outputAmountObj,
        fixedSide: 'in',
        makeTxVersion: 0,
      });

      allInstructions.push(...swapTx.instructions);
      allSigners.push(...swapTx.signers);

      // Distribute PLY to recipients
      for (const recipient of poolData.recipients) {
        const recipientAccount = await getAssociatedTokenAddress(outputTokenAccount.mint, new PublicKey(recipient.address));
        allInstructions.push(this.createTransferInstruction(outputTokenAccount, recipientAccount, this.wallet.publicKey, new BN(recipient.amount)));
      }
    }

    // 4️⃣ Build VersionedTransaction
    const recentBlockhash = await this.connection.getLatestBlockhash('confirmed');
    const txMessage = new TransactionMessage({
      payerKey: this.wallet.publicKey,
      recentBlockhash: recentBlockhash.blockhash,
      instructions: allInstructions,
    });

    const versionedTx = new VersionedTransaction(txMessage);
    versionedTx.sign([this.wallet, ...allSigners]);

    // 5️⃣ Send & confirm
    const signature = await sendAndConfirmTransaction(this.connection, versionedTx, [this.wallet, ...allSigners], {
      maxRetries: 3,
      preflightCommitment: 'confirmed',
    });

    return signature;
  }
}
