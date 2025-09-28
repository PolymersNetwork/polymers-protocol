import { NextRequest, NextResponse } from 'next/server';
import { Connection, PublicKey } from '@solana/web3.js';

const connection = new Connection(process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com', 'confirmed');

export async function GET(req: NextRequest) {
  try {
    const walletParam = req.nextUrl.searchParams.get('wallet');
    const limitParam = req.nextUrl.searchParams.get('limit') || '10';

    if (!walletParam) {
      return NextResponse.json({ error: 'wallet query param is required' }, { status: 400 });
    }

    const wallet = new PublicKey(walletParam);
    const limit = parseInt(limitParam);

    const signatures = await connection.getSignaturesForAddress(wallet, { limit });
    const transactions = await Promise.all(
      signatures.map(async (sigInfo) => {
        const tx = await connection.getTransaction(sigInfo.signature, { commitment: 'confirmed' });
        return tx;
      })
    );

    return NextResponse.json({ transactions });
  } catch (err: any) {
    console.error('Transactions API error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
