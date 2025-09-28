// routes/webhooks/helius.ts (Express route)

import express from 'express';
import { PolymersRewardsDistributor } from '../../lib/solana/PolymersRewardsDistributor';
import { Keypair } from '@solana/web3.js';

const router = express.Router();

const distributor = new PolymersRewardsDistributor({
  heliusApiKey: process.env.HELIUS_API_KEY!,
  merchantWallet: process.env.MERCHANT_WALLET!,
  wallet: Keypair.fromSecretKey(
    Buffer.from(JSON.parse(process.env.DISTRIBUTOR_SECRET_KEY!))
  ),
});

// Webhook endpoint
router.post('/helius', async (req, res) => {
  try {
    const result = await distributor.handleWebhookEvent(req.body);
    res.json({ ok: true, result });
  } catch (err: any) {
    console.error('Webhook processing failed:', err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

export default router;
