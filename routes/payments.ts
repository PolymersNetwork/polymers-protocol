import express from 'express';
import { Keypair, PublicKey, TransactionSignature } from '@solana/web3.js';
import SolanaPayClient from '../lib/solana/solana-pay';
import PolymersRaydiumClient from '../lib/solana/raydium';
import { NATIVE_MINT } from '@solana/spl-token';

const router = express.Router();
const merchantWallet = Keypair.fromSecretKey(Buffer.from(process.env.MERCHANT_SECRET_KEY || '', 'base64'));
const solanaPayClient = new SolanaPayClient(merchantWallet.publicKey);
const raydiumClient = new PolymersRaydiumClient(merchantWallet);
const PLY_MINT_ADDRESS = process.env.PLY_MINT_ADDRESS || '';

// POST /payments/qr - Generate a single payment QR code
router.post('/qr', async (req, res) => {
 const { amount, memo, reference, isPlyPayment = false } = req.body;
 try {
 if (!amount || typeof amount !== 'number') {
 return res.status(400).json({ status: 'error', message: 'Invalid amount' });
 }
 const { url, qrCodeBase64 } = await solanaPayClient.generatePaymentQR(
 amount,
 memo,
 reference ? new PublicKey(reference) : undefined,
 isPlyPayment
 );
 res.json({ status: 'success', url, qrCodeBase64 });
 } catch (error) {
 res.status(500).json({ status: 'error', message: error.message });
 }
});

// POST /payments/confirm-and-raydium-swap - Confirm payment and swap to PLY
router.post('/confirm-and-raydium-swap', async (req, res) => {
 const { signature, amount, reference, isPlyPayment = false } = req.body;
 try {
 if (!signature || !amount) {
 return res.status(400).json({ status: 'error', message: 'Signature and amount required' });
 }
 const tx = await solanaPayClient.confirmPayment(
 signature,
 reference ? new PublicKey(reference) : undefined
 );
 if (!tx) {
 return res.status(400).json({ status: 'error', message: 'Payment not confirmed' });
 }

 // Skip swap if already PLY
 if (isPlyPayment) {
 return res.json({
 status: 'success',
 paymentSignature: signature,
 message: 'PLY payment confirmed, no swap needed',
 });
 }

 // Convert amount to lamports for SOL or PLY decimals (9)
 const swapAmount = new BN(amount).mul(new BN(10 ** 9)).toString();
 const swapSignature = await raydiumClient.executeSwap(
 NATIVE_MINT.toString(),
 PLY_MINT_ADDRESS,
 swapAmount,
 50 // 0.5% slippage
 );
 res.json({
 status: 'success',
 paymentSignature: signature,
 swapSignature,
 message: 'Payment confirmed and swapped to PLY',
 });
 } catch (error) {
 res.status(500).json({ status: 'error', message: error.message });
 }
});

// POST /payments/batch-raydium-swap - Confirm multiple payments and swap to PLY
router.post('/batch-raydium-swap', async (req, res) => {
 const { signatures, amounts, references, isPlyPayments = [] } = req.body;
 try {
 if (!signatures || !amounts || signatures.length !== amounts.length) {
 return res.status(400).json({ status: 'error', message: 'Invalid signatures or amounts' });
 }

 const confirmations = await solanaPayClient.confirmBatchPayments(
 signatures,
 references ? references.map((ref: string) => new PublicKey(ref)) : undefined
 );
 if (confirmations.some((tx) => !tx)) {
 return res.status(400).json({ status: 'error', message: 'Some payments not confirmed' });
 }

 // Aggregate SOL amounts for swap (skip PLY payments)
 const totalSolAmount = amounts
 .reduce((sum: BN, amt: number, idx: number) => {
 if (isPlyPayments[idx]) return sum; // Skip PLY payments
 return sum.add(new BN(amt).mul(new BN(10 ** 9)));
 }, new BN(0))
 .toString();

 let swapSignature: TransactionSignature | null = null;
 if (totalSolAmount !== '0') {
 swapSignature = await raydiumClient.batchSwapSolToPly([totalSolAmount], 50);
 }

 res.json({
 status: 'success',
 paymentSignatures: signatures,
 swapSignature: swapSignature || 'No swap needed (all PLY payments)',
 message: 'Batch payments confirmed and swapped to PLY if applicable',
 });
 } catch (error) {
 res.status(500).json({ status: 'error', message: error.message });
 }
});

export default router;
