import {
  Connection,
  PublicKey,
  Transaction,
  TransactionSignature,
  ParsedInstruction,
} from '@solana/web3.js';
import { encodeURL } from '@solana/pay';
import QRCode from 'qrcode';

// Environment setup
const connection = new Connection(process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com', 'confirmed');
const MERCHANT_WALLET = process.env.MERCHANT_WALLET ? new PublicKey(process.env.MERCHANT_WALLET) : null;
const PLY_MINT_ADDRESS = process.env.PLY_MINT_ADDRESS ? new PublicKey(process.env.PLY_MINT_ADDRESS) : null;

if (!MERCHANT_WALLET) {
  throw new Error('MERCHANT_WALLET not configured in .env');
}

export class SolanaPayClient {
  private merchantWallet: PublicKey;

  constructor(merchantWallet: PublicKey) {
    this.merchantWallet = merchantWallet;
  }

  async generatePaymentQR(
    amount: number,
    memo?: string,
    reference?: PublicKey,
    isPlyPayment: boolean = false
  ): Promise<{ url: string; qrCodeBase64: string }> {
    try {
      const splToken = isPlyPayment && PLY_MINT_ADDRESS ? PLY_MINT_ADDRESS : undefined;
      const paymentUrl = encodeURL({
        recipient: this.merchantWallet,
        amount,
        splToken,
        reference,
        memo,
        label: 'Polymers Protocol Payment',
        message: 'Payment for ESG contribution or reward',
      });

      const qrCodeBase64 = await QRCode.toDataURL(paymentUrl, { errorCorrectionLevel: 'H', margin: 2 });
      return { url: paymentUrl, qrCodeBase64 };
    } catch (error) {
      throw new Error(`Failed to generate QR code: ${error.message}`);
    }
  }

  async confirmPayment(
    signature: TransactionSignature,
    reference?: PublicKey,
    timeoutMs: number = 30000
  ): Promise<Transaction | null> {
    try {
      let tx = await connection.getTransaction(signature, {
        commitment: 'confirmed',
        maxSupportedTransactionVersion: 0,
      });

      if (!tx) {
        // Wait for confirmation if transaction not found
        console.log(`Waiting for transaction ${signature} confirmation...`);
        await connection.confirmTransaction(signature, 'confirmed');
        tx = await connection.getTransaction(signature, { commitment: 'confirmed' });
        if (!tx) {
          console.error(`Transaction ${signature} failed to confirm`);
          return null;
        }
      }

      // Verify merchant wallet is recipient
      const isRecipient = tx.transaction.message.instructions.some((ix: ParsedInstruction) =>
        ix.accounts?.some((acc) => acc.equals(this.merchantWallet))
      );
      if (!isRecipient) {
        throw new Error('Transaction recipient does not match merchant wallet');
      }

      // Verify reference key if provided
      if (reference) {
        const hasReference = tx.transaction.message.accountKeys.some((key) => key.equals(reference));
        if (!hasReference) {
          throw new Error('Reference key not found in transaction');
        }
      }

      return tx;
    } catch (error) {
      throw new Error(`Failed to confirm payment: ${error.message}`);
    }
  }

  async generateBatchPaymentQRs(
    payments: { amount: number; memo?: string; reference?: PublicKey; isPly?: boolean }[]
  ): Promise<{ url: string; qrCodeBase64: string; memo?: string; reference?: PublicKey }[]> {
    const results = await Promise.all(
      payments.map(async ({ amount, memo, reference, isPly }) =>
        this.generatePaymentQR(amount, memo, reference, isPly)
      )
    );
    return results;
  }

  async confirmBatchPayments(
    signatures: TransactionSignature[],
    references?: PublicKey[]
  ): Promise<(Transaction | null)[]> {
    return Promise.all(
      signatures.map((sig, i) => this.confirmPayment(sig, references ? references[i] : undefined))
    );
  }
}

export default SolanaPayClient;
