# Polymers Protocol – Full Stack Platform

Polymers Protocol is a production-ready blockchain + IoT + ESG platform featuring:
	•	Wallet management
	•	NFT Twins & staking
	•	Payments & token swap
	•	Recycling analytics & ESG dashboards
	•	AI assistant
	•	SmartBin / IoT integration

This repository is a monorepo for Web Dashboard, Mobile App, and Backend APIs.

⸻

Screenshots

Web Dashboard

Mobile App

SmartBin Map / AR


⸻

Features

<details>
<summary>**Wallet & Token Management**</summary>


	•	Supports Phantom, Solflare, Backpack, Privy, embedded wallet, and biometric fallback
	•	Manage SOL, PLY, CARB, USDC
	•	Staking & NFT Twin rewards
	•	Automatic updates after blockchain actions

</details>


<details>
<summary>**NFT Twins**</summary>


	•	Staking, evolution, gamification, reward claiming
	•	NFT Twin rewards linked to token issuance

</details>


<details>
<summary>**AI Chat**</summary>


	•	GPT-powered chat with PLY token billing
	•	Free 10 messages per user; additional 10 messages = 100,000 PLY
	•	Saved prompts with quick insert

</details>


<details>
<summary>**Payments & Token Swap**</summary>


	•	Swap tokens using Jupiter / Raydium
	•	Pay via SOL, PLY, CARB, USDC, or Blinks
	•	QR/NFC scan-to-pay with fallback

</details>


<details>
<summary>**Recycling & ESG**</summary>


	•	Track recycled items, CO2 reduction, plastic collected
	•	City-level dashboards and leaderboards

</details>


<details>
<summary>**Transactions**</summary>


	•	Paginated, sortable transaction history
	•	Wallet-specific views

</details>


<details>
<summary>**SmartBins / IoT / AR**</summary>


	•	Real-time maps with AR navigation
	•	Offline caching and synchronization
	•	Telemetry and device status monitoring

</details>


<details>
<summary>**Offline & Fallbacks**</summary>


	•	Wallet: Embedded → Privy → Biometric
	•	Map: AR → Mapbox → Static images
	•	Scanning: QR/NFC → manual input

</details>



⸻

Monorepo Structure

/apps
  /web         # Web Dashboard
  /mobile      # React Native / Expo Mobile App
  /backend     # Fastify / MCP Backend API
  /shared      # Shared components, hooks, types, constants

/app/data      # Sample data and seeding
/lib           # Blockchain libraries: Solana, SUI, Helium/DePIN, Metaplex, Jupiter, Raydium, Solana Pay
/hooks         # React hooks for dashboard/mobile consumption
/context       # WalletContext, UserContext, AIProvider, ESGContext, PaymentsContext
/constants     # Colors, tokens, API endpoints
/utils         # Utility functions
/api           # Backend API routes
/prisma        # Supabase/Neon schema, migrations, seed data
/docs
  swagger.yaml
  architecture.md
/public
  images       # Logos, screenshots
/scripts
  deploy.ts
.env.example
README.md


⸻

Environment Variables

NEXT_PUBLIC_SUPABASE_URL=https://<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
RPC_URL=https://api.mainnet-beta.solana.com
SOLANA_PRIVATE_KEY=<base58-private-key>


⸻

Installation

<details>
<summary>**Web Dashboard**</summary>


cd apps/web
npm install
npm run dev

</details>


<details>
<summary>**Mobile App**</summary>


cd apps/mobile
npm install
expo start

</details>


<details>
<summary>**Backend API**</summary>


cd apps/backend
npm install
npm run dev

</details>



⸻

Supabase Setup
	1.	Create tables:
Users, Wallets, NFT Twins, Staking, Transactions, ESG, Payments, Donations, SmartBins, SavedPrompts, Recycling, Swap
	2.	Run migrations and seed sample data from /app/data/sample-data.ts
	3.	Configure API keys in .env

⸻

Usage
	•	Dashboard: Analytics, NFT Twins, staking, ESG, SmartBins, token flows
	•	Mobile App: Wallet management, AI chat, scan-to-pay, AR SmartBin navigation, ESG dashboards
	•	API: REST endpoints for /users, /transactions, /nft-twins, /payments, /esg, /smartbins, /ai-agents

⸻

AI Chat Billing
	•	Free: 10 messages per user
	•	Additional: 10 messages = 100,000 PLY tokens
	•	Messages and prompts stored in Supabase and integrated into chat interface

⸻

Blockchain & DeFi Integration
	•	Solana: Blinks, NFT Twins (Metaplex), Dialect, Pyth, Jupiter, Raydium, Solana Pay, Helius, Helium/DePIN, Embedded Wallets
	•	SUI: CARB token, NFT Twins, PoT, staking
	•	Payments & Swap: SOL, PLY, CARB, USDC via Jupiter/Raydium
	•	Maps & AR: Mapbox + AR Wayfinder + fallback images

⸻

Backend API & MCP
	•	Fastify + MCP actions
	•	Endpoints: /users, /transactions, /nft-twins, /payments, /esg, /smartbins, /ai-agents, /donations, /recycling, /swap, /settings, /messages
	•	MCP actions: Staking, NFT Twin evolution, claim rewards, token swaps, ESG updates
	•	Telemetry ingestion for IoT/SmartBin devices

⸻

Contributing
	•	Use TypeScript & follow monorepo structure
	•	Ensure blockchain operations go through MCP actions
	•	Include fallbacks for wallets, maps, scanning, offline scenarios
	•	Maintain offline caching for IoT/SmartBin telemetry

⸻

Swagger API
	•	Full API documentation: swagger.yaml
	•	Endpoints: /users, /transactions, /nft-twins, /payments, /esg, /smartbins, /ai-agents, /donations, /swap, /messages

⸻

License

MIT License
