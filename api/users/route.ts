import { NextRequest, NextResponse } from 'next/server';
import { Keypair, PublicKey } from '@solana/web3.js';
import dotenv from 'dotenv';
import PolymersSolanaClient from '../../lib/solana/hivemapper';

dotenv.config();

/**
 * Load dev wallet (stub)
 */
function loadDevWallet(): Keypair {
  const fs = require('fs');
  const path = require('path');
  const walletPath =
    process.env.DEV_WALLET_PATH ||
    path.join(process.env.HOME || '.', '.config/solana/dev-wallet.json');

  if (!fs.existsSync(walletPath)) throw new Error(`Dev wallet not found at ${walletPath}.`);

  const secret = JSON.parse(fs.readFileSync(walletPath, 'utf-8'));
  return Keypair.fromSecretKey(Uint8Array.from(secret));
}

export async function GET(req: NextRequest) {
  try {
    const userParam = req.nextUrl.searchParams.get('user');
    if (!userParam) {
      return NextResponse.json({ error: 'user query param is required' }, { status: 400 });
    }

    const user = new PublicKey(userParam);
    const wallet = loadDevWallet();
    const client = new PolymersSolanaClient(wallet);

    // Fetch all staking accounts for the user (Devnet-ready stub)
    const stakingAccounts = await client.getUserStakingAccounts(user);

    return NextResponse.json({ stakingAccounts });
  } catch (err: any) {
    console.error('User Staking API error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
