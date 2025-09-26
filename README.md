# Polymers Protocol – Full Stack Blockchain Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue)](https://www.typescriptlang.org/)
[![Solana](https://img.shields.io/badge/Solana-Mainnet-green)](https://solana.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Postgres-3ECF8E)](https://supabase.com/)
[![Swagger UI](https://img.shields.io/badge/Swagger-OpenAPI-blue?logo=swagger)](https://api.polymers.io/swagger)

**Polymers Protocol** is a production-ready platform integrating **blockchain**, **IoT**, and **ESG** solutions. It provides seamless wallet management, NFT Twins, payments, recycling analytics, AI assistance, and SmartBin integration.

This repository is a **monorepo** housing the **Web Dashboard**, **Mobile App**, and **Backend APIs**.

---

## Table of Contents

- [Screenshots](#screenshots)
- [Features](#features)
- [Dashboard Pages](#dashboard-pages)
- [Mobile Screens](#mobile-screens)
- [API Examples](#api-examples)
- [Monorepo Structure](#monorepo-structure)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Supabase Setup](#supabase-setup)
- [Usage](#usage)
- [AI Chat Billing](#ai-chat-billing)
- [Blockchain & DeFi Integration](#blockchain--defi-integration)
- [Backend API & MCP](#backend-api--mcp)
- [Contributing](#contributing)
- [Swagger API](#swagger-api)
- [License](#license)

---

## Screenshots

| **Web Dashboard** | **Mobile App** | **SmartBin Map / AR** |
|------------------|----------------|-----------------------|
| Analytics, NFT Twins, ESG | Wallet, AI Chat, Scan-to-Pay | Real-time AR navigation |

---

## Features

<details>
<summary><strong>Wallet & Token Management</strong></summary>

- Supports **Phantom**, **Solflare**, **Backpack**, **Privy**, embedded wallet, and biometric fallback  
- Manage **SOL**, **PLY**, **CARB**, **USDC** tokens  
- Staking and NFT Twin rewards  
- Automatic updates post-blockchain actions  

</details>

<details>
<summary><strong>NFT Twins</strong></summary>

- Staking, evolution, gamification, and reward claiming  
- Rewards linked to token issuance  

</details>

<details>
<summary><strong>AI Chat</strong></summary>

- GPT-powered chat with **PLY token billing**  
- Free: 10 messages per user  
- Additional: 10 messages = 100,000 PLY  
- Saved prompts with quick-insert functionality  

</details>

<details>
<summary><strong>Payments & Token Swap</strong></summary>

- Token swaps via **Jupiter** and **Raydium**  
- Payments with **SOL**, **PLY**, **CARB**, **USDC**, or **Blinks**  
- QR/NFC scan-to-pay with manual fallback  

</details>

<details>
<summary><strong>Recycling & ESG</strong></summary>

- Track recycled items, CO2 reduction, and plastic collected  
- City-level dashboards and leaderboards  

</details>

<details>
<summary><strong>Transactions</strong></summary>

- Paginated, sortable transaction history  
- Wallet-specific views  

</details>

<details>
<summary><strong>SmartBins / IoT / AR</strong></summary>

- Real-time maps with **AR navigation**  
- Offline caching and synchronization  
- Telemetry and device status monitoring  

</details>

<details>
<summary><strong>Offline & Fallbacks</strong></summary>

- Wallet: Embedded → Privy → Biometric  
- Map: AR → Mapbox → Static images  
- Scanning: QR/NFC → Manual input  

</details>

---

## Dashboard Pages

<details>
<summary><strong>Analytics Dashboard</strong></summary>

- Real-time metrics for recycling, CO2 reduction, and token flows  
- Visualizations: Charts, graphs, and leaderboards  
- Filters for time range and wallet-specific data  

</details>

<details>
<summary><strong>NFT Twins Dashboard</strong></summary>

- View, stake, and evolve NFT Twins  
- Track rewards and gamification progress  
- Integration with **Metaplex** for NFT management  

</details>

<details>
<summary><strong>ESG Dashboard</strong></summary>

- City-level ESG metrics (CO2, plastic collected)  
- Leaderboards for recycling contributions  
- Exportable reports for compliance  

</details>

<details>
<summary><strong>SmartBins Dashboard</strong></summary>

- Real-time map of SmartBin locations  
- Telemetry data: Fill levels, device status  
- AR navigation toggle  

</details>

---

## Mobile Screens

<details>
<summary><strong>Wallet Management</strong></summary>

- View balances for **SOL**, **PLY**, **CARB**, **USDC**  
- Stake NFTs and claim rewards  
- Switch between wallets (Phantom, Solflare, etc.)  

</details>

<details>
<summary><strong>AI Chat</strong></summary>

- Chat interface with GPT-powered responses  
- View message quotas and PLY billing  
- Access saved prompts  

</details>

<details>
<summary><strong>Scan-to-Pay</strong></summary>

- QR/NFC scanning for payments  
- Manual input fallback  
- Supports **Solana Pay** and **Blinks**  

</details>

<details>
<summary><strong>AR SmartBin Navigation</strong></summary>

- AR-powered navigation to nearby SmartBins  
- Fallback to **Mapbox** or static images  
- Offline caching for map data  

</details>

<details>
<summary><strong>ESG Dashboard</strong></summary>

- Mobile-optimized ESG metrics  
- Track personal recycling contributions  
- View city-level leaderboards  

</details>

---

## API Examples

<details>
<summary><strong>GET /users</strong></summary>

```bash
curl -X GET https://api.polymers.io/users \
-H "Authorization: Bearer <your-token>"

Response:

{
  "users": [
    {
      "id": "user_123",
      "wallet": "5Hb...xYz",
      "email": "user@example.com",
      "createdAt": "2025-09-26T07:43:00Z"
    }
  ]
}

</details>


<details>
<summary><strong>POST /transactions</strong></summary>


curl -X POST https://api.polymers.io/transactions \
-H "Authorization: Bearer <your-token>" \
-H "Content-Type: application/json" \
-d '{"wallet":"5Hb...xYz","amount":100,"token":"PLY","recipient":"7Jk...aBc"}'

Response:

{
  "transactionId": "txn_456",
  "status": "confirmed",
  "amount": 100,
  "token": "PLY",
  "timestamp": "2025-09-26T07:43:00Z"
}

</details>


<details>
<summary><strong>GET /nft-twins</strong></summary>


curl -X GET https://api.polymers.io/nft-twins?wallet=5Hb...xYz \
-H "Authorization: Bearer <your-token>"

Response:

{
  "nfts": [
    {
      "id": "nft_789",
      "owner": "5Hb...xYz",
      "name": "EcoTwin #001",
      "staked": true,
      "rewards": 50000
    }
  ]
}

</details>


<!-- Add other API examples as needed -->



⸻

Monorepo Structure

/apps
  /web          # Web Dashboard (Next.js)
  /mobile       # React Native / Expo Mobile App
  /backend      # Fastify / MCP Backend API
  /shared       # Shared components, hooks, types, constants
/app/data       # Sample data and seeding
/lib            # Blockchain: Solana, SUI, Helium/DePIN, Metaplex, Jupiter, Raydium, Solana Pay
/hooks          # React hooks for dashboard/mobile
/context        # WalletContext, UserContext, AIProvider, ESGContext, PaymentsContext
/constants      # Colors, tokens, API endpoints
/utils          # Utility functions
/api            # Backend API routes
/prisma         # Supabase/Neon schema, migrations, seed data
/docs
  swagger.yaml  # API documentation
  architecture.md
/public
  images        # Logos, screenshots
/scripts
  deploy.ts     # Deployment scripts
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
<summary><strong>Web Dashboard</strong></summary>


cd apps/web
npm install
npm run dev

</details>


<details>
<summary><strong>Mobile App</strong></summary>


cd apps/mobile
npm install
expo start

</details>


<details>
<summary><strong>Backend API</strong></summary>


cd apps/backend
npm install
npm run dev

</details>



⸻

Supabase Setup
	1.	Create tables: Users, Wallets, NFT Twins, Staking, Transactions, ESG, Payments, Donations, SmartBins, SavedPrompts, Recycling, Swap
	2.	Run migrations and seed data from /app/data/sample-data.ts
	3.	Configure API keys in .env

⸻

Usage
	•	Web Dashboard: Analytics, NFT Twins, staking, ESG metrics, SmartBin monitoring, token flows
	•	Mobile App: Wallet management, AI chat, scan-to-pay, AR SmartBin navigation, ESG dashboards
	•	API: REST endpoints for /users, /transactions, /nft-twins, /payments, /esg, /smartbins, /ai-agents

⸻

AI Chat Billing
	•	Free: 10 messages per user
	•	Additional: 10 messages = 100,000 PLY tokens
	•	Messages and prompts stored in Supabase

⸻

Blockchain & DeFi Integration
	•	Solana: Blinks, NFT Twins, Dialect, Pyth, Jupiter, Raydium, Solana Pay, Helius, Helium/DePIN, Embedded Wallets
	•	SUI: CARB token, NFT Twins, PoT, staking
	•	Payments & Swap: SOL, PLY, CARB, USDC via Jupiter/Raydium
	•	Maps & AR: Mapbox + AR Wayfinder + static image fallback

⸻

Backend API & MCP
	•	Fastify + MCP actions
	•	Endpoints: /users, /transactions, /nft-twins, /payments, /esg, /smartbins, /ai-agents, /donations, /recycling, /swap, /settings, /messages
	•	MCP actions: Staking, NFT Twin evolution, reward claims, token swaps, ESG updates
	•	Telemetry ingestion: IoT/SmartBin devices

⸻

Contributing
	•	Use TypeScript and follow monorepo structure
	•	Route blockchain ops through MCP actions
	•	Implement fallbacks for wallets, maps, scanning, offline scenarios
	•	Maintain offline caching for IoT/SmartBin telemetry

⸻

Swagger API

Access the fully interactive API documentation:

	•	Full docs in docs/swagger.yaml
	•	Endpoints: /users, /transactions, /nft-twins, /payments, /esg, /smartbins, /ai-agents, /donations, /swap, /messages

⸻

License

MIT License
