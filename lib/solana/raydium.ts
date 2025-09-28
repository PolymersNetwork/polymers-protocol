import { Connection, PublicKey, Keypair, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
import { Liquidity, Token, TokenAmount, Percent, MAINNET_PROGRAM_ID_AMM, LIQUIDITY_STATE_LAYOUT_V4 } from '@raydium-io/raydium-sdk-v2';
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { NATIVE_MINT } from '@solana/spl-token';
import BN from 'bn.js';
import Decimal from 'decimal.js';
import fetch from 'node-fetch'; // For pool data fetch

// Environment setup
const connection = new Connection(process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com', 'confirmed');
const RAYDIUM_LIQUIDITY_API = 'https://api.raydium.io/v2/sdk/liquidity/mainnet.json'; // Fetch pool keys

/**
 * Polymers Protocol Raydium Swap Client for AMM swaps.
 */
export class PolymersRaydiumClient {
  private wallet: Keypair;

  constructor(wallet: Keypair) {
    this.wallet = wallet;
  }

  /**
   * Fetches liquidity pool keys for a token pair.
   * @param baseMint Input token mint.
   * @param quoteMint Output token mint.
   * @returns Pool keys or null if not found.
   */
  async fetchPoolKeys(baseMint: PublicKey, quoteMint: PublicKey): Promise<any | null> {
    try {
      const response = await fetch(RAYDIUM_LIQUIDITY_API);
      const pools = await response.json();
      const officialPool = pools.official.find((pool: any) => 
        pool.baseMint === baseMint.toString() && pool.quoteMint === quoteMint.toString()
      );
      if (officialPool) {
        return {
          id: new PublicKey(officialPool.id),
          baseMint: new PublicKey(officialPool.baseMint),
          quoteMint: new PublicKey(officialPool.quoteMint),
          lpMint: new PublicKey(officialPool.lpMint),
          version: officialPool.version,
          programId: new PublicKey(officialPool.programId),
          authority: new PublicKey(officialPool.authority),
          openOrders: new PublicKey(officialPool.openOrders),
          targetOrders: new PublicKey(officialPool.targetOrders),
          baseVault: new PublicKey(officialPool.baseVault),
          quoteVault: new PublicKey(officialPool.quoteVault),
          withdrawQueue: new PublicKey(officialPool.withdrawQueue),
          lpVault: new PublicKey(officialPool.lpVault),
          marketVersion: officialPool.marketVersion,
          marketProgramId: new PublicKey(officialPool.marketProgramId),
          marketId: new PublicKey(officialPool.marketId),
          marketAuthority: new PublicKey(officialPool.marketAuthority),
          marketBaseVault: new PublicKey(officialPool.marketBaseVault),
          marketQuoteVault: new PublicKey(officialPool.marketQuoteVault),
          marketBids: new PublicKey(officialPool.marketBids),
          marketAsks: new PublicKey(officialPool.marketAsks),
          marketEventQueue: new PublicKey(officialPool.marketEventQueue),
        };
      }
      return null;
    } catch (error) {
      throw new Error(`Failed to fetch pool keys: ${error.message}`);
    }
  }

  /**
   * Computes swap quote (expected output amount).
   * @param poolKeys Pool keys.
   * @param inputAmount Input amount (TokenAmount).
   * @param slippageBps Slippage tolerance (default: 50 = 0.5%).
   * @returns Expected output amount.
   */
  async computeAmountOut(
    poolKeys: any,
    inputAmount: TokenAmount,
    slippageBps: number = 50
  ): Promise<TokenAmount> {
    try {
      const { amountOut, minAmountOut } = await Liquidity.computeAmountOut({
        poolKeys,
        amountIn: inputAmount,
        currencyOut: inputAmount.token, // Assume same token type
        slippage: new Percent(slippageBps, 10000),
      });
      return new TokenAmount(inputAmount.token, minAmountOut);
    } catch (error) {
      throw new Error(`Failed to compute amount out: ${error.message}`);
    }
  }

  /**
   * Executes a token swap using Raydium AMM.
   * @param inputMint Input token mint.
   * @param outputMint Output token mint.
   * @param inputAmount Input amount (raw, e.g., lamports).
   * @param slippageBps Slippage tolerance.
   * @returns Transaction signature.
   */
  async executeSwap(
    inputMint: string,
    outputMint: string,
    inputAmount: string,
    slippageBps: number = 50
  ): Promise<string> {
    try {
      const inputToken = new Token(TOKEN_PROGRAM_ID, new PublicKey(inputMint), 9); // Assume 9 decimals; adjust per token
      const outputToken = new Token(TOKEN_PROGRAM_ID, new PublicKey(outputMint), 6); // e.g., USDC 6 decimals
      const inputAmountObj = new TokenAmount(inputToken, new BN(inputAmount));

      // Fetch pool keys
      const poolKeys = await this.fetchPoolKeys(new PublicKey(inputMint), new PublicKey(outputMint));
      if (!poolKeys) {
        throw new Error('Pool not found');
      }

      // Compute output amount
      const outputAmount = await this.computeAmountOut(poolKeys, inputAmountObj, slippageBps);

      // Get associated token accounts
      const inputTokenAccount = await getAssociatedTokenAddress(inputToken.mint, this.wallet.publicKey);
      const outputTokenAccount = await getAssociatedTokenAddress(outputToken.mint, this.wallet.publicKey);

      // Fetch pool state
      const poolState = await connection.getAccountInfo(poolKeys.id);
      if (!poolState) throw new Error('Pool state not found');
      const liquidityState = LIQUIDITY_STATE_LAYOUT_V4.decode(poolState.data);

      // Make swap transaction
      const { transaction, signers } = await Liquidity.makeSwapTransaction({
        connection,
        poolKeys,
        userKeys: {
          tokenAccountIn: inputTokenAccount,
          tokenAccountOut: outputTokenAccount,
          owner: this.wallet.publicKey,
        },
        amountIn: inputAmountObj,
        amountOut: outputAmount,
        fixedSide: 'in', // Fixed input amount
        makeTxVersion: 0, // Legacy transaction
      });

      // Sign and send
      transaction.sign([this.wallet, ...signers]);
      const signature = await sendAndConfirmTransaction(connection, transaction, [this.wallet, ...signers], {
        commitment: 'confirmed',
        maxRetries: 3,
      });

      return signature;
    } catch (error) {
      throw new Error(`Swap execution failed: ${error.message}`);
    }
  }

  /**
   * Convenience method for PLY to SOL swap.
   * @param plyAmount PLY amount (raw).
   * @param slippageBps Slippage tolerance.
   * @returns Transaction signature.
   */
  async swapPlyToSol(plyAmount: string, slippageBps: number = 50): Promise<string> {
    if (!process.env.PLY_MINT_ADDRESS) {
      throw new Error('PLY_MINT_ADDRESS not configured');
    }
    const solMint = NATIVE_MINT.toString();
    return this.executeSwap(process.env.PLY_MINT_ADDRESS, solMint, plyAmount, slippageBps);
  }

  /**
   * Convenience method for SOL to PLY swap.
   * @param solAmount SOL amount (lamports).
   * @param slippageBps Slippage tolerance.
   * @returns Transaction signature.
   */
  async swapSolToPly(solAmount: string, slippageBps: number = 50): Promise<string> {
    if (!process.env.PLY_MINT_ADDRESS) {
      throw new Error('PLY_MINT_ADDRESS not configured');
    }
    const solMint = NATIVE_MINT.toString();
    return this.executeSwap(solMint, process.env.PLY_MINT_ADDRESS, solAmount, slippageBps);
  }
}

export default PolymersRaydiumClient;
