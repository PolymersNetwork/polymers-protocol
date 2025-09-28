# Polymers Protocol Solana Programs

**Version**: 1.0.0  
**Date**: September 28, 2025

---

## Table of Contents
1. [Overview](#overview)
2. [Programs](#programs)
3. [Prerequisites](#prerequisites)
4. [Environment Setup](#environment-setup)
5. [Deployment](#deployment)
6. [Program Instructions](#program-instructions)
7. [Testing](#testing)
8. [Diagrams](#diagrams)
9. [Best Practices](#best-practices)
10. [Next Steps](#next-steps)

---

## Overview

The **Polymers Protocol** uses Solana programs to manage:

- **NFT Twin Staking**: Users stake NFTs to earn PLY rewards.  
- **ESG Logging (Optional)**: Logs carbon offsets and ESG points on-chain.  
- **Metaplex Token Metadata**: Verifies NFT collection, metadata, and ownership.

Programs are written in **Rust** using the **Anchor framework**, enabling secure PDA derivation and easy program interaction.

---

## Programs

| Program Name        | Purpose                                   | Program ID (placeholder) |
|--------------------|-------------------------------------------|--------------------------|
| NFT Twin Staking    | Manage NFT staking and reward calculations | `<STAKING_PROGRAM_ID>`  |
| ESG Logging         | Log carbon offsets and ESG points          | `<ESG_PROGRAM_ID>`      |
| Metaplex Metadata   | NFT metadata verification                  | `metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s` |

---

## Prerequisites

- **Rust** ≥ 1.72
- **Solana CLI** ≥ 1.25
- **Anchor CLI** ≥ 0.31.1
- **Node.js** ≥ 20 (for backend interactions)
- **Optional**: Solana Wallet, Phantom / Solflare / Backpack

---

## Environment Setup

1. **Install Rust & Anchor**:
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
   avm install latest
   avm use latest

	2.	Set Solana CLI to Devnet:

solana config set --url https://api.devnet.solana.com
solana airdrop 2 <YOUR_WALLET_ADDRESS>


	3.	Clone Program Repository:

git clone https://github.com/polymers-protocol/programs.git
cd programs



⸻

Deployment
	1.	Build Programs:

anchor build


	2.	Deploy to Devnet:

anchor deploy --provider.cluster devnet


	3.	Verify Deployment:

solana program show <PROGRAM_ID>



⸻

Program Instructions

NFT Twin Staking
	•	stake_nft: Lock NFT in staking vault.
	•	claim_rewards: Transfer PLY rewards based on staking duration + ESG points.
	•	unstake_nft: Unlock NFT and update rewards.

ESG Logging (Optional)
	•	initialize_esg: Create new ESG account.
	•	update_esg: Update points and carbon offset.

Metaplex Token Metadata
	•	Validate NFT ownership.
	•	Confirm collection address.
	•	Fetch metadata URI.

⸻

Testing
	1.	Local Validator:

solana-test-validator --reset


	2.	Anchor Tests:

anchor test


	3.	Manual Testing:
	•	Use backend or CLI to send instructions.
	•	Verify staking, rewards, and ESG account updates.

⸻

Diagrams

Program Interaction

sequenceDiagram
    actor User
    participant Backend
    participant Solana
    User->>Backend: POST /nft-twins/stake
    Backend->>Solana: Stake NFT Twin (Staking Program)
    Backend->>Solana: Update ESG (ESG Program, optional)
    Solana-->>Backend: Transaction confirmed
    Backend-->>User: Updated staking info

Program Architecture

graph TD
    A[User Wallet] --> B[Backend: Node.js]
    B --> C[NFT Twin Staking Program]
    B --> D[ESG Logging Program]
    C --> E[Metaplex Metadata Program]


⸻

Best Practices
	•	Use Anchor PDAs for all staking and ESG accounts.
	•	Validate NFT ownership before staking.
	•	Batch ESG updates to reduce on-chain writes.
	•	Secure wallet interactions with signatures.

⸻

Next Steps
	1.	Deploy programs to Devnet for testing.
	2.	Integrate backend endpoints with program IDs.
	3.	Test NFT staking + ESG point calculation end-to-end.
	4.	Export this README + diagrams as PDF for internal documentation.

⸻

References:
	•	Solana: https://docs.solana.com
	•	Anchor: https://www.anchor-lang.com
	•	Metaplex: https://docs.metaplex.com

Do you want me to create that?

