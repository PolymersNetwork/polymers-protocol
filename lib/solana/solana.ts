import fs from 'fs';
import path from 'path';
import { Connection, Keypair, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Solana network connection (Devnet by default)
 */
export const connection = new Connection(
  process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com',
  'confirmed'
);

/**
 * Load a local dev wallet from file.
 * Defaults to ~/.config/solana/dev-wallet.json
 */
export function loadDevWallet(): Keypair {
  const walletPath =
    process.env.DEV_WALLET_PATH ||
    path.join(process.env.HOME || '.', '.config/solana/dev-wallet.json');

  if (!fs.existsSync(walletPath)) {
    throw new Error(`Dev wallet not found at ${walletPath}. Run setup-dev-wallet.ts first.`);
  }

  const secret = JSON.parse(fs.readFileSync(walletPath, 'utf-8'));
  return Keypair.fromSecretKey(Uint8Array.from(secret));
}

/**
 * Airdrop SOL to a wallet (Devnet only)
 * @param wallet Keypair to fund
 * @param amountSOL Amount in SOL (default 1)
 */
export async function airdropSol(wallet: Keypair, amountSOL: number = 1): Promise<void> {
  console.log(`💧 Requesting ${amountSOL} SOL airdrop for ${wallet.publicKey.toBase58()}`);
  const signature = await connection.requestAirdrop(wallet.publicKey, amountSOL * LAMPORTS_PER_SOL);
  await connection.confirmTransaction(signature, 'confirmed');
  console.log(`✅ Airdrop confirmed: ${signature}`);
}

/**
 * Get the balance of a wallet in SOL
 * @param walletKey PublicKey of the wallet
 * @returns Balance in SOL
 */
export async function getWalletBalance(walletKey: PublicKey): Promise<number> {
  const lamports = await connection.getBalance(walletKey);
  return lamports / LAMPORTS_PER_SOL;
}

/**
 * Utility to create a PublicKey from string and validate it
 */
export function parsePublicKey(key: string): PublicKey {
  try {
    return new PublicKey(key);
  } catch (err) {
    throw new Error(`Invalid public key: ${key}`);
  }
}

/**
 * Convenience: print wallet info
 */
export async function printWalletInfo(wallet: Keypair): Promise<void> {
  const balance = await getWalletBalance(wallet.publicKey);
  console.log(`🔑 Wallet: ${wallet.publicKey.toBase58()}`);
  console.log(`💰 Balance: ${balance.toFixed(4)} SOL`);
}
