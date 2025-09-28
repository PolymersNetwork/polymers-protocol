import { NextRequest, NextResponse } from 'next/server';
import { PublicKey } from '@solana/web3.js';
import PolymersSolanaClient from '../../lib/solana/hivemapper';

export async function GET(req: NextRequest) {
  try {
    const userParam = req.nextUrl.searchParams.get('user');
    const client = new PolymersSolanaClient(); // default constructor for Devnet

    let mapData;

    if (userParam) {
      const user = new PublicKey(userParam);
      // Example: fetch NFT locations, staking nodes, or ESG points
      mapData = await client.getUserMapData(user);
    } else {
      // Fetch global map data
      mapData = await client.getGlobalMapData();
    }

    return NextResponse.json({ mapData });
  } catch (err: any) {
    console.error('Maps API error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
