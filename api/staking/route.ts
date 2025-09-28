import { NextRequest, NextResponse } from 'next/server';
import { Keypair, PublicKey } from '@solana/web3.js';
import dotenv from 'dotenv';
import PolymersSolanaClient from '../../lib/solana/hivemapper';
import PolymersRewardsDistributor from '../../lib/polymers/RewardsDistributor';

dotenv.config();

// Load dev wallet for simulation
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
    if (!userParam) return NextResponse.json({ error: 'user query param is required' }, { status: 400 });

    const user = new PublicKey(userParam);
    const wallet = loadDevWallet();
    const client = new PolymersSolanaClient(wallet);
    const stakingAccounts = await client.getUserStakingAccounts(user);

    return NextResponse.json({ stakingAccounts });
  } catch (err: any) {
    console.error('Staking API GET error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, nftMint } = body;

    if (!action || !nftMint) {
      return NextResponse.json({ error: 'action and nftMint are required' }, { status: 400 });
    }

    const wallet = loadDevWallet();
    const client = new PolymersSolanaClient(wallet);
    const distributor = new PolymersRewardsDistributor(wallet);

    switch (action) {
      case 'stake':
        {
          const mintPubkey = new PublicKey(nftMint);
          const txSig = await client.stakeNFT(wallet, mintPubkey);
          return NextResponse.json({ success: true, txSig });
        }
      case 'unstake':
        {
          const mintPubkey = new PublicKey(nftMint);
          const txSig = await client.unstakeNFT(wallet, mintPubkey);
          return NextResponse.json({ success: true, txSig });
        }
      case 'claim':
        {
          const recipients = [{ user: wallet.publicKey, nftMint: new PublicKey(nftMint) }];
          const txSignatures = await distributor.claimSwapDistributeBatch(recipients);
          return NextResponse.json({ success: true, txSignatures });
        }
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (err: any) {
    console.error('Staking API POST error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
