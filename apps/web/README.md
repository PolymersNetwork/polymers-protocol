# Polymers Protocol – Recycling Dashboard & Website

A blockchain-powered AI + IoT + AR platform for polymer recycling and ESG tracking.
Built with Solana, DePIN IoT SmartBins, AI predictive routing, and NFT Twin tracking for gamified ESG rewards.

Website and Dashboard Demo

⸻

📌 Table of Contents
	1.	Features
	2.	Authentication & Access
	3.	Wallet & Payments
	4.	Production Build
	5.	APIs & AI Providers
	6.	Hardware & IoT
	7.	Mobile App Prompts
	8.	Data & Utilities
	9.	License

⸻

🚀 Features

<details>
<summary>🔬 Polymer Recycling Focus</summary>


	•	SmartBins for Polymers – IoT-enabled bins for PET, HDPE, LDPE, and mixed plastics
	•	NFC/QR Validation – Scan packaging or polymer products for recycling proof
	•	AI Contamination Detection – Detect mixed polymers, labels, adhesives, or impurities
	•	RWA & NFT Twins – Each recycled batch generates an NFT twin linked to polymer type & weight

</details>


<details>
<summary>🎯 Role-Based Access</summary>


	•	Recycler+ – Gamified recycling with streaks, missions, Solana rewards
	•	Company Partner – ESG dashboards, carbon credit reports, polymer offsets
	•	Manufacturer+ – Input/output tracking, predictive IoT maintenance for recycling machines
	•	Admin Auditor – ESG proof validation, compliance, and audit-ready reporting

</details>


<details>
<summary>🔗 Blockchain Integrations</summary>


	•	Solana – NFTs, token transfers, staking, Solana Pay, Actions + Blinks
	•	Metaplex – NFT metadata & marketplace for polymer credits
	•	Pyth + Chainlink – ESG price feeds, polymer commodity oracle data
	•	Helius – On-chain indexing & history of polymer credits
	•	Helium/DePIN – IoT network for SmartBin telemetry (fill-levels, contamination, polymer type)
	•	Privy.io – Privacy-preserving identity for recyclers & corporate partners

</details>


<details>
<summary>📊 Dashboard & Web Frontend</summary>


	•	Public-facing educational pages + ESG campaign landing pages
	•	Secure dashboard with role-based access
	•	Real-time IoT polymer bin updates on maps + AR overlays
	•	AI-driven predictive routing for efficient polymer pickups

</details>


<details>
<summary>🎮 Gamification</summary>


	•	Recycling missions – Target polymer categories for streak bonuses
	•	Reward multipliers – Cleaner polymer separation = higher ESG score
	•	NFT badges – Unlock rare NFTs (Polymer Guardian, Circular Hero)
	•	Leaderboards – Individual and company-level polymer recycling rankings

</details>


<details>
<summary>📱 Mobile & AR Features</summary>


	•	2D + AR maps to locate nearest SmartBins
	•	Polymer streams visualization: user → recycler → manufacturer
	•	Push notifications: streaks, contamination alerts, ESG updates
	•	AI Chat Assistant for plastic sorting, ESG benefits, token rewards

</details>



⸻

🔒 Authentication & Access

<details>
<summary>Auth Methods</summary>


	•	Solana Wallet Login (Phantom, Solflare, Backpack)
	•	Privy.io OAuth2 login with graceful fallback to wallet login
	•	Role-based access for /dashboard/<user> routes:

Recycler+ | Company Partner | Manufacturer+ | Admin Auditor

</details>


<details>
<summary>Error Handling</summary>


	•	Error boundaries around Privy usage
	•	Fallback to wallet-only access if Privy fails
	•	Alerts/logging for dashboard monitoring

</details>



⸻

💳 Wallet & Payments
	•	Check token balances (SOL, PLY, USDC, CARB)
	•	Send / receive tokens
	•	Stake NFTs or PLY tokens
	•	Solana Pay integration for token transfers

const sendPayment = async (recipient: PublicKey, amount: number) => {
  try {
    const tx = await solanaPay.send(wallet, recipient, amount, mintAddress);
    console.log('Payment sent:', tx.signature);
  } catch (err) {
    console.error('Payment failed', err);
  }
};


⸻

🖥 Production Build

npm run build           # Next.js production build
npm run start           # Start production server
npm run api:prod        # Deploy Polymer API
npm run ws:prod         # WebSocket updates for SmartBins telemetry
npm run db:migrate:prod # Database migrations on production

Environment Variables

NEXT_PUBLIC_SOLANA_RPC_URL="https://api.mainnet-beta.solana.com"
NEXT_PUBLIC_SUPABASE_URL="your_prod_supabase_url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_prod_supabase_key"
PRIVY_APP_ID="your_privy_app_id"
CHAINLINK_API_KEY="your_prod_chainlink_key"
NEON_DATABASE_URL="your_prod_neon_db_url"
STRIPE_API_KEY="your_prod_stripe_key"
METADATA_SERVICE_URL="https://api.example.com/upload-metadata"
JWT_SECRET="your_jwt_secret_prod"
NEXT_PUBLIC_WS_URL="wss://prod-server:3001"


⸻

⚡ APIs & AI Providers
	•	/ai/providers.tsx – General AI integrations
	•	/ai/solana/solana.tsx – Solana token/NFT interactions
	•	/ai/solana/metaplex.ts – NFT metadata & minting
	•	/ai/hivemapper.tsx – IoT mapping & telemetry
	•	/ai/jupiter.tsx – Token swaps
	•	/ai/solanaPay.tsx – Payments & transfers
	•	/ai/helium.tsx – DePIN telemetry
	•	/ai/raydium.tsx – AMM swap logic
	•	/ai/helius.tsx – On-chain indexing
	•	/ai/polymers.tsx – Recycling analytics
	•	/ai/dialect.tsx – Chat/LLM integration
	•	/lib/polymers/api.ts – Polymer data API endpoints
	•	/swagger.yaml – API specification

⸻

🛠 Hardware & IoT

<details>
<summary>SmartBins & Sensors</summary>


	•	DePIN IoT network for PET, HDPE, LDPE, and mixed plastics
	•	Raspberry Pi + sensors telemetry
	•	Types defined in /types/iot.ts
	•	Backend support in /hardwares/depin, /depin.ts

</details>



⸻

📱 Mobile App Prompts

<details>
<summary>AR & Gamification Prompts</summary>


	•	Find nearest SmartBin
	•	AI contamination detection
	•	Track NFT Twin creation
	•	Mission streak notifications
	•	ESG score updates

</details>



⸻

💾 Data & Utilities
	•	/data/ – Seed and test data
	•	/utils/ – Helper functions & types
	•	/context/ – React context for Auth, Wallet, AI, Dashboard
	•	/constants/ – Tokens, addresses, roles

⸻

📝 License

This project is licensed under MIT.
