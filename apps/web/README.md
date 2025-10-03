# Polymers Recycling Dashboard & Website

**Version 1.0 Beta**

A blockchain-powered, AI-driven platform for polymer and e-waste recycling, enabling supply chain transparency, ESG tracking, and gamified incentives. Built with **Solana**, **AI/ML**, **IoT SmartBins**, **AR**, and **TensorFlow.js**, it offers:

- **SmartBins**: Real-time material detection and IoT integration
- **NFT Twins**: Blockchain-based batch tracking
- **Predictive Analytics**: Contamination and supply chain insights
- **Solana Pay**: Instant rewards and token swaps
- **AI/LLM Assistants**: Operational and ESG guidance

🔗 **Live Web App Demo**: [demo.polymersnetwork.org](https://poiymers-website.vercel.app)

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

### 8. Helper Module
1. `computeIoTAnalytics(history)`
   - Computes average fill level, average contamination score, min/max fill levels, contamination trend
   - Predicts the next collection time based on the fill level trend
2. `addIoTReading(recycledItem, newReading)`
   - Adds the new sensor reading to latest and history
   - Automatically updates `iotAnalytics` for immediate dashboard consumption
3. Ready for ML & AI pipelines
   - The history array and `iotAnalytics` can now be used directly for trend analysis or predictive modeling

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

---

## 📂 End-to-End Architecture

This diagram visualizes the **Polymers Protocol full-stack flow**, showing **frontend interactions, backend processing, IoT telemetry, AI/LLM, token flows, NFT Twins, dashboards, Solana Pay, Maps/AR, ESG tracking, and CI/CD pipelines**.

```mermaid
graph TD
    %% IoT Layer
    A[SmartBin Sensors<br>Fill, Weight, Temp, Contamination<br>Helium DePIN] -->|Telemetry & Material Data| B[Supabase Realtime DB]

    %% AI ESG Scanner
    B -->|Material Detection & ESG Metrics| C[AI ESG Scanner<br>TensorFlow.js + Expo-camera]
    C -->|ESG Calculations| B

    %% Oracles & Token Flow
    B -->|Real-Time Data| D[Oracles Layer<br>Pyth + Chainlink + Internal DB]
    D -->|Validated Metrics| E[Token Flow Engine<br>PLY, CARB, EWASTE, HONEY, HNT<br>Bezier Animations]

    %% NFT Twins & Gamification
    E -->|Minting & Rewards| F[NFT Twins & Gamification<br>Metaplex cNFTs, Leaderboards, Missions]
    F -->|Display Rewards| G[Dashboards<br>React Native / Next.js]

    %% Solana Pay Integration
    G -->|Swap/Rewards| H[Solana Pay Wallets<br>PLY, CARB, USDC, EWASTE]
    H -->|Transaction Logging| B

    %% Predictive Analytics
    B -->|Historical Data| I[Predictive Analytics<br>LSTM Models, ESG Forecasts, Maintenance Scheduling]
    I -->|Insights & Predictions| G

    %% AI & LLM Agent
    G -->|User Queries| J[AI & LLM Agent<br>Dialect + GPT/Grok]
    J -->|Autonomous Actions<br>Swap, Transfer, Forecast, Mint NFT| H
    J -->|Insights & Recommendations| G

    %% Maps & Wayfinding
    B -->|Geospatial & Bin Data| K[Maps & AR Layer<br>Hivemapper + Mapbox]
    K -->|Route & Location Info| G

    %% ESG Tracking & Compliance
    B -->|Telemetry & ESG Metrics| L[Compliance & ESG Tracking<br>Carbon Footprint, Audit Logs, KPIs]
    L --> G
    L -->|Anomaly Alerts| M[Sentry]

    %% CI/CD Layer
    G -->|Build/Test| N[CI/CD Pipeline<br>Expo, Vercel, GitHub Actions]
    B -->|Backend Deploy| N
    D -->|Smart Contracts Deploy| N
    N -->|OTA Updates| A

    %% Styling
    style A fill:#1A3C34,stroke:#F4A261,color:#FFFFFF
    style B fill:#F4A261,stroke:#1A3C34,color:#1A3C34
    style C fill:#1A3C34,stroke:#F4A261,color:#FFFFFF
    style D fill:#D3D3D3,stroke:#1A3C34,color:#1A3C34
    style E fill:#1A3C34,stroke:#F4A261,color:#FFFFFF
    style F fill:#D3D3D3,stroke:#1A3C34,color:#1A3C34
    style G fill:#FFFFFF,stroke:#1A3C34,color:#1A3C34
    style H fill:#F4A261,stroke:#1A3C34,color:#1A3C34
    style I fill:#D3D3D3,stroke:#1A3C34,color:#1A3C34
    style J fill:#1A3C34,stroke:#F4A261,color:#FFFFFF
    style K fill:#D3D3D3,stroke:#1A3C34,color:#1A3C34
    style L fill:#F4A261,stroke:#1A3C34,color:#1A3C34
    style M fill:#1A3C34,stroke:#F4A261,color:#FFFFFF
    style N fill:#1A3C34,stroke:#F4A261,color:#FFFFFF

🖼 Rendering Instructions
	1.	Install Mermaid CLI:

npm install -g @mermaid-js/mermaid-cli

	2.	Export Diagram to SVG:

npx @mermaid-js/mermaid-cli -i docs/frontend_backend_architecture.md -o docs/frontend_backend_architecture.svg

	3.	Convert SVG to PNG (optional):

convert docs/frontend_backend_architecture.svg docs/frontend_backend_architecture.png

	4.	Embed in README or docs:

![Polymers Protocol Architecture](docs/frontend_backend_architecture.png)


⸻

🚀 Getting Started

Prerequisites
	•	Node.js: ≥16
	•	npm: ≥8
	•	Solana CLI: Installed
	•	Supabase: Project for transaction logging
	•	Privy.io: For user authentication
	•	TensorFlow.js: For LSTM inference
	•	Solana Pay SDK: @solana/pay, @solana/web3.js, @solana/spl-token
	•	Git: For version control

Installation

git clone https://github.com/PolymersNetwork/polymers-recycling-platform.git
cd polymers-recycling-platform
npm ci
cp .env.example .env
# Configure environment variables in .env
npm run dev

Environment Variables

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


⸻

🔧 Running the Platform

Development

npm run dev        # Start frontend with hot reload
npm run api:start  # Start API server

Testing

npm run test       # Run unit & integration tests

Deployment
	•	Build: npm run build
	•	Start: npm run start
	•	Deploy to Vercel or a custom Node.js server

⸻

💬 Dashboard & LLM Prompts

Category	Prompt Example	Action
SmartBins	“Show bins >70% full”	Lists bins with high fill levels
	“Forecast PET recovery next 30 days”	Provides LSTM prediction in kg
	“Highlight bins with high contamination”	Flags bins above contamination threshold
Wallet/Swap	“Check my balances”	Shows PLY, CARB, USDC, EWASTE balances
	“Swap 100 PLY to USDC”	Executes Solana Pay swap with QR code
	“Transfer 50 CARB to Wallet ABC123”	Initiates on-chain transaction
NFT Twins	“Mint NFT for Batch #128”	Calls Metaplex mint program
ESG & Analytics	“Generate ESG report for Company X”	Returns carbon offsets & ESG score
AR/Wayfinding	“Guide me to nearest SmartBin”	Displays AR map directions


⸻

🌍 ESG & Waste Impact
	•	Track carbon footprints via NFT Twins
	•	Reward eco-friendly behavior with gamified missions
	•	Generate audit-ready ESG dashboards
	•	Enable traceable recycling with IoT SmartBins

⸻

🛠 Contributing

See CONTRIBUTING.md for details. Focus areas:
	•	Solana Pay and token swaps
	•	SmartBin IoT telemetry
	•	AI/LLM prompts and predictive analytics
	•	NFT Twin minting and gamification

Follow TypeScript standards, modular code practices, and include unit tests.

⸻

📜 License

MIT License
