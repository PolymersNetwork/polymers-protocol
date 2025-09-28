import fs from 'fs';
import path from 'path';
import { Keypair, PublicKey } from '@solana/web3.js';
import dotenv from 'dotenv';
import PolymersSolanaClient from '../lib/solana/hivemapper';

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
  console.log('🚀 Running Polymers Staking Test on Devnet...');

  const wallet = await loadDevWallet();
  console.log(`🔑 Loaded Dev wallet: ${wallet.publicKey.toBase58()}`);

  // Initialize Solana client
  const solanaClient = new PolymersSolanaClient(wallet);

  // Mock NFT mints and user accounts for staking (replace with real mints in production)
  const stakingRequests = [
    {
      user: wallet.publicKey, // Use dev wallet as mock user
      nftMint: new PublicKey('6F3ufadVUK5WrT6pGsyZ8u4kDz7u1muh1pSnN8zL4F8y'),
    },
    {
      user: wallet.publicKey,
      nftMint: new PublicKey('8jFrF6Tq8Z4qDdjd3VE9XSaK9Ti5qayCvwoL6t2fU2m7'),
    },
  ];

  // Stake NFTs
  for (const { user, nftMint } of stakingRequests) {
    try {
      // Check if already staked
      const stakingAccount = await solanaClient.getStakingAccount(user, nftMint);
      if (stakingAccount) {
        console.log(`ℹ️ NFT ${nftMint.toBase58()} already staked for ${user.toBase58()}`);
        continue;
      }

      // Stake the NFT
      const signature = await solanaClient.stakeNFT(wallet, nftMint);
      console.log(`✅ Staked NFT ${nftMint.toBase58()} for ${user.toBase58()}`);
      console.log(`🔗 Explorer link: https://explorer.solana.com/tx/${signature}?cluster=devnet`);
    } catch (error) {
      console.error(`❌ Failed to stake NFT ${nftMint.toBase58()}:`, error.message);
    }
  }

  // Verify staking accounts
  console.log('\n📊 Verifying staking accounts...');
  for (const { user, nftMint } of stakingRequests) {
    const stakingAccount = await solanaClient.getStakingAccount(user, nftMint);
    if (stakingAccount) {
      console.log(`✔️ Staking account found for ${nftMint.toBase58()}:`);
      console.log(`  - Owner: ${stakingAccount.owner.toBase58()}`);
      console.log(`  - Staked At: ${new Date(stakingAccount.stakedAt.toNumber() * 1000).toISOString()}`);
    } else {
      console.log(`⚠️ No staking account for ${nftMint.toBase58()}`);
    }
  }
}

main().catch((err) => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
