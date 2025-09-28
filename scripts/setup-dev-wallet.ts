#!/usr/bin/env ts-node

import { Keypair, Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { mkdirSync, writeFileSync, existsSync } from "fs";
import { resolve } from "path";

// Where we’ll store the dev wallet
const SOLANA_DIR = resolve(process.env.HOME || process.env.USERPROFILE || ".", ".config", "solana");
const WALLET_PATH = resolve(SOLANA_DIR, "dev-wallet.json");

async function main() {
  console.log("🚀 Setting up a new Solana devnet wallet...");

  // Ensure config dir exists
  if (!existsSync(SOLANA_DIR)) {
    mkdirSync(SOLANA_DIR, { recursive: true });
  }

  // Generate wallet
  const wallet = Keypair.generate();

  // Save secret key locally
  writeFileSync(WALLET_PATH, JSON.stringify(Array.from(wallet.secretKey)));
  console.log(`🔑 Wallet generated & saved at: ${WALLET_PATH}`);
  console.log("📬 Public key:", wallet.publicKey.toBase58());

  // Setup connection
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  // Airdrop SOL
  console.log("💧 Requesting 1 SOL airdrop...");
  const sig = await connection.requestAirdrop(wallet.publicKey, 1 * LAMPORTS_PER_SOL);
  await connection.confirmTransaction(sig, "confirmed");

  // Check balance
  const balance = await connection.getBalance(wallet.publicKey);
  console.log(`💰 Wallet funded. Balance: ${balance / LAMPORTS_PER_SOL} SOL`);

  console.log("\n✅ Dev wallet setup complete!");
  console.log(`👉 Use this wallet with your test harness (scripts/test-raydium.ts)`);
}

main().catch((err) => {
  console.error("❌ Error setting up wallet:", err);
  process.exit(1);
});
