import {
 Connection,
 PublicKey,
 Transaction,
 TransactionSignature,
 SystemProgram,
 ParsedInstruction,
} from '@solana/web3.js';
import { encodeURL } from '@solana/pay';
import QRCode from 'qrcode';
import BN from 'bn.js';

// Environment setup
const connection = new Connection(process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com', 'confirmed');
const MERCHANT_WALLET = process.env.MERCHANT_WALLET ? new PublicKey(process.env.MERCHANT_WALLET) : null;
const PLY_MINT_ADDRESS = process.env.PLY_MINT_ADDRESS ? new PublicKey(process.env.PLY_MINT_ADDRESS) : null;

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
 * Generates a Solana Pay QR code for a SOL or PLY payment.
 * @param amount Amount in SOL or PLY (e.g., 0.1 for 0.1 SOL).
 * @param memo Optional memo for tracking (e.g., "SmartBin_123").
 * @param reference Optional reference public key for tracking.
 * @param isPlyPayment Use PLY token instead of SOL (default: false).
 * @returns QR code URL and base64-encoded image.
 */
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

 /**
 * Confirms a SOL or PLY payment transaction by checking recipient and optional reference.
 * @param signature Transaction signature from wallet.
 * @param reference Optional reference public key to verify payment.
 * @param timeoutMs Timeout for confirmation (default: 30s).
 * @returns Transaction details or null if not confirmed.
 */
 async confirmPayment(
 signature: TransactionSignature,
 reference?: PublicKey,
 timeoutMs: number = 30000
 ): Promise<Transaction | null> {
 try {
 const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('confirmed');
 const tx = await connection.getTransaction(signature, {
 commitment: 'confirmed',
 maxSupportedTransactionVersion: 0,
 });

 if (!tx) {
 console.log(`Transaction ${signature} not found, waiting for confirmation...`);
 await connection.confirmTransaction(
 { signature, blockhash, lastValidBlockHeight },
 'confirmed',
 { timeout: timeoutMs }
 );
 const confirmedTx = await connection.getTransaction(signature, { commitment: 'confirmed' });
 if (!confirmedTx) {
 console.error(`Transaction ${signature} failed to confirm within ${timeoutMs}ms`);
 return null;
 }
 return confirmedTx;
 }

 // Ensure merchant wallet is recipient
 const recipientIx = tx.transaction.message.instructions.find((ix: ParsedInstruction) =>
 ix.accounts?.some((k) => k.equals(this.merchantWallet))
 );
 if (!recipientIx) {
 console.error(`Transaction ${signature} recipient does not match merchant wallet`);
 throw new Error('Transaction recipient does not match merchant wallet');
 }

 // Verify reference if provided
 if (reference) {
 const refFound = tx.transaction.message.accountKeys.some((k) => k.equals(reference));
 if (!refFound) {
 console.error(`Reference key ${reference.toBase58()} not found in transaction ${signature}`);
 throw new Error('Reference key not found in transaction');
 }
 }

 console.log(`Transaction ${signature} confirmed for merchant wallet ${this.merchantWallet.toBase58()}`);
 return tx;
 } catch (error) {
 throw new Error(`Failed to confirm payment: ${error.message}`);
 }
 }

 /**
 * Generates multiple payment QR codes at once.
 * @param payments Array of { amount, memo, reference, isPlyPayment }.
 * @returns Array of { url, qrCodeBase64, memo, reference }.
 */
 async generateBatchPaymentQRs(
 payments: { amount: number; memo?: string; reference?: PublicKey; isPlyPayment?: boolean }[]
 ): Promise<{ url: string; qrCodeBase64: string; memo?: string; reference?: PublicKey }[]> {
 try {
 return await Promise.all(
 payments.map(async ({ amount, memo, reference, isPlyPayment }) => {
 const { url, qrCodeBase64 } = await this.generatePaymentQR(amount, memo, reference, isPlyPayment);
 return { url, qrCodeBase64, memo, reference };
 })
 );
 } catch (error) {
 throw new Error(`Failed to generate batch QR codes: ${error.message}`);
 }
 }

 /**
 * Confirms multiple payment transactions.
 * @param signatures Array of transaction signatures.
 * @param references Optional array of reference keys.
 * @param timeoutMs Timeout for confirmation (default: 30s).
 * @returns Array of confirmed transactions or null.
 */
 async confirmBatchPayments(
 signatures: TransactionSignature[],
 references?: PublicKey[],
 timeoutMs: number = 30000
 ): Promise<(Transaction | null)[]> {
 try {
 return await Promise.all(
 signatures.map(async (sig, idx) => {
 const reference = references ? references[idx] : undefined;
 return await this.confirmPayment(sig, reference, timeoutMs);
 })
 );
 } catch (error) {
 throw new Error(`Failed to confirm batch payments: ${error.message}`);
 }
 }
}

export default SolanaPayClient;
