import axios from 'axios';
import { Connection, PublicKey, Keypair, Transaction, VersionedTransaction, sendAndConfirmVersionedTransaction } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import BN from 'bn.js';

// Environment variables
const JUPITER_QUOTE_API = 'https://quote-api.jup.ag/v6';
const JUPITER_SWAP_API = 'https://quote-api.jup.ag/v6/swap';
const SOLANA_RPC_URL = process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com';
const PLY_MINT_ADDRESS = process.env.PLY_MINT_ADDRESS || ''; // e.g., PLY token mint

const connection = new Connection(SOLANA_RPC_URL, 'confirmed');

/**
 * Interface for Jupiter swap quote response.
 */
interface JupiterQuote {
  inputMint: string;
  inAmount: string;
  outputMint: string;
  outAmount: string;
  otherAmountThreshold: string;
  slippageBps: number;
  platformFee: { amount: string; mint: string; feeBps?: number } | null;
  priceImpactPct: string;
  routePlan: Array<{
    swapInfo: {
      ammKey: string;
      label: string;
      inputMint: string;
      outputMint: string;
      inAmount: string;
      outAmount: string;
      feeAmount: string;
      feeMint: string;
      labelOut: string;
      percentage?: number;
    };
  }>;
}

/**
 * Interface for Jupiter swap transaction response.
 */
interface JupiterSwapResponse {
  swapTransaction: string; // Base64-encoded transaction
}

/**
 * Polymers Protocol Jupiter Swap Client for token swaps (e.g., PLY <-> SOL).
 */
export class PolymersJupiterClient {
  private wallet: Keypair;

  constructor(wallet: Keypair) {
    this.wallet = wallet;
  }

  /**
   * Fetches a swap quote from Jupiter API.
   * @param inputMint Input token mint address.
   * @param outputMint Output token mint address.
   * @param amount Input amount (in smallest unit, e.g., lamports for SOL).
   * @param slippageBps Slippage tolerance in basis points (e.g., 50 = 0.5%).
   * @returns Quote details.
   */
  async getQuote(
    inputMint: string,
    outputMint: string,
    amount: string,
    slippageBps: number = 50
  ): Promise<JupiterQuote> {
    try {
      const response = await axios.get(`${JUPITER_QUOTE_API}/quote`, {
        params: {
          inputMint,
          outputMint,
          amount,
          slippageBps,
          onlyDirectRoutes: 'false', // Allow multi-hop routes
          asLegacyTransaction: 'false', // Use VersionedTransaction
        },
        timeout: 10000, // 10s timeout
      });

      if (response.status !== 200) {
        throw new Error(`Jupiter quote failed: ${response.status}`);
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`API error: ${error.response?.data?.error || error.message}`);
      }
      throw new Error(`Failed to fetch quote: ${error.message}`);
    }
  }

  /**
   * Executes a token swap using Jupiter API.
   * @param inputMint Input token mint address.
   * @param outputMint Output token mint address.
   * @param amount Input amount (in smallest unit).
   * @param slippageBps Slippage tolerance in basis points.
   * @returns Transaction signature.
   */
  async executeSwap(
    inputMint: string,
    outputMint: string,
    amount: string,
    slippageBps: number = 50
  ): Promise<string> {
    try {
      // Step 1: Get quote
      const quote: JupiterQuote = await this.getQuote(inputMint, outputMint, amount, slippageBps);

      // Step 2: Request swap transaction
      const swapResponse: JupiterSwapResponse = await axios.post(JUPITER_SWAP_API, {
        quoteResponse: quote,
        userPublicKey: this.wallet.publicKey.toString(),
        wrapAndUnwrapSol: true, // Auto-wrap/unwrap SOL if needed
        computeUnitPriceMicroLamports: 100000, // Priority fee for faster execution
        useSharedAccounts: true, // Optimize for repeated swaps
      });

      if (!swapResponse.data.swapTransaction) {
        throw new Error('No swap transaction received from Jupiter');
      }

      // Step 3: Deserialize and sign transaction
      const swapTransactionBuf = Buffer.from(swapResponse.data.swapTransaction, 'base64');
      const versionedTransaction = VersionedTransaction.deserialize(swapTransactionBuf);

      // Partial sign (Jupiter pre-signs, user signs the rest)
      versionedTransaction.sign([this.wallet]);

      // Step 4: Send and confirm transaction
      const signature = await sendAndConfirmVersionedTransaction(
        connection,
        versionedTransaction,
        [this.wallet], // Signers
        {
          commitment: 'confirmed',
          maxRetries: 3,
        }
      );

      return signature;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Swap API error: ${error.response?.data?.error || error.message}`);
      }
      throw new Error(`Failed to execute swap: ${error.message}`);
    }
  }

  /**
   * Convenience method for PLY to SOL swap (common in Polymers Protocol payments).
   * @param plyAmount PLY amount to swap (in smallest unit).
   * @param slippageBps Slippage tolerance.
   * @returns Transaction signature.
   */
  async swapPlyToSol(plyAmount: string, slippageBps: number = 50): Promise<string> {
    if (!PLY_MINT_ADDRESS) {
      throw new Error('PLY_MINT_ADDRESS not configured in .env');
    }

    const solMint = 'So11111111111111111111111111111111111111112'; // Wrapped SOL mint
    return await this.executeSwap(PLY_MINT_ADDRESS, solMint, plyAmount, slippageBps);
  }

  /**
   * Convenience method for SOL to PLY swap.
   * @param solAmount SOL amount to swap (in lamports).
   * @param slippageBps Slippage tolerance.
   * @returns Transaction signature.
   */
  async swapSolToPly(solAmount: string, slippageBps: number = 50): Promise<string> {
    if (!PLY_MINT_ADDRESS) {
      throw new Error('PLY_MINT_ADDRESS not configured in .env');
    }

    const solMint = 'So11111111111111111111111111111111111111112'; // Wrapped SOL mint
    return await this.executeSwap(solMint, PLY_MINT_ADDRESS, solAmount, slippageBps);
  }
}

export default PolymersJupiterClient;
