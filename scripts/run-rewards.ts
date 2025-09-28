import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { Keypair, PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
import PolymersRewardsDistributor from '../lib/polymers/RewardsDistributor';
import SolanaPayClient from '../lib/solana/solana';

dotenv.config();

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

async function main() {
  console.log('🚀 Running Polymers Rewards Simulation on Devnet...');

  // Load wallet
  const wallet = await loadDevWallet();
  console.log(`🔑 Loaded dev wallet: ${wallet.publicKey.toBase58()}`);

  // Initialize distributor and Solana Pay client
  const distributor = new PolymersRewardsDistributor(wallet);
  const payClient = new SolanaPayClient(wallet.publicKey);

  // Simulate recipients (replace with real accounts as needed)
  const recipients = [
    { user: wallet.publicKey, nftMint: new PublicKey('6F3ufadVUK5WrT6pGsyZ8u4kDz7u1muh1pSnN8zL4F8y') },
    { user: wallet.publicKey, nftMint: new PublicKey('8jFrF6Tq8Z4qDdjd3VE9XSaK9Ti5qayCvwoL6t2fU2m7') },
  ];

  // Step 1: Claim, swap, and distribute rewards
  console.log('💰 Claiming rewards, swapping SOL → PLY, and distributing to recipients...');
  const txSignatures = await distributor.claimSwapDistributeBatch(recipients);
  console.log(`✅ Distribution completed with signatures:`, txSignatures);

  // Step 2: Generate Solana Pay QR codes for each recipient reward
  console.log('📲 Generating QR codes for each recipient PLY reward...');
  const rewardPerRecipient = 10; // mock amount for QR display (adjust as needed)

  const qrPayments = recipients.map((r, index) => ({
    amount: rewardPerRecipient,
    memo: `Reward for NFT ${r.nftMint.toBase58()}`,
    reference: new PublicKey(wallet.publicKey.toBase58()), // using dev wallet as reference
    isPly: true,
  }));

  const qrCodes = await payClient.generateBatchPaymentQRs(qrPayments);

  qrCodes.forEach((qr, i) => {
    console.log(`🔹 Recipient ${i + 1}:`);
    console.log(`   Memo: ${qrPayments[i].memo}`);
    console.log(`   QR URL: ${qr.url}`);
    console.log(`   QR Base64: ${qr.qrCodeBase64.substring(0, 100)}...`); // truncate for console
  });

  console.log('🎉 Simulation complete. Devnet-ready multi-recipient PLY distribution with QR codes generated.');
}

main().catch((err) => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
