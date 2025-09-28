import {
  Connection,
  Keypair,
  PublicKey,
  TransactionInstruction,
} from "@solana/web3.js";
import {
  Liquidity,
  Token,
  TokenAmount,
  Percent,
  LIQUIDITY_STATE_LAYOUT_V4,
} from "@raydium-io/raydium-sdk-v2";
import {
  getAssociatedTokenAddress,
  createTransferInstruction,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { NATIVE_MINT } from "@solana/spl-token";
import BN from "bn.js";
import fetch from "node-fetch";

const RAYDIUM_LIQUIDITY_API =
  "https://api.raydium.io/v2/sdk/liquidity/mainnet.json";

export interface SwapIxParams {
  fromMint: string;
  toMint: string;
  amountIn: string; // raw lamports
  slippageBps?: number;
}

export interface TransferIxParams {
  to: PublicKey;
  mint: string;
  amount: string;
}

/**
 * Polymers Protocol Raydium Client
 * - Fetch pool keys
 * - Build optimized swap & transfer instructions
 * - Execute swaps directly if needed
 */
export class PolymersRaydiumClient {
  readonly wallet: Keypair;
  private connection: Connection;

  constructor(wallet: Keypair, connection?: Connection) {
    this.wallet = wallet;
    this.connection =
      connection ||
      new Connection(process.env.SOLANA_RPC_URL || "https://api.devnet.solana.com");
  }

  /**
   * Fetch liquidity pool keys for a pair
   */
  async fetchPoolKeys(
    baseMint: PublicKey,
    quoteMint: PublicKey
  ): Promise<any | null> {
    const response = await fetch(RAYDIUM_LIQUIDITY_API);
    const pools = await response.json();

    const pool = pools.official.find(
      (p: any) =>
        (p.baseMint === baseMint.toString() &&
          p.quoteMint === quoteMint.toString()) ||
        (p.baseMint === quoteMint.toString() &&
          p.quoteMint === baseMint.toString())
    );

    return pool || null;
  }

  /**
   * Build a swap instruction (without sending)
   */
  async buildSwapIx(params: SwapIxParams): Promise<TransactionInstruction> {
    const { fromMint, toMint, amountIn, slippageBps = 50 } = params;

    const fromToken = new Token(TOKEN_PROGRAM_ID, new PublicKey(fromMint), 9);
    const toToken = new Token(TOKEN_PROGRAM_ID, new PublicKey(toMint), 9);

    const poolKeys = await this.fetchPoolKeys(
      new PublicKey(fromMint),
      new PublicKey(toMint)
    );
    if (!poolKeys) throw new Error("Pool not found");

    const inputAmountObj = new TokenAmount(fromToken, new BN(amountIn));

    const { amountOut, minAmountOut } = await Liquidity.computeAmountOut({
      poolKeys,
      amountIn: inputAmountObj,
      currencyOut: toToken,
      slippage: new Percent(slippageBps, 10000),
    });

    const ataIn = await getAssociatedTokenAddress(
      fromToken.mint,
      this.wallet.publicKey
    );
    const ataOut = await getAssociatedTokenAddress(
      toToken.mint,
      this.wallet.publicKey
    );

    const { innerTransaction } = await Liquidity.makeSwapInstructionSimple({
      connection: this.connection,
      poolKeys,
      userKeys: {
        tokenAccountIn: ataIn,
        tokenAccountOut: ataOut,
        owner: this.wallet.publicKey,
      },
      amountIn: inputAmountObj,
      amountOut: new TokenAmount(toToken, minAmountOut),
      fixedSide: "in",
    });

    return innerTransaction.instructions[0]; // simplified single ix
  }

  /**
   * Build transfer instruction for payouts
   */
  async buildTransferIx(params: TransferIxParams): Promise<TransactionInstruction> {
    const { to, mint, amount } = params;

    const ataSrc = await getAssociatedTokenAddress(
      new PublicKey(mint),
      this.wallet.publicKey
    );
    const ataDst = await getAssociatedTokenAddress(new PublicKey(mint), to);

    return createTransferInstruction(
      ataSrc,
      ataDst,
      this.wallet.publicKey,
      BigInt(amount),
      [],
      TOKEN_PROGRAM_ID
    );
  }

  /**
   * Direct convenience method: swap PLY <-> SOL
   */
  async swapPlyToSol(amount: string): Promise<TransactionInstruction> {
    if (!process.env.PLY_MINT_ADDRESS) {
      throw new Error("PLY_MINT_ADDRESS not set");
    }
    return this.buildSwapIx({
      fromMint: process.env.PLY_MINT_ADDRESS,
      toMint: NATIVE_MINT.toString(),
      amountIn: amount,
    });
  }

  async swapSolToPly(amount: string): Promise<TransactionInstruction> {
    if (!process.env.PLY_MINT_ADDRESS) {
      throw new Error("PLY_MINT_ADDRESS not set");
    }
    return this.buildSwapIx({
      fromMint: NATIVE_MINT.toString(),
      toMint: process.env.PLY_MINT_ADDRESS,
      amountIn: amount,
    });
  }
}

export default PolymersRaydiumClient;
