# Introduction to Polymers Protocol

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Solana](https://img.shields.io/badge/Solana-Mainnet-green)](https://solana.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Postgres-3ECF8E)](https://supabase.com/)
[![Helium](https://img.shields.io/badge/Helium-DePIN-orange)](https://docs.helium.com/solana)
[![Hivemapper](https://img.shields.io/badge/Hivemapper-MapData-blueviolet)](https://docs.hivemapper.com)

---

The **Polymers Protocol** is a **decentralized, full-stack platform** built on **Solana**, powering **SmartBin**, a next-generation waste management and ESG solution. It leverages:

- **Helium DePIN** for IoT connectivity  
- **Hivemapper APIs** for geospatial validation  
- **Solana blockchain** for rewards, telemetry logging, and NFT Twins  
- **Supabase** for data storage and analytics  
- **Predictive LSTM models** for route optimization and fill forecasting  

Users are incentivized via token rewards (HNT, IOT, PLY, CARB, EWASTE, HONEY), while cities and enterprises gain ESG insights.

🌐 **Live Demo / MVP**: [Website & Dashboard](https://poiymers-website.vercel.app)

For detailed integration, see [Helium Integration Docs](./helium-integration.md).

---

## System Overview

Polymers Protocol addresses inefficiencies in waste management using **SmartBins**, IoT-enabled bins that monitor fill levels, contamination, weight, and temperature. Key components:

- **Helium LoRaWAN**: Low-power long-range telemetry (~10km).  
- **Hivemapper APIs**: Real-time location validation and map enrichment.  
- **Solana Blockchain**: ~65k TPS for on-chain telemetry, rewards, and NFT Twins (~0.002 SOL per mint).  
- **Supabase**: Centralized logging, analytics, and simulation storage.  
- **Predictive Analytics**: LSTM models for fill forecasts and route optimization.  
- **Reward System**: ESG-based token distribution using Solana Pay and NFT Twins.

---

## Architecture

### High-Level Architecture
```mermaid
graph TD
    A[SmartBin Sensors] --> B[Helium LoRaWAN]
    B --> C[Telemetry API / Supabase]
    C --> D[Hivemapper API Validation]
    D --> E[Solana Blockchain]
    E --> F[Reward Calculation]
    F --> G[Wallet Updates & NFT Twins]
    G --> H[Dashboard & Mobile App]
    C --> H[Analytics & Predictions]
    D --> H[Map Features]
    style A fill:#f9f,stroke:#333
    style H fill:#9f9,stroke:#333

Telemetry Flow

graph LR
    S[SmartBin Sensor Data] --> H[Helium LoRaWAN Network]
    H --> T[Telemetry API]
    T --> D[Supabase Database]
    D --> A[Analytics Engine / LSTM Model]
    A --> U[Dashboard & Notifications]
    style S fill:#ffcccb,stroke:#333
    style U fill:#cce5ff,stroke:#333

Reward Calculation Flow

graph TD
    V[Validated Telemetry] --> E[ESG Scoring Engine]
    E --> R[Reward Tokens Calculation]
    R --> W[Wallet / NFT Twin Update]
    W --> U[User Dashboard]
    style V fill:#ffe4b5,stroke:#333
    style U fill:#cce5ff,stroke:#333


⸻

SmartBin Use Case

SmartBins enable:
	•	Monitoring: Fill levels, contamination, weight, temperature
	•	Telemetry Transmission: Helium LoRaWAN (~$0.00001 per 24KB)
	•	Validation: Hivemapper map features verification
	•	Rewarding Users: Token issuance for participation and mapping contributions
	•	Analysis: Predictive analytics for collection optimization
	•	Firmware Updates: OTA updates with staged deployment and rollback

Developer Tip: Test OTA updates on a simulated bin first:

npm run ota:deploy --bin test_bin --file ./firmware/latest.bin



Key Benefits:
	•	Scalable: Millions of bins supported via Solana high TPS
	•	Low-Cost: Minimal per-transaction fees and LoRaWAN data costs
	•	Composable: Integrates Solana Pay, Metaplex NFTs, Pyth oracles, Hivemapper
	•	Sustainable: ESG analytics for cities and enterprises

⸻

Getting Started

Prerequisites
	•	Node.js v18+
	•	Solana CLI v1.18+ (npm install -g @solana/cli)
	•	Helium CLI v2.0+ (npm install -g @helium/cli)
	•	Supabase CLI
	•	Hivemapper API Key
	•	Phantom Wallet

Install all prerequisites before cloning:

npm install -g @solana/cli @helium/cli supabase



⸻

Quickstart
	1.	Clone Repository

git clone https://github.com/polymers-protocol/polymers
cd polymers
npm install

	2.	Setup Environment

NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
HELIUM_HOTSPOT_ADDRESS=<your_hotspot_address>
PLY_MINT=<ply_mint_address>
CARB_MINT=<carb_mint_address>
EWASTE_MINT=<ewaste_mint_address>
HONEY_MINT=<honey_mint_address>
REWARD_WALLET_ADDRESS=<reward_wallet_address>
NEXT_PUBLIC_SUPABASE_URL=<supabase_url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<supabase_anon_key>
HIVEMAPPER_API_KEY=<your_api_key>
HIVEMAPPER_USERNAME=<your_username>

	3.	Run Local Simulations

npm run simulate:iot
npm run simulate:hivemapper
npm run simulate:rewards
npm run test:lstm
npm run ota:deploy --bin test_bin --file ./firmware/latest.bin

	4.	Deploy to Devnet

anchor deploy --provider.cluster devnet


⸻

Key Files
	•	/lib/helium.ts, /lib/hivemapper.ts – API integrations
	•	/api/iot/smartbins.ts – Telemetry & validation
	•	/api/wallet/swap.ts – Rewards management
	•	/programs/src/nft_mint.ts – NFT Twins minting
	•	/lib/lstm_model.ts – Predictive analytics
	•	/scripts/ota_utils.ts – OTA management
	•	/scripts/sample_data/sample_telemetry.json – Test data
	•	/scripts/simulate_*.ts – Local simulations

⸻

Next Steps
	•	Integration Guide: /docs/helium-integration.md
	•	Contributing: GitHub Repo
	•	Community: X / Discord (Hivemapper)

⸻

Resources
	•	Polymers Protocol GitHub
	•	Helium Docs
	•	Hivemapper Docs
	•	Solana Cookbook
	•	Supabase Docs
