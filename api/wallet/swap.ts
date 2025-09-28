import type { NextApiRequest, NextApiResponse } from 'next';
import { Connection, PublicKey, Keypair, Transaction } from '@solana/web3.js';
import { Jupiter, RouteInfo } from '@jup-ag/api';

const SOLANA_RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com';
const connection = new Connection(SOLANA_RPC_URL);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fromToken, toToken, amount, walletPrivateKey } = req.body;

    if (!fromToken || !toToken || !amount || !walletPrivateKey) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Load user's wallet
    const userWallet = Keypair.fromSecretKey(Buffer.from(JSON.parse(walletPrivateKey)));

    // Initialize Jupiter
    const jupiter = await Jupiter.load({
      connection,
      cluster: 'devnet', // change to 'mainnet-beta' for mainnet
      user: userWallet,
    });

    // Get routes
    const routes: RouteInfo[] = await jupiter.computeRoutes({
      inputMint: new PublicKey(fromToken),
      outputMint: new PublicKey(toToken),
      amount: amount, // amount in smallest unit (e.g., lamports)
      slippageBps: 50, // 0.5% slippage
    });

    if (!routes.length) {
      return res.status(400).json({ error: 'No swap routes found' });
    }

    const bestRoute = routes[0];

    // Create transaction
    const { execute } = await jupiter.exchange({ routeInfo: bestRoute });
    const txId = await execute();

    return res.status(200).json({ success: true, txId });

  } catch (error: any) {
    console.error('Swap error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
