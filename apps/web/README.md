# Polymers Protocol - Monorepo

A **blockchain-powered AI + IoT + AR platform** for polymer recycling and ESG tracking.  
Built with **Solana**, **DePIN IoT SmartBins**, and **predictive AI routing**, enabling **transparent plastic recovery**, **contamination validation**, **NFT Twin tracking**, and **gamified ESG rewards**.

---

## 🚀 Website & Dashboard Features

<details>
<summary>🔬 Polymer Recycling Focus</summary>

- **SmartBins for Polymers** – IoT-enabled bins for PET, HDPE, LDPE, and mixed plastics  
- **NFC/QR Validation** – Scan packaging or polymer products for recycling proof  
- **AI Contamination Detection** – Detect mixed polymers, labels, adhesives, or impurities  
- **RWA & NFT Twins** – Each recycled batch generates an NFT twin linked to polymer type & weight  

</details>

<details>
<summary>🎯 Role-Based Access</summary>

- **Recycler+** – Gamified recycling with streaks, missions, and Solana rewards  
- **Company Partner** – ESG dashboards, carbon credit reports, and supply chain polymer offsets  
- **Manufacturer+** – Polymer input/output tracking, predictive IoT maintenance for recycling machines  
- **Admin Auditor** – ESG proof validation, compliance, and audit-ready reporting  

</details>

<details>
<summary>🔗 Blockchain Integrations</summary>

- **Solana** – NFTs, token transfers, staking, Solana Pay, Actions + Blinks  
- **Metaplex** – NFT metadata & marketplace for polymer credits  
- **Pyth + Chainlink** – ESG price feeds & polymer commodity oracle data  
- **Helius** – On-chain indexing & history of polymer credits  
- **Helium / DePIN** – IoT telemetry for SmartBins (fill-levels, contamination, polymer type)  
- **Privy.io** – Privacy-preserving identity for recyclers & partners  
- **Jupiter + Raydium** – Token swaps & liquidity aggregation  

</details>

<details>
<summary>📊 Dashboard Context</summary>

- **Website Frontend** – Public educational pages & ESG campaign landing pages  
- **Secure Dashboard** – Role-based access for recyclers, partners, manufacturers, auditors  
- **Real-Time Telemetry** – IoT bin updates on map + AR overlays  
- **Predictive Routing** – AI-driven polymer pickup routes for efficiency & lower CO₂ footprint  

</details>

<details>
<summary>🎮 Gamification & Rewards</summary>

- **Recycling Missions** – Target specific polymer categories for streak bonuses  
- **Reward Multipliers** – Cleaner polymer separation = higher ESG score  
- **NFT Badges** – Unlock rare NFTs like Polymer Guardian, Circular Hero  
- **Leaderboards** – Individual & company-level recycling rankings  

</details>

<details>
<summary>📱 AR & Mobile Features</summary>

- **2D + AR Maps** – Navigate to nearest SmartBins  
- **Polymer Streams Visualization** – Flow of plastics from user → recycler → manufacturer  
- **Mobile Notifications** – Streaks, contamination alerts, ESG updates  
- **AI Chat Assistant** – Polymer sorting guidance, ESG impact explanations, reward suggestions  

</details>

---

## 💻 Mobile App & Dashboard Prompts

<details>
<summary>Mobile App Features</summary>

- **Sign In / Wallet Login** – Solana wallets or Privy login  
- **Solana Pay Integration** – Send, receive, check token balances  
- **Role-Based Dashboard** – `/dashboard/<user>` for recyclers, companies, manufacturers, auditors  
- **Push Notifications** – Recycling streaks, contamination warnings, ESG updates  
- **AI Assistance** – Guides for polymer sorting, token rewards, and ESG insights  

</details>

<details>
<summary>Dashboard Sidebar & Footer</summary>

- **Sidebar** – Home, Missions, NFTs, Token Balances, Analytics, Profile, Settings  
- **Footer** – ESG metrics, recycling leaderboard, blockchain transactions, privacy links  

</details>

---

## ⚙️ Development Setup

<details>
<summary>Environment Variables</summary>

```bash
NEXT_PUBLIC_WS_URL="ws://localhost:3001"
NEXT_PUBLIC_SOLANA_RPC_URL="https://api.devnet.solana.com"
NEXT_PUBLIC_SUPABASE_URL="your_supabase_url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_key"
PRIVY_APP_ID="your_privy_app_id"
CHAINLINK_API_KEY="your_chainlink_key"
METADATA_SERVICE_URL="https://api.example.com/upload-metadata"
JWT_SECRET="your-jwt-secret"
NEON_DATABASE_URL="your_neon_database_url"
STRIPE_API_KEY="your_stripe_key"

</details>


<details>
<summary>Scripts</summary>


npm run dev          # Website + Dashboard
npm run api:dev      # Polymer recycling APIs
npm run ws:dev       # WebSocket updates
npm run db:migrate   # Database migrations for polymer recycling

</details>



⸻

🧩 APIs & Libraries

<details>
<summary>AI Providers</summary>


	•	Grok, Deepseek, Blob, Gemini, Dialect – AI chat, analysis, & prompts
	•	File references: /ai/providers.tsx, /ai/solana/solana.tsx, /ai/solana/metaplex.ts, /hivemapper.tsx, /jupiter.tsx, /solana pay.tsx, /helium.tsx, /raydium.tsx, /helius.tsx, /polymers.tsx, /dialect.tsx

</details>


<details>
<summary>Blockchain & Token Libraries</summary>


	•	Solana Wallets – Phantom, Solflare, Backpack
	•	Token Programs – SPL, PLY, USDC, SOL, CARB mint addresses (Mainnet & Devnet)
	•	Metaplex – NFT metadata & marketplace
	•	Raydium / Jupiter – Swap & liquidity
	•	Solana Pay – Token send/receive & payment verification

</details>


<details>
<summary>Backend, Hooks & Utilities</summary>


	•	/context/ – Auth & AppContext
	•	/constants/ – Token mint addresses, program IDs, API endpoints
	•	/utils/ – Helpers, formatters, network utilities
	•	/data/ – IoT, polymer streams, historical datasets
	•	/hardwares/depin – Sensors, Raspberry Pi integration
	•	/types/ – iot.ts, item.ts, helper.ts, actions/actions.ts, esg.ts
	•	/lib/polymers/api.ts – Polymer API helpers
	•	/actions/esm.ts – Client-side action modules

</details>


<details>
<summary>Swagger / API Docs</summary>


	•	swagger.yaml – Full API schema for blockchain, AI, ESG, and IoT endpoints

</details>



⸻

♻️ ESG & Polymer Impact

<details>
<summary>Recycling Credits & Carbon Offsets</summary>


	•	Polymer Credit System – Tokenized credits for PET, HDPE, LDPE recycling
	•	Carbon Offsets – Verified CO₂ savings via blockchain oracles
	•	Corporate ESG Dashboards – Track polymer circularity, audit-ready reports
	•	Global Leaderboards – Community rankings to encourage recycling

</details>



⸻

🔗 Demo & Screenshots

Website & Dashboard Demo: https://poiymers-website.vercel.app
	•	Screenshots, AR visualizations, and mobile app flows in /public/images/screenshots/

⸻

📄 License

This project is MIT licensed. See LICENSE for details.
