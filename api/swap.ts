import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

const JUPITER_API_URL = 'https://quote-api.jup.ag/v4';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fromToken, toToken, amount, slippageBps = 50 } = req.body;

    if (!fromToken || !toToken || !amount) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // 1️⃣ Get swap quotes from Jupiter API
    const quoteRes = await fetch(
      `${JUPITER_API_URL}/quote?inputMint=${fromToken}&outputMint=${toToken}&amount=${amount}&slippageBps=${slippageBps}&onlyDirectRoutes=false`
    );
    const quoteData = await quoteRes.json();

    if (!quoteData || !quoteData.data || quoteData.data.length === 0) {
      return res.status(400).json({ error: 'No swap routes found' });
    }

    const bestRoute = quoteData.data[0];

    // 2️⃣ Generate the swap transaction
    const swapRes = await fetch(`${JUPITER_API_URL}/swap`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        route: bestRoute,
        userPublicKey: req.body.userPublicKey, // wallet public key
      }),
    });

    const swapData = await swapRes.json();

    if (!swapData || !swapData.data || !swapData.data[0]) {
      return res.status(500).json({ error: 'Failed to generate swap transaction' });
    }

    // Returns the transaction instructions and other data to sign on client
    return res.status(200).json({ success: true, swap: swapData.data[0] });

  } catch (error: any) {
    console.error('Swap API error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
