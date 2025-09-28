#!/usr/bin/env ts-node

import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import {
  Connection,
  Keypair,
  Transaction,
  sendAndConfirmTransaction,
  clusterApiUrl,
  SystemProgram,
} from "@solana/web3.js";
import PolymersRaydiumClient from "../lib/polymers/raydiumClient";

// Load wallet (from solana-cli default location)
function loadWallet(): Keypair {
  const solanaKeyPath = resolve(
    process.env.HOME || process.env.USERPROFILE || ".",
    ".config",
    "solana",
    "id.json"
  );

  if (!existsSync(solanaKeyPath)) {
    console.error("⚠️ No Solana wallet found. Run `solana-keygen new` first.");
    process.exit(1);
  }

  const secretKey = JSON.parse(readFileSync(solanaKeyPath, "utf-8"));
  return Keypair.fromSecretKey(Uint8Array.from(secretKey));
}

async function main() {
  console.log("🚀 Starting Raydium test harness...");

  // Setup connection + wallet
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const wallet = loadWallet();
  console.log("🔑 Using wallet:", wallet.publicKey.toBase58());

  // Airdrop SOL for testing (devnet only)
  const airdropSig = await connection.requestAirdrop(wallet.publicKey, 1e9); // 1 SOL
  await connection.confirmTransaction(airdropSig, "confirmed");
  console.log("💧 Airdropped 1 SOL to test wallet.");

  // Initialize client
  const raydium = new PolymersRaydiumClient(wallet, connection);

  // Example: Swap SOL → PLY (requires PLY_MINT_ADDRESS env var)
  if (!process.env.PLY_MINT_ADDRESS) {
    console.error(
      "⚠️ PLY_MINT_ADDRESS not set in env. Add it to .env before running swaps."
    );
    process.exit(1);
  }

  console.log("🔄 Building SOL → PLY swap instruction...");
  const swapIx = await raydium.swapSolToPly("10000000"); // 0.01 SOL

  // Example: Transfer some PLY to self (as a dry run)
  console.log("📤 Building PLY transfer instruction...");
  const transferIx = await raydium.buildTransferIx({
    to: wallet.publicKey,
    mint: process.env.PLY_MINT_ADDRESS,
    amount: "1", // 1 unit (raw, not decimals)
  });

  // Build transaction
  const tx = new Transaction().add(swapIx).add(transferIx);

  console.log("🧪 Simulating transaction...");
  const simResult = await connection.simulateTransaction(tx, [wallet]);
  if (simResult.value.err) {
    console.error("❌ Simulation failed:", simResult.value.err);
  } else {
    console.log("✅ Simulation successful:", simResult.value);
  }

  // Send live tx if you want (commented by default)
  // const sig = await sendAndConfirmTransaction(connection, tx, [wallet]);
  // console.log("✅ Transaction sent:", sig);
}

main().catch((err) => {
  console.error("❌ Error in test harness:", err);
  process.exit(1);
});
