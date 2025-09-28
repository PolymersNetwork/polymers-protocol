# Polymers Protocol Scripts

This directory contains developer utility scripts to bootstrap wallets, simulate swaps, and test reward flows on **Solana Devnet**.

---

## 🚀 Available Scripts

### 1. `setup-dev-wallet.ts`
Creates a fresh **Devnet wallet** for testing.

- Generates a new `Keypair`
- Saves it to `~/.config/solana/dev-wallet.json`
- Requests a **1 SOL airdrop** on Devnet
- Prints the wallet’s public key and balance

**Run:**
```bash
pnpm ts-node scripts/setup-dev-wallet.ts


⸻

2. test-raydium.ts

A test harness for Raydium swaps using your dev wallet.
	•	Loads wallet from ~/.config/solana/dev-wallet.json (fallback to id.json)
	•	Runs a dry-run swap (e.g. SOL → PLY or PLY → SOL)
	•	Prints transaction signature for inspection in Solana Explorer

Run:

pnpm ts-node scripts/test-raydium.ts


⸻

⚡ Workflow for New Developers

flowchart TD
    A[🆕 Run setup-dev-wallet.ts] --> B[💧 Wallet funded on Devnet]
    B --> C[🔁 Run test-raydium.ts]
    C --> D[📊 Inspect transaction on Solana Explorer]
    D --> E[✅ Ready for staking + reward testing]


⸻

🛠 Tips
	•	If airdrop fails (rate-limited), wait a few minutes and rerun.
	•	You can manually fund the wallet using the Solana Faucet.
	•	Use solana balance to check balance from CLI if you’ve configured solana-cli.

⸻

🔗 Next Steps

Once your wallet is set up and swaps are tested, you can:
	•	Use the RewardsDistributor to batch claim → swap → distribute rewards.
	•	Integrate Helius webhooks for automatic reward triggers.
	•	Import the Postman collection to test all API endpoints.

⸻

📌 RunRewards
	•	run-rewards.ts → end-to-end test for staking reward claims + Raydium swaps + multi-recipient distribution.

Perfect — let’s scaffold a scripts/run-rewards.ts that will simulate the full pipeline on Devnet:
	1.	Load the dev wallet (~/.config/solana/dev-wallet.json).
	2.	Mock a few “user accounts” that would receive rewards.
	3.	Call into your PolymersRewardsDistributor with claim → swap → distribute.
	4.	Print transaction signatures so you can verify on Solana Explorer.

Here’s a first working draft:

// scripts/run-rewards.ts
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


⸻

🧪 How to Run

pnpm ts-node scripts/run-rewards.ts

Expected Output:

🚀 Running Polymers Rewards Distributor on Devnet...
🔑 Loaded Dev wallet: <YOUR_DEVNET_WALLET>
✅ Rewards distributed in atomic transaction!
🔗 Explorer link: https://explorer.solana.com/tx/<SIGNATURE>?cluster=devnet
