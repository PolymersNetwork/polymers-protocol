import { Connection, PublicKey, Transaction, TransactionSignature, SystemProgram } from '@solana/web3.js';
import { encodeURL } from '@solana/pay';
import QRCode from 'qrcode';
import BN from 'bn.js';

// Environment setup
const connection = new Connection(process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com', 'confirmed');
const MERCHANT_WALLET = process.env.MERCHANT_WALLET ? new PublicKey(process.env.MERCHANT_WALLET) : null;

if (!MERCHANT_WALLET) {
  throw new Error('MERCHANT_WALLET not configured in .env');
}

/**
 * Solana Pay utilities for generating QR codes and confirming payments.
 */
export class SolanaPayClient {
  private merchantWallet: PublicKey;

  constructor(merchantWallet: PublicKey) {
    this.merchantWallet = merchantWallet;
  }

  /**
   * Generates a Solana Pay QR code for a SOL payment.
   * @param amount Amount in SOL (e.g., 0.1 for 0.1 SOL)
   * @param memo Optional memo for tracking (e.g., "SmartBin_123")
   * @param reference Optional reference public key for tracking
   * @returns QR code URL and base64-encoded image
   */
  async generatePaymentQR(
    amount: number,
    memo?: string,
    reference?: PublicKey
  ): Promise<{ url: string; qrCodeBase64: string }> {
    const paymentUrl = encodeURL({
      recipient: this.merchantWallet,
      amount,
      reference,
      memo,
      label: 'Polymers Protocol Payment',
      message: 'Payment for ESG contribution or reward',
    });

    const qrCodeBase64 = await QRCode.toDataURL(paymentUrl, { errorCorrectionLevel: 'H', margin: 2 });
    return { url: paymentUrl, qrCodeBase64 };
  }

  /**
   * Confirms a SOL payment transaction by checking recipient and optional reference.
   * @param signature Transaction signature from wallet
   * @param reference Optional reference public key to verify payment
   * @returns Transaction details or null if not confirmed
   */
  async confirmPayment(signature: TransactionSignature, reference?: PublicKey): Promise<Transaction | null> {
    const tx = await connection.getTransaction(signature, { commitment: 'confirmed' });
    if (!tx) return null;

    // Ensure merchant wallet is recipient
    const recipientIx = tx.transaction.message.instructions.find((ix) =>
      ix.keys.some((k) => k.pubkey.equals(this.merchantWallet))
    );
    if (!recipientIx) throw new Error('Transaction recipient does not match merchant wallet');

    // Verify reference if provided
    if (reference) {
      const refFound = tx.transaction.message.accountKeys.some((k) => k.equals(reference));
      if (!refFound) throw new Error('Reference key not found in transaction');
    }

    return tx;
  }

  /**
   * Generates multiple payment QR codes at once.
   * @param payments Array of { amount, memo, reference }
   * @returns Array of { url, qrCodeBase64, memo, reference }
   */
  async generateBatchPaymentQRs(
    payments: { amount: number; memo?: string; reference?: PublicKey }[]
  ): Promise<{ url: string; qrCodeBase64: string; memo?: string; reference?: PublicKey }[]> {
    return Promise.all(
      payments.map(async ({ amount, memo, reference }) => {
        const { url, qrCodeBase64 } = await this.generatePaymentQR(amount, memo, reference);
        return { url, qrCodeBase64, memo, reference };
      })
    );
  }

  /**
   * Confirms multiple payment transactions.
   * @param signatures Array of transaction signatures
   * @param references Optional array of reference keys
   * @returns Array of confirmed transactions or null
   */
  async confirmBatchPayments(
    signatures: TransactionSignature[],
    references?: PublicKey[]
  ): Promise<(Transaction | null)[]> {
    return Promise.all(
      signatures.map(async (sig, idx) => {
        const reference = references ? references[idx] : undefined;
        return this.confirmPayment(sig, reference);
      })
    );
  }
}

export default SolanaPayClient;
