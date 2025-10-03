# Polymers Protocol

Polymers Protocol is a full-stack Blockchain-as-a-Service (BaaS) platform built on Solana, powering SmartBin—an IoT-enabled, gamified waste management system with ESG tracking, token rewards, and NFT Twins. It integrates Helium DePIN for low-cost telemetry, Hivemapper AR for navigation, TensorFlow.js for AI-driven material scanning, and the Solana ecosystem (Jupiter, Raydium, Metaplex, Solana Pay, Blinks) for scalable, low-cost transactions and rewards.

⸻

## Features
	•	SmartBins IoT: Monitors fill, weight, contamination, and temperature via Helium DePIN (~$0.00001/24KB via LoRaWAN).
	•	NFT Twins: Gamified Metaplex cNFTs representing ESG credits with staking and evolution.
	•	Token Rewards & Animated Flows: PLY, CARB, EWASTE, HONEY, HNT; simultaneous token animations along SmartBins → Supabase → Rewards → NFT Twins flows.
	•	AR Wayfinder: Hivemapper + Mapbox overlays guide users to nearby SmartBins.
	•	AI ESG Scanner: Expo-camera + TensorFlow.js for material detection, ESG scoring, and reward mapping.
	•	Interactive Dashboard: GSAP-powered dual flywheel, curved arrows, sparkline mini-charts, tooltips, live ESG metrics, and real-time token flows.
	•	AI Assistant: GPT/Grok 3 integration via Dialect, predictive LSTM analytics via Supabase.
	•	Offline & Enterprise-Grade: AsyncStorage caching, Sentry monitoring, Privy.io authentication, Solana Pay, NFT minting.
	•	Compliance: GDPR, EU CSRD, TCFD, ISO 14064-1, ISO 31000, Plastic Pollution Treaty (INC-5.2, August 2025).

⸻

### Live Demo / MVP

Website & Dashboard (placeholder)
Mobile App (placeholder)

⸻

## Architecture Overview

graph TD
    A[SmartBin Sensors<br>Fill, Weight, Temp, Contamination] -->|LoRaWAN| B[Helium Hotspot<br>10km Range]
    B -->|Telemetry| C[Supabase<br>Telemetry Storage]
    C -->|Validated Data & ESG Calculations| D[Rewards System<br>PLY/CARB/EWASTE/HONEY/HNT]
    D -->|NFT Minting| E[NFT Twins<br>Metaplex cNFTs]
    C -->|Geospatial Validation| F[Hivemapper AR<br>Map Overlays]
    D -->|ATA Updates| G[Wallets<br>Phantom, Solflare, Backpack]
    F -->|Map Data| H[Interactive Dashboard<br>Mobile + Web]
    C -->|Predictions| H[LSTM ESG Analytics]
    D -->|Price & ESG Oracles| I[Pyth + Chainlink]
    D -->|Swap & Liquidity| J[Jupiter + Raydium]
    H -->|AI Chat| K[Dialect + GPT/Grok]

Animated Token Flows: SmartBins → Supabase → Rewards → NFT Twins are visualized in mobile dashboard via GSAP Bezier paths, supporting multiple tokens simultaneously.

⸻

### Monorepo Structure

/apps
  /web          # Next.js Dashboard
  /mobile       # React Native / Expo App (ESGImpact.tsx)
  /backend      # Fastify / MCP API
  /shared       # Shared components/hooks/types
/data           # Sample data & seeding
/lib            # Solana, Helium, Hivemapper, Metaplex, Jupiter, Raydium
/hooks          # React hooks
/context        # Wallet/User/AI/ESG contexts
/constants       # Colors, tokens, API endpoints
/utils          # Utility functions
/api            # Backend API routes
/prisma         # Supabase schema & migrations
/docs           # Documentation & Swagger
/scripts        # Deployment & simulation scripts
.env.example
README.md


⸻

## Quickstart

1️⃣ Install Dependencies

npm install -g @solana/cli @helium/cli @coral-xyz/anchor-cli
npm install axios typescript msw jest @supabase/supabase-js @tensorflow/tfjs expo-camera react-native-svg-charts gsap

2️⃣ Setup Wallet

Export your Helium wallet and import it into Phantom, Solflare, or Backpack:

helium wallet export --key-type solana > solana_wallet.json

3️⃣ Configure Environment

Create a .env file:

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

4️⃣ Run Devnet Simulation

git clone https://github.com/polymers-protocol/smartbin
cd smartbin
npm install
solana-test-validator --rpc-port 8899 &
anchor deploy --provider.cluster devnet
npm run simulate:iot
npm run simulate:hivemapper
npm run simulate:rewards
npm run test:lstm
npm run ota:deploy --bin test_bin --file ./firmware/latest.bin
npm run test


⸻

## Testing & Simulations

npm run simulate:iot         # SmartBin telemetry
npm run simulate:hivemapper  # AR mapping
npm run simulate:rewards     # Token reward issuance
npm run test:lstm            # LSTM predictive analytics
npm run ota:deploy           # OTA firmware updates
npm run test                 # Unit tests


⸻

## API Endpoints

GET /users            # Fetch user data
POST /transactions    # Submit transactions
GET /nft-twins        # Retrieve NFT Twins
POST /nft-twins       # Mint NFT Twins
GET /esg              # Fetch ESG metrics
GET /smartbins        # Fetch SmartBin telemetry
POST /payments        # Process Solana Pay transactions
POST /ai-agents       # Trigger AI chat responses


⸻

## ESG & Carbon Offset Integration
	•	Carbon Offset Formula:
Carbon Offset (kg CO₂e) = Weight Recycled (kg) × Emission Factor (kg CO₂e/kg)
ESG Points = Carbon Offset × 10
	•	Emission Factors:
	•	Plastic: 1.5 kg CO₂e/kg
	•	Glass: 0.3 kg CO₂e/kg
	•	Paper: 0.9 kg CO₂e/kg
	•	Aluminum: 9.0 kg CO₂e/kg
	•	NFT Twin Rewards: 5 PLY tokens per 100 ESG points.

⸻

## Visual Design
	•	Palette: Dark green (#1A3C34), sand (#F4A261), light gray (#D3D3D3), white (#FFFFFF).
	•	Typography: Satoshi-Bold (headings), Geist-Regular (body).
	•	Animations: GSAP for dual flywheel, curved Bezier arrows, multiple token flows, sparkline charts.
	•	Components: ESGImpact.tsx with token Bezier flows, AI ESG Scanner, AR Wayfinder, Dashboard charts.

⸻

## Compliance (TBA)
	•	Regulations: GDPR, EU CSRD, TCFD, ISO 14064-1, ISO 31000.
	•	Plastic Pollution Treaty: INC-5.2 (August 2025).
	•	Security: AES-256 encryption, Privy.io wallet authentication.

⸻

# Community & Support
	•	GitHub: Polymers Repo
	•	Discord: Polymers Protocol
	•	Telegram: Polymers Protocol
	•	Solana Community: Solana Discord
	•	Helium Community: Helium Discord

⸻

📜 License

MIT License – Contributors: Polymers Protocol
