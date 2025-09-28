import fs from 'fs';
import path from 'path';
import { Keypair, PublicKey, Connection } from '@solana/web3.js';
import dotenv from 'dotenv';
import PolymersRewardsDistributor from '../lib/polymers/RewardsDistributor';

dotenv.config();

/**
 * Load Devnet wallet from ~/.config/solana/dev-wallet.json or DEV_WALLET_PATH
 */
async function loadDevWallet(): Promise<Keypair> {
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
 * Simulate a batch reward distribution
 */
async function main() {
  console.log('🚀 Running Polymers Rewards Distributor on Devnet...');

  // Load wallet
  const connection = new Connection(process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com', 'confirmed');
  let wallet: Keypair;
  try {
    wallet = await loadDevWallet();
    console.log(`🔑 Loaded Dev wallet: ${wallet.publicKey.toBase58()}`);

    // Check wallet balance
    const balance = await connection.getBalance(wallet.publicKey);
    if (balance < 0.01 * 1e9) {
      throw new Error('Insufficient SOL balance. Airdrop more SOL using `solana airdrop 2`.');
    }
    console.log(`💰 Wallet balance: ${balance / 1e9} SOL`);
  } catch (error) {
    throw new Error(`Failed to load wallet: ${error.message}`);
  }

  // Devnet-ready stubs for recipients + NFT mints (matches test-staking.ts)
  const recipients = [
    {
      user: new PublicKey('5DtvwDJHmxuJqHdmHH6z9wYdJZexy37NfGV4s6oSwCZp'),
      nftMint: new PublicKey('6F3ufadVUK5WrT6pGsyZ8u4kDz7u1muh1pSnN8zL4F8y'),
    },
    {
      user: new PublicKey('9uRKnf9pTSPspVBYkKio7URSu5cNz3djZV4ZkthmpQwQ'),
      nftMint: new PublicKey('8jFrF6Tq8Z4qDdjd3VE9XSaK9Ti5qayCvwoL6t2fU2m7'),
    },
    {
      user: new PublicKey('3vK9gA1q7tFjX8c8v3mVqY9Fqv1zFQ9YF5pVh3Z2R5Dk'),
      nftMint: new PublicKey('2F3uPj1XQk8WrT9pGsyZ1y7kDz7u1muh1pSnN8zL4F9X'),
    },
  ];

  // Initialize distributor
  const distributor = new PolymersRewardsDistributor(wallet);

  // Execute batch claim → swap → distribute
  try {
    const signatures = await distributor.claimSwapDistributeBatch(recipients, 50);
    console.log('✅ Rewards distributed in atomic transaction(s)!');
    signatures.forEach((sig, i) => {
      console.log(`🔗 Tx ${i + 1}: https://explorer.solana.com/tx/${sig}?cluster=devnet`);
    });
  } catch (error) {
    throw new Error(`Distribution failed: ${error.message}`);
  }
}

main().catch((err) => {
  console.error('❌ Error running rewards:', err.message);
  process.exit(1);
});
