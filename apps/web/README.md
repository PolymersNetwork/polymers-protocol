# Polymers Recycling Dashboard & Website

**Version 1.0 Beta**

A blockchain-powered, AI-driven platform for polymer and e-waste recycling, enabling supply chain transparency, ESG tracking, and gamified incentives. Built with **Solana**, **AI/ML**, **IoT SmartBins**, **AR**, and **TensorFlow.js**, it offers:

- **SmartBins**: Real-time material detection and IoT integration
- **NFT Twins**: Blockchain-based batch tracking
- **Predictive Analytics**: Contamination and supply chain insights
- **Solana Pay**: Instant rewards and token swaps
- **AI/LLM Assistants**: Operational and ESG guidance

🔗 **Live Demo**: [demo.polymers.io](https://demo.polymers.io)

---

## ✨ Key Features

### 1. Solana Pay Integration
- Token swaps: PLY, CARB, USDC, EWASTE
- QR code support for dashboard transactions
- SmartBin rewards via Solana Pay
- Transaction logging in Supabase

### 2. IoT SmartBins
- Sensors for fill level, weight, temperature, and contamination
- Material detection for plastics and e-waste
- Automated rewards for recycling deposits
- NFC/QR scan triggers for rewards

### 3. Predictive Analytics
- LSTM models for material demand and contamination forecasting
- ESG impact predictions
- SmartBin maintenance scheduling
- Real-time dashboards with <50ms inference latency

### 4. NFT Twins & Gamification
- Metaplex NFT-based batch tracking
- Reward missions and leaderboards
- Carbon offset and ESG compliance tracking

### 5. AI & LLM Agent
- Multilingual chat assistant for users, manufacturers, and auditors
- Handles swap, transfer, balance, forecast, and NFT minting queries
- Autonomous recommendations for routes, ESG, and inventory

### 6. Maps & Wayfinding
- AR overlays for SmartBin locations
- Route optimization for pickups
- Notifications for full or contaminated bins
- Heatmaps for polymer and e-waste flows

### 7. ESG Tracking
- Carbon footprint monitoring
- Gamified recycling incentives
- Audit-ready dashboards and reports

---

## 📋 Core Modules

| Module            | Features                                                                 |
|-------------------|--------------------------------------------------------------------------|
| **Wallet & Solana Pay** | Token swaps, balance checks, QR code generation, Supabase transaction logs |
| **SmartBins / IoT**    | Telemetry, contamination scoring, reward issuance                       |
| **LLM Agent**          | Chat prompts, predictive queries, automated transactions                |
| **NFT Twins**          | NFT minting for batches, purity/weight/ESG tracking                     |
| **Analytics / AI**     | LSTM predictions, ESG forecasts, contamination alerts                   |
| **Maps & AR**          | Bin visualization, route planning, polymer/e-waste flow heatmaps        |
| **Gamification**       | Missions, leaderboards, PLY/EWASTE rewards                             |

---

## 📂 Project Structure

```
/app                   # Frontend dashboard & website
/api                   # Backend APIs
  ├─ wallet/swap.ts        # Solana Pay token swaps
  ├─ iot/smartbins.ts      # SmartBin telemetry & rewards
  ├─ llm/index.ts          # LLM agent API
  ├─ inventory/predict.ts  # LSTM-based demand forecasts
  ├─ esg/forecast.ts       # ESG impact predictions
/components            # React components
  ├─ dashboards/       # Role-specific dashboards
  │   ├─ analytics_dashboard.tsx
  │   ├─ rewards_dashboard.tsx
  │   ├─ leaderboard.tsx
  ├─ ar_map.tsx        # AR navigation
  ├─ chat.tsx          # AI assistant
/lib                   # AI & utilities
  ├─ lstm_model.ts
  ├─ data_preprocessor.ts
  ├─ helium.ts         # IoT connectivity
  ├─ websockets.ts     # Real-time telemetry
  ├─ error_handler.ts  # Blockchain/IoT error handling
/programs/src          # Solana programs
  ├─ nft_mint.ts
  ├─ reward_token.ts
  ├─ staking.ts
  ├─ e_waste.ts
/scripts               # Simulation scripts
  ├─ simulate_iot.ts
/tests                 # Unit & integration tests
  ├─ wallet/swap.test.ts
  ├─ iot/smartbins.test.ts
/docs                  # API & contributing docs
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: ≥16
- **npm**: ≥8
- **Solana CLI**: Installed
- **Supabase**: Project for transaction logging
- **Privy.io**: For user authentication
- **TensorFlow.js**: For LSTM inference
- **Solana Pay SDK**: `@solana/pay`, `@solana/web3.js`, `@solana/spl-token`
- **Git**: For version control

### Installation
```bash
git clone https://github.com/PolymersNetwork/polymers-recycling-platform.git
cd polymers-recycling-platform
npm ci
cp .env.example .env
# Configure environment variables in .env
npm run dev
```

### Environment Variables
```env
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_KEY
PLY_MINT=PLY_TOKEN_MINT
CARB_MINT=CARB_TOKEN_MINT
USDC_MINT=USDC_TOKEN_MINT
EWASTE_MINT=EWASTE_TOKEN_MINT
REWARD_WALLET_ADDRESS=REWARD_WALLET
REWARD_WALLET_TOKEN_ACCOUNT=REWARD_WALLET_TOKEN
PRIVY_APP_ID=YOUR_PRIVY_APP_ID
CHAINLINK_API_KEY=YOUR_CHAINLINK_KEY
```

---

## 🔧 Running the Platform

### Development
```bash
npm run dev        # Start frontend with hot reload
npm run api:start  # Start API server
```

### Testing
```bash
npm run test       # Run unit & integration tests
```

### Deployment
- Build: `npm run build`
- Start: `npm run start`
- Deploy to Vercel or a custom Node.js server

---

## 💬 Dashboard & LLM Prompts

| Category            | Prompt Example                              | Action                                      |
|---------------------|---------------------------------------------|---------------------------------------------|
| **SmartBins**       | "Show bins >70% full"                       | Lists bins with high fill levels            |
|                     | "Forecast PET recovery next 30 days"        | Provides LSTM prediction in kg              |
|                     | "Highlight bins with high contamination"    | Flags bins above contamination threshold    |
| **Wallet/Swap**     | "Check my balances"                         | Shows PLY, CARB, USDC, EWASTE balances      |
|                     | "Swap 100 PLY to USDC"                     | Executes Solana Pay swap with QR code       |
|                     | "Transfer 50 CARB to Wallet ABC123"        | Initiates on-chain transaction              |
| **NFT Twins**       | "Mint NFT for Batch #128"                   | Calls Metaplex mint program                 |
| **ESG & Analytics** | "Generate ESG report for Company X"         | Returns carbon offsets & ESG score          |
| **AR/Wayfinding**   | "Guide me to nearest SmartBin"              | Displays AR map directions                  |

---

## 🌍 ESG & Waste Impact
- Track carbon footprints via NFT Twins
- Reward eco-friendly behavior with gamified missions
- Generate audit-ready ESG dashboards
- Enable traceable recycling with IoT SmartBins

---

## 🛠 Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) for details. Focus areas:
- Solana Pay and token swaps
- SmartBin IoT telemetry
- AI/LLM prompts and predictive analytics
- NFT Twin minting and gamification

Follow TypeScript standards, modular code practices, and include unit tests.

---

## 📜 License
MIT License
