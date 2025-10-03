# ♻️ Polymers Protocol

Polymers Protocol is a **full-stack Blockchain-as-a-Service (BaaS)** platform on **Solana**, powering **SmartBin**—an IoT-enabled, gamified waste management system with ESG tracking, token rewards, and NFT Twins.

---

## 🌟 Features

- **SmartBins IoT**: Fill level, weight, contamination, and temperature telemetry via **Helium DePIN**.
- **NFT Twins**: Gamified Metaplex cNFTs representing ESG credits; staking and evolution.
- **Token Rewards**: PLY, CARB, EWASTE, HONEY, HNT via **Solana Pay**; swaps via **Jupiter** & **Raydium**.
- **AR Wayfinder**: Hivemapper + Mapbox overlays guide users to nearby SmartBins.
- **AI ESG Scanner**: **Expo-camera** + **TensorFlow.js** for AR material scanning and ESG scoring.
- **ESG Analytics**: Real-time dashboards with Pyth & Chainlink oracles.
- **AI Assistant**: GPT-powered chat (Grok 3 optional), predictive LSTM analytics.
- **Interactive Dashboard**: Animated flows, curved arrows, tooltips, sparkline mini-charts.

---

## 🚀 Live Demo / MVP

[Website & Dashboard](#) *(replace with actual URL)*

---

## 📂 Architecture Overview

```mermaid
graph TD
    A[SmartBin Sensors<br>Fill, Weight, Temp, Contamination] -->|LoRaWAN| B[Helium Hotspot<br>10km Range]
    B -->|Telemetry| C[Supabase<br>Telemetry Storage]
    C -->|Geospatial Validation| D[Hivemapper API<br>Coverage & Device Status]
    D -->|Validated Data| E[Solana Blockchain<br>65K+ TPS]
    E -->|Token Minting| F[Reward System<br>HNT, HONEY, PLY, CARB, EWASTE]
    F -->|ATA Updates| G[Phantom Wallet<br>NFT Twins]
    G -->|User Interface| H[Dashboard & Mobile App<br>Real-Time Analytics]
    C -->|Fill Predictions| H[LSTM Analytics<br>via Supabase]
    D -->|Map Data| H[Interactive Maps]
    E -->|Price & ESG Oracles| I[Pyth + Chainlink]
    E -->|Swap & Liquidity| J[Jupiter + Raydium]
    H -->|AI Chat| K[Dialect + GPT]
````

### Monorepo Structure

/apps
  /web          # Next.js Dashboard
  /mobile       # React Native / Expo App
  /backend      # Fastify / MCP API
  /shared       # Shared components/hooks/types
/data           # Sample data & seeding
/lib            # Solana, Helium, Hivemapper, Metaplex, Jupiter, Raydium
/hooks          # React hooks
/context        # Wallet/User/AI/ESG contexts
/constants      # Colors, tokens, API endpoints
/utils          # Utility functions
/api            # Backend API routes
/prisma         # Supabase schema & migrations
/docs
/scripts        # Deploy & simulations
.env.example
README.md
``

### Quickstart

1️⃣ Install Dependencies

npm install -g @solana/cli @helium/cli @coral-xyz/anchor-cli
npm install axios typescript msw jest @supabase/supabase-js

2️⃣ Setup Wallet

helium wallet export --key-type solana > solana_wallet.json

# Import into Phantom or Solflare

3️⃣ Configure Environment

Create .env:

```
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
```

4️⃣ Devnet Simulation

```
git clone https://github.com/polymers-protocol/smartbin
cd smartbin
npm install
solana-test-validator --rpc-port 8899 &
anchor deploy --provider.cluster devnet
npm run simulate:iot
npm run simulate:hivemapper
npm run simulate:rewards
npm run test:lstm
npm run test
npm run ota:deploy --bin test_bin --file ./firmware/latest.bin

```

### Testing & Simulations
```
npm run simulate:iot         # IoT telemetry simulation
npm run simulate:hivemapper  # Mapping simulation
npm run simulate:rewards     # Reward issuance simulation
npm run test:lstm            # Predictive analytics testing
npm run ota:deploy           # OTA firmware updates
npm run test                 # Run unit tests

Unit tests: /scripts/__tests__/iot.test.ts, /rewards.test.ts, /ota_utils.test.ts, /lstm_model.test.ts
````

### API Endpoints
```
GET /users
POST /transactions
GET /nft-twins
POST /payments
GET /esg
GET /smartbins
POST /ai-agents
```
Swagger Docs: /docs/swagger.yaml


### Community & Support
	•	GitHub: Polymers Protocol Repo
	•	Discord: Polymers Protocol
	•	Telegram: Polymers Protocol
	•	Solana Discord: Solana
	•	Helium Discord: Helium


### Features Summary
	•	Live SmartBin telemetry → ESG → NFT → DeFi flows
	•	Supabase, Pyth, Jupiter, Raydium, Metaplex live metrics
	•	AI ESG Scanner: AR + TensorFlow.js
	•	AR Wayfinder: Hivemapper + Mapbox overlays
	•	Interactive Dashboard: Animated flows, curved arrows, multiple token flows, tooltips, sparkline mini-charts
	•	Gamification & Rewards: NFT evolution, leaderboards, yield staking

# License: MIT

Contributors: Polymers Protocol
