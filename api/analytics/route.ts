import { NextRequest, NextResponse } from 'next/server';
import PolymersSolanaClient from '../../lib/solana/hivemapper';

export async function GET(req: NextRequest) {
  try {
    const client = new PolymersSolanaClient(); // default Devnet constructor

    // Example analytics: total rewards distributed, total NFTs staked, etc.
    const analytics = {
      totalRewardsDistributed: await client.getTotalRewardsDistributed(), // BN -> number/string
      totalNFTsStaked: await client.getTotalNFTsStaked(),
      totalUsers: await client.getTotalUsers(),
      devnet: true,
    };

    return NextResponse.json({ analytics });
  } catch (err: any) {
    console.error('Analytics API error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
