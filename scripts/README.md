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
