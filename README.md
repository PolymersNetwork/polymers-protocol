# Polymers Protocol – Full-Stack Platform

Polymers Protocol is a **production-ready blockchain + IoT + ESG platform** featuring wallet management, NFT Twins, staking, payments, recycling analytics, AI assistant, and SmartBin/IoT integration. This monorepo contains the **Web Dashboard, Mobile App, and Backend APIs**.

---

## Features

### Wallet & Token Management
- Support for **Phantom, Solflare, Backpack, Privy**, and embedded wallets with biometric fallback.
- Manage **SOL, PLY, CARB, USDC**, staking, NFT Twin rewards, and token swaps.
- Automatic balance updates after blockchain actions.

### NFT Twins
- Staking, evolution, gamification, and reward claiming.
- Rewards linked directly to token issuance.

### AI Chat
- GPT-powered chat with **PLY token billing**.
- 10 free messages per user; additional messages cost **100,000 PLY per 10 messages**.
- Save prompts and quick insert for rapid reuse.

### Payments & Token Swap
- Swap tokens via **Jupiter/Raydium**.
- Pay using SOL, PLY, CARB, USDC, or Blinks.
- QR/NFC scan-to-pay with manual fallback.

### Recycling & ESG
- Track recycled items, CO2 reduction, and plastic collected.
- City-level dashboards and leaderboards.
- IoT SmartBin integration with telemetry and predictive maintenance.

### Transactions
- Paginated, sortable transaction history.
- Wallet-specific views.

### SmartBins / IoT / AR
- Real-time maps with AR navigation.
- Offline caching and synchronization.
- Telemetry and device status monitoring.

### Offline & Fallbacks
- Wallet fallback: **Embedded → Privy → Biometric**
- Map fallback: **AR → Mapbox → Static images**
- Scanning fallback: **QR/NFC → Manual input**

---

## Monorepo Structure

/apps
/web         # Web Dashboard
/mobile      # React Native / Expo Mobile App
/backend     # Fastify / MCP Backend API
/shared      # Shared components, hooks, types, constants

/app/data      # Sample data and seed scripts
/lib           # Blockchain libraries: Solana, SUI, Helium/DePIN, Metaplex, Jupiter, Raydium, Solana Pay
/hooks         # React hooks for dashboard and mobile consumption
/context       # WalletContext, UserContext, AIProvider, etc.
/constants     # Colors, tokens, API endpoints
/utils         # Utility functions

---

## Environment Variables

Create a `.env` file for **web, mobile, and backend**:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
RPC_URL=https://api.mainnet-beta.solana.com
SOLANA_PRIVATE_KEY=<base58-private-key>


⸻

Installation

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

Supabase Setup
	1.	Create the following tables:
	•	Users, Wallets, NFT Twins, Staking, Transactions, ESG, Payments, Donations, SmartBins, SavedPrompts
	2.	Run migrations and seed sample data from /app/data/sample-data.ts.
	3.	Configure API keys in .env.

⸻

Usage
	•	Dashboard: Full analytics, NFT Twins, staking, ESG, SmartBins, and token flows.
	•	Mobile App: Wallet management, AI chat, scan-to-pay, AR navigation for SmartBins, ESG dashboards.
	•	Backend API: REST endpoints for /users, /transactions, /nft-twins, /payments, /esg, /smartbins, /ai-agents.

⸻

AI Chat Billing
	•	10 free messages per user.
	•	Additional messages: 10 messages = 100,000 PLY tokens.
	•	Messages and prompts are stored in Supabase and integrated into the chat interface.

⸻

Contributing
	•	Use TypeScript and follow the folder structure.
	•	Ensure all blockchain operations go through MCP actions.
	•	Add fallbacks for wallets, maps, and scanning.
	•	Keep offline caching in mind for IoT/SmartBin telemetry.

⸻

License

MIT
