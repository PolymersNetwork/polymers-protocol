import fs from "fs";
import path from "path";
import { Keypair, PublicKey } from "@solana/web3.js";
import dotenv from "dotenv";
import PolymersRewardsDistributor from "../lib/polymers/RewardsDistributor";

dotenv.config();

async function loadDevWallet(): Promise<Keypair> {
  const walletPath =
    process.env.DEV_WALLET_PATH ||
    path.join(process.env.HOME || ".", ".config/solana/dev-wallet.json");

  if (!fs.existsSync(walletPath)) {
    throw new Error(`Dev wallet not found at ${walletPath}. Run setup-dev-wallet.ts first.`);
  }

  const secret = JSON.parse(fs.readFileSync(walletPath, "utf-8"));
  return Keypair.fromSecretKey(Uint8Array.from(secret));
}

async function main() {
  console.log("🚀 Running Polymers Rewards Distributor on Devnet...");

  const wallet = await loadDevWallet();
  console.log(`🔑 Loaded Dev wallet: ${wallet.publicKey.toBase58()}`);

  // Mock recipients for testing
  const recipients: { user: PublicKey; nftMint: PublicKey }[] = [
    {
      user: new PublicKey("5DtvwDJHmxuJqHdmHH6z9wYdJZexy37NfGV4s6oSwCZp"),
      nftMint: new PublicKey("6F3ufadVUK5WrT6pGsyZ8u4kDz7u1muh1pSnN8zL4F8y"), // dummy NFT
    },
    {
      user: new PublicKey("9uRKnf9pTSPspVBYkKio7URSu5cNz3djZV4ZkthmpQwQ"),
      nftMint: new PublicKey("8jFrF6Tq8Z4qDdjd3VE9XSaK9Ti5qayCvwoL6t2fU2m7"), // dummy NFT
    },
  ];

  // Initialize distributor
  const distributor = new PolymersRewardsDistributor(wallet);

  // Execute batch claim → swap → distribute
  try {
    const sig = await distributor.claimSwapDistributeBatch(recipients, 50); // 0.5% slippage
    console.log("✅ Rewards distributed in atomic transaction!");
    console.log(`🔗 Explorer link: https://explorer.solana.com/tx/${sig}?cluster=devnet`);
  } catch (err) {
    console.error("❌ Distribution failed:", (err as Error).message);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
