🌐 Polymers – Recycling Dashboard & Website

Blockchain-powered AI + IoT + AR platform for polymer and e-waste recycling, ESG tracking, and gamified rewards. Built on Solana with DePIN IoT SmartBins and AI-driven routing, it provides:
	•	Transparent material recovery
	•	Contamination validation
	•	NFT Twin tracking
	•	Gamified ESG rewards

🔗 Live Demo


⸻

✨ Features

Polymer & E-Waste Recycling

<details>
<summary>Click to expand</summary>


	•	SmartBins: IoT-enabled for PET, HDPE, LDPE, mixed plastics, and e-waste plastics
	•	NFC/QR Validation: Scan to verify recycling actions
	•	AI Contamination Detection: Detects impurities in real time
	•	NFT Twins: Each batch generates an NFT linked to type, weight, and ESG compliance

</details>


Role-Based Access

<details>
<summary>Click to expand</summary>


	•	Recycler+: Gamified missions, streaks, and token rewards
	•	Company Partner: ESG dashboards and carbon credit reports
	•	Manufacturer+: Polymer/e-waste tracking, predictive IoT maintenance
	•	Admin Auditor: ESG validation and audit-ready reporting

</details>


Blockchain Integrations

<details>
<summary>Click to expand</summary>


	•	Solana: NFTs, staking, Solana Pay, Actions, Blinks
	•	Metaplex: NFT metadata and marketplace for credits
	•	Pyth + Chainlink: ESG price feeds and commodity data
	•	Helius: On-chain indexing of polymer/e-waste credits
	•	Helium/DePIN: IoT telemetry network for SmartBins
	•	Privy.io: Privacy-preserving identity for recyclers and corporate partners

</details>


Dashboard & Analytics

<details>
<summary>Click to expand</summary>


	•	Frontend: Public-facing educational pages & ESG campaigns
	•	Secure Dashboard: Role-based access, telemetry, AR overlays
	•	Real-Time Telemetry: SmartBin fill levels, contamination scores, predictive routes
	•	AI Insights: Contamination detection, predictive routing, ESG analytics
	•	Gamification: Missions, NFT badges, leaderboards

</details>


AR & Mobile Features

<details>
<summary>Click to expand</summary>


	•	2D + AR Maps: Locate nearest SmartBins
	•	Polymer & E-Waste Streams: Visualize flow from user → recycler → manufacturer
	•	Notifications: Alerts for missions and contamination issues
	•	AI Assistant: Guides on sorting, ESG benefits, and material recovery

</details>



⸻

🚀 Production Dashboard

Features
	•	Authentication: Solana wallet or Privy.io login with fallback
	•	Wallet Management: Real-time SOL, PLY, USDC, CARB balances; send/receive; Solana Pay
	•	Telemetry: SmartBin IoT data and AR overlays
	•	Analytics: Carbon credits, recovery stats, ESG dashboards
	•	AI Assistance: Contamination detection and ESG insights
	•	Error Handling: Robust fallbacks for Privy & blockchain APIs

Build Commands

npm ci
npm run build
npm run start
npm run api:start  # Optional backend

Environment Variables

NEXT_PUBLIC_WS_URL="wss://prod.polymers.io/ws"
NEXT_PUBLIC_SOLANA_RPC_URL="https://api.mainnet-beta.solana.com"
NEXT_PUBLIC_SUPABASE_URL="https://supabase.polymers.io"
NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_KEY"
PRIVY_APP_ID="YOUR_PRIVY_APP_ID"
CHAINLINK_API_KEY="YOUR_CHAINLINK_API_KEY"
TOKEN_PROGRAM_ID="TokenkegQfeZyiNwAJbNbGKPFXkQd5J8X8wnF8MPzYx"
PLY_MINT="PLYKdaCUgxTUw6rSjWbgSN97Qtecb6Fy6SazWf1tvAC"
CARB_MINT="CARBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
USDC_MINT="Es9vMFrzxxxxxxxxxxxxxxxxxxxxxxxxxx"


⸻

🛠️ API Examples

Token Balances

GET /api/wallet/balances?address=<WALLET_ADDRESS>

Response

{
  "SOL": 0.123,
  "PLY": 456.789,
  "USDC": 123.45,
  "CARB": 987.654
}

SmartBin Telemetry

GET /api/iot/smartbins

Response

[
  {
    "id": "bin-001",
    "location": "Warehouse 12",
    "fill_level": 75,
    "polymer_type": "PET",
    "contamination_score": 0.02
  }
]


⸻

⚙️ Development Setup

Scripts

npm run dev        # Website + Dashboard
npm run api:dev    # APIs
npm run ws:dev     # WebSocket updates
npm run db:migrate # Database migrations

Environment Variables (Dev)

NEXT_PUBLIC_WS_URL="ws://localhost:3001"
NEXT_PUBLIC_SOLANA_RPC_URL="https://api.devnet.solana.com"
NEXT_PUBLIC_SUPABASE_URL="your_supabase_url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_key"
PRIVY_APP_ID="your_privy_app_id"
CHAINLINK_API_KEY="your_chainlink_key"


⸻

🌍 ESG & Material Impact
	•	Polymer & E-Waste Credits: Tokenized recycling metrics
	•	Carbon Offsets: Verified CO₂ savings via oracles
	•	Corporate ESG: Audit-ready dashboards for circularity
	•	Leaderboards: Community-driven waste reduction

⸻

🤝 Contributing

See Contributing Guidelines and Code of Conduct.

📜 License

MIT License
