# Polymers - Recycling Dashboard & Website

A blockchain-powered AI + IoT + AR platform for polymer recycling and ESG tracking.
Built with Solana, DePIN IoT SmartBins, and predictive AI routing, enabling:
	•	Transparent plastic recovery
	•	Contamination validation
	•	NFT Twin tracking
	•	Gamified ESG rewards

🌐 Website & Dashboard Demo

⸻

🔗 Live Token Balances

(Automatically fetch via on-chain queries in production dashboard)

⸻

🚀 Website + Dashboard Features

<details>
<summary>**🔬 Polymer Recycling Focus**</summary>


	•	SmartBins for Polymers – IoT-enabled bins for PET, HDPE, LDPE, and mixed plastics
	•	NFC/QR Validation – Scan packaging or polymer products for recycling proof
	•	AI Contamination Detection – Detect mixed polymers, labels, adhesives, or impurities
	•	RWA & NFT Twins – Each recycled batch generates an NFT twin (linked to polymer type & weight)

</details>


<details>
<summary>**🎯 Role-Based Access**</summary>


	•	Recycler+ – Gamified plastic recycling with streaks, missions, and Solana rewards
	•	Company Partner – ESG dashboards, carbon credit reports, and supply chain polymer offsets
	•	Manufacturer+ – Polymer input/output tracking, predictive IoT maintenance for recycling machines
	•	Admin Auditor – ESG proof validation, compliance, and audit-ready reporting

</details>


<details>
<summary>**🔗 Blockchain Integrations**</summary>


	•	Solana – NFTs, token transfers, staking, Solana Pay, Actions + Blinks
	•	Metaplex – NFT metadata & marketplace for polymer credits
	•	Pyth + Chainlink – ESG price feeds, polymer commodity oracle data
	•	Helius – On-chain indexing & history of polymer credits
	•	Helium/DePIN – IoT network for SmartBin telemetry (fill-levels, contamination, polymer type)
	•	Privy.io – Privacy-preserving identity for recyclers & corporate partners

</details>


<details>
<summary>**📊 Dashboard Context**</summary>


	•	Website Frontend – Public-facing educational pages + ESG campaign landing pages
	•	Secure Dashboard – Role-based access for recyclers, partners, manufacturers, auditors
	•	Real-Time Telemetry – IoT polymer bin updates on map + AR overlays
	•	Predictive Routing – AI-driven polymer pickup routes for efficiency & lower CO₂ footprint

</details>


<details>
<summary>**🎮 Gamification for Polymers**</summary>


	•	Recycling Missions – Target specific polymer categories for streak bonuses
	•	Reward Multipliers – Cleaner polymer separation = higher ESG score
	•	NFT Badges – Unlock rare NFTs (Polymer Guardian, Circular Hero, etc.)
	•	Leaderboards – Individual and company-level polymer recycling rankings

</details>


<details>
<summary>**📱 AR & Website Features**</summary>


	•	2D + AR Maps – Navigate to nearest polymer SmartBins
	•	Polymer Streams Visualization – Show flow of plastics from user → recycler → manufacturer
	•	Mobile Notifications – Push alerts for mission streaks & polymer contamination warnings
	•	AI Chat Assistant – Answers about plastic sorting, ESG benefits, and polymer value recovery

</details>



⸻

🖥 Production Dashboard – Build & Features

<details>
<summary>**🚀 Dashboard Features**</summary>


	•	User Authentication – Solana wallet login or Privy login (fallback if Privy fails)
	•	Wallet & Token Management – Live SOL, PLY, USDC, CARB balances, send/receive tokens, Solana Pay
	•	IoT & Recycling Telemetry – SmartBin telemetry, predictive pickup routing, AR overlays
	•	Analytics & ESG Tracking – Carbon credits, polymer recovery stats, ESG scoring dashboards
	•	AI Features – Chat assistant, contamination detection, ESG insights
	•	Error Handling – Error boundaries around Privy & blockchain APIs, graceful fallbacks

</details>


<details>
<summary>**⚙️ Production Build Commands**</summary>


npm ci
npm run build
npm run start
npm run api:start # optional backend

Required Environment Variables

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

</details>


<details>
<summary>**📊 Dashboard Layout**</summary>


	•	Sidebar: Navigation – Dashboard, Missions, Wallet, Analytics, ESG Reports
	•	Header: Live token badges, notifications, user profile
	•	Main Panel: Telemetry map, AR overlays, polymer streams visualization
	•	Footer: ESG metrics, links to website & company dashboards

</details>



⸻

💾 API Examples

<details>
<summary>**Token Balances API**</summary>


GET /api/wallet/balances?address=<WALLET_ADDRESS>
Response:
{
  "SOL": 0.123,
  "PLY": 456.789,
  "USDC": 123.45,
  "CARB": 987.654
}

</details>


<details>
<summary>**Telemetry API**</summary>


GET /api/iot/smartbins
Response:
[
  {
    "id": "bin-001",
    "location": "Warehouse 12",
    "fill_level": 75,
    "polymer_type": "PET",
    "contamination_score": 0.02
  }
]

</details>



⸻

🛠 Development Setup

<details>
<summary>**Scripts**</summary>


npm run dev          # Website + Dashboard
npm run api:dev      # Polymer recycling APIs
npm run ws:dev       # WebSocket updates
npm run db:migrate   # Database migrations

</details>


<details>
<summary>**Environment Variables for Development**</summary>


NEXT_PUBLIC_WS_URL="ws://localhost:3001"
NEXT_PUBLIC_SOLANA_RPC_URL="https://api.devnet.solana.com"
NEXT_PUBLIC_SUPABASE_URL="your_supabase_url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_key"
PRIVY_APP_ID="your_privy_app_id"
CHAINLINK_API_KEY="your_chainlink_key"

</details>



⸻

♻️ ESG & Polymer Impact
	•	Polymer Credit System: Tokenized credits for PET, HDPE, LDPE recycling
	•	Carbon Offsets: Verified CO₂ savings via blockchain oracles
	•	Corporate ESG: Companies prove polymer circularity with audit-ready dashboards
	•	Global Leaderboards: Community competition driving reduction of plastic waste
