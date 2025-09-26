# Polymers Protocol – Full Stack Platform

Polymers Protocol is a production-ready blockchain + IoT + ESG platform with wallet management, NFT Twins, staking, payments, recycling analytics, AI assistant, and SmartBin/IoT integration. This repository contains a monorepo for Web Dashboard, Mobile App, and Backend APIs.

⸻

🚀 Features
	•	Wallet & Token Management
	•	Phantom, Solflare, Backpack, Privy, embedded wallet, biometric fallback
	•	Manage SOL, PLY, CARB, USDC
	•	Staking & NFT Twin rewards
	•	NFT Twins
	•	Staking, evolution, gamification, reward claiming
	•	NFT Twin rewards linked to token issuance
	•	AI Chat
	•	GPT-powered with PLY token billing
	•	10 free messages/user, additional messages cost 100,000 PLY per 10 messages
	•	Saved prompts and quick insert
	•	Payments & Token Swap
	•	Jupiter/Raydium swap
	•	Pay via SOL, PLY, CARB, USDC, or Blinks
	•	QR/NFC scan-to-pay with fallback
	•	Recycling & ESG
	•	Track recycled items, CO2 reduction, plastic collected
	•	City-level dashboards, leaderboards, and analytics
	•	Transactions
	•	Paginated, sortable, wallet-specific views
	•	SmartBins / IoT / AR
	•	Real-time maps, AR navigation, offline caching
	•	Telemetry and predictive maintenance
	•	Offline & Fallbacks
	•	Wallet: Embedded → Privy → Biometric
	•	Maps: AR → Mapbox → Static images
	•	Scanning: QR/NFC → manual input

⸻

🏗️ Monorepo Structure

/apps
  /web         # Web Dashboard
  /mobile      # React Native / Expo Mobile App
  /backend     # Fastify / MCP Backend API
  /shared      # Shared components, hooks, types, constants

/app/data      # Sample data, migrations, seed scripts
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
  images       # Example screenshots, logos
/scripts
  deploy.ts
.env.example
README.md


⸻

🗄️ Supabase Integration
	•	Tables: Users, Wallets, NFT Twins, Staking, Transactions, ESG, Payments, Donations, SmartBins, SavedPrompts, Recycling, Swap
	•	Hooks fetch & update blockchain and user data
	•	Seed/sample data in /app/data/sample-data.ts

⸻

💬 AI Chat Billing
	•	Free: 10 messages per user
	•	Additional: 10 messages = 100,000 PLY tokens
	•	Messages & prompts stored in Supabase with quick insert into dashboard sidebar

⸻

⛓ Blockchain & DeFi Integration
	•	Solana: Blinks, NFT Twins (Metaplex), Dialect, Pyth, Jupiter, Raydium, Solana Pay, Helius, Helium/DePIN, Embedded Wallets
	•	SUI: CARB token, NFT Twins, PoT, staking
	•	Payments & Swap: SOL, PLY, CARB, USDC via Jupiter/Raydium
	•	Maps & AR: Mapbox + AR Wayfinder + fallback images

⸻

📱 Mobile App Features
	•	Expo + React Native
	•	Wallet management (embedded/Privy/biometric fallback)
	•	Scan-to-Pay (QR/NFC) with fallback
	•	AR SmartBin navigation
	•	AI chat & ESG dashboards
	•	Offline caching & sync
	•	Push notifications

⸻

⚡ Backend API & MCP
	•	Framework: Fastify + MCP actions
	•	Endpoints: /users, /transactions, /nft-twins, /payments, /esg, /smartbins, /ai-agents, /donations, /recycling, /swap, /settings, /messages
	•	MCP actions: Staking, NFT Twin evolution, claim rewards, token swaps, ESG updates
	•	Telemetry ingestion for IoT/SmartBin devices

⸻

⚙️ Environment Variables

NEXT_PUBLIC_SUPABASE_URL=https://<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
RPC_URL=https://api.mainnet-beta.solana.com
SOLANA_PRIVATE_KEY=<base58-private-key>


⸻

🛠️ Installation

Web Dashboard

cd apps/web
npm install
npm run dev

Mobile App

cd apps/mobile
npm install
expo start

Backend API

cd apps/backend
npm install
npm run dev


⸻

📄 Swagger API
	•	Full API documentation: Swagger YAML
	•	Includes: users, transactions, NFT Twins, ESG, payments, donations, SmartBins, AI agents, swaps, messages


⸻

🚀 Usage
	•	Dashboard: Analytics, NFT Twins, staking, ESG, SmartBins, token flows
	•	Mobile App: Wallet management, AI chat, scan-to-pay, AR navigation, ESG dashboards
	•	API: REST endpoints for /users, /transactions, /nft-twins, /payments, /esg, /smartbins, /ai-agents

⸻

🤝 Contributing
	•	Use TypeScript & follow monorepo structure
	•	Ensure all blockchain ops go through MCP actions
	•	Include fallbacks for wallets, maps, scanning, offline scenarios
	•	Maintain offline caching for IoT/SmartBin telemetry

⸻

📷 Screenshots

Web Dashboard Overview

Mobile App AI Chat

SmartBin Map & AR


⸻

📝 License

MIT License
