import express from 'express';
import { Keypair, PublicKey } from '@solana/web3.js';
import SolanaPayClient from '../lib/solana/solana-pay';
import PolymersRaydiumClient from '../lib/solana/raydium';

const router = express.Router();
const merchantWallet = Keypair.fromSecretKey(Buffer.from(process.env.MERCHANT_SECRET_KEY || '', 'base64'));
const solanaPayClient = new SolanaPayClient(merchantWallet.publicKey);
const raydiumClient = new PolymersRaydiumClient(merchantWallet);

// POST /payments/qr - Generate a single payment QR code
router.post('/qr', async (req, res) => {
  const { amount, memo, reference } = req.body;
  try {
    const { url, qrCodeBase64 } = await solanaPayClient.generatePaymentQR(
      amount,
      memo,
      reference ? new PublicKey(reference) : undefined
    );
    res.json({ status: 'success', url, qrCodeBase64 });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// POST /payments/confirm-and-raydium-swap - Confirm payment and swap SOL to PLY
router.post('/confirm-and-raydium-swap', async (req, res) => {
  const { signature, amount, reference } = req.body;
  try {
    const tx = await solanaPayClient.confirmPayment(signature, reference ? new PublicKey(reference) : undefined);
    if (!tx) {
      return res.status(400).json({ status: 'error', message: 'Payment not confirmed' });
    }

    const swapSignature = await raydiumClient.executeSwap(
      NATIVE_MINT.toString(),
      PLY_MINT_ADDRESS.toString(),
      amount,
      50
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
  const { signatures, amounts, references } = req.body;
  try {
    const confirmations = await solanaPayClient.confirmBatchPayments(
      signatures,
      references ? references.map((ref: string) => new PublicKey(ref)) : undefined
    );
    if (confirmations.some((tx) => !tx)) {
      return res.status(400).json({ status: 'error', message: 'Some payments not confirmed' });
    }

    const totalAmount = amounts.reduce((sum: number, amt: number) => sum + Number(amt), 0).toString();
    const swapSignature = await raydiumClient.batchSwapSolToPly([totalAmount], 50);
    res.json({
      status: 'success',
      paymentSignatures: signatures,
      swapSignature,
      message: 'Batch payments confirmed and swapped to PLY',
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;
