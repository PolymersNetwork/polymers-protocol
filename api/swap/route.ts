import { NextRequest, NextResponse } from 'next/server';
import dotenv from 'dotenv';
import { Keypair, PublicKey } from '@solana/web3.js';
import PolymersRaydiumClient from '../../lib/solana/raydium';

dotenv.config();

/**
 * Load dev wallet for signing transactions.
 */
function loadDevWallet(): Keypair {
  const fs = require('fs');
  const path = require('path');
  const walletPath =
    process.env.DEV_WALLET_PATH ||
    path.join(process.env.HOME || '.', '.config/solana/dev-wallet.json');

  if (!fs.existsSync(walletPath)) {
    throw new Error(`Dev wallet not found at ${walletPath}.`);
  }

  const secret = JSON.parse(fs.readFileSync(walletPath, 'utf-8'));
  return Keypair.fromSecretKey(Uint8Array.from(secret));
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, slippageBps = 50 } = body;

    if (!amount || isNaN(amount)) {
      return NextResponse.json({ error: 'Amount is required and must be a number' }, { status: 400 });
    }

    const wallet = loadDevWallet();
    const raydiumClient = new PolymersRaydiumClient(wallet);

    // Perform swap: SOL -> PLY
    const signature = await raydiumClient.batchSwapSolToPly([amount.toString()], slippageBps);

    return NextResponse.json({
      success: true,
      signature,
      message: `Swapped ${amount} SOL → PLY on Devnet`,
    });
  } catch (err: any) {
    console.error('Swap API error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  return NextResponse.json({ info: 'Swap API is running. POST { amount, slippageBps? } to swap SOL → PLY' });
}
