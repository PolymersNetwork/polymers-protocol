import { NextRequest, NextResponse } from 'next/server';
import { PublicKey } from '@solana/web3.js';
import PolymersSolanaClient from '../../../lib/solana/hivemapper';

export async function GET(req: NextRequest) {
  try {
    const userParam = req.nextUrl.searchParams.get('user');
    const client = new PolymersSolanaClient(); // Devnet-ready

    let metrics;

    if (userParam) {
      // Fetch ESG metrics for a specific user
      const user = new PublicKey(userParam);
      metrics = await client.getUserEsgMetrics(user);
    } else {
      // Fetch aggregated ESG metrics across all users
      metrics = await client.getGlobalEsgMetrics();
    }

    return NextResponse.json({ metrics });
  } catch (err: any) {
    console.error('ESG Metrics API error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
