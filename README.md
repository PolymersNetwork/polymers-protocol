# Polymers Protocol – Full Stack Blockchain Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue)](https://www.typescriptlang.org/)
[![Solana](https://img.shields.io/badge/Solana-Mainnet-green)](https://solana.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Postgres-3ECF8E)](https://supabase.com/)

**Polymers Protocol** is a production-ready platform integrating **blockchain**, **IoT**, and **ESG** solutions. It offers a seamless experience for wallet management, NFT Twins, payments, recycling analytics, AI assistance, and SmartBin integration.

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
|--------------------|----------------|-----------------------|
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

Below are example API calls for the Polymers Protocol endpoints. All requests require an `Authorization: Bearer <your-token>` header for authentication.

<details>
<summary><strong>GET /users</strong></summary>

Retrieve a list of users or a specific user’s details.

**Request**:  
```bash
curl -X GET https://api.polymers.io/users \
-H "Authorization: Bearer <your-token>"
```

**Response**:  
```json
{
  "users": [
    {
      "id": "user_123",
      "wallet": "5Hb...xYz",
      "email": "user@example.com",
      "createdAt": "2025-09-26T07:43:00Z",
      "role": "user"
    }
  ]
}
```

</details>

<details>
<summary><strong>POST /transactions</strong></summary>

Create a new transaction (e.g., token transfer or payment).

**Request**:  
```bash
curl -X POST https://api.polymers.io/transactions \
-H "Authorization: Bearer <your-token>" \
-H "Content-Type: application/json" \
-d '{"wallet":"5Hb...xYz","amount":100,"token":"PLY","recipient":"7Jk...aBc"}'
```

**Response**:  
```json
{
  "transactionId": "txn_456",
  "status": "confirmed",
  "amount": 100,
  "token": "PLY",
  "timestamp": "2025-09-26T07:43:00Z",
  "signature": "5xY...zQw"
}
```

</details>

<details>
<summary><strong>GET /nft-twins</strong></summary>

Retrieve a user’s NFT Twins and their staking/reward status.

**Request**:  
```bash
curl -X GET https://api.polymers.io/nft-twins?wallet=5Hb...xYz \
-H "Authorization: Bearer <your-token>"
```

**Response**:  
```json
{
  "nfts": [
    {
      "id": "nft_789",
      "owner": "5Hb...xYz",
      "name": "EcoTwin #001",
      "staked": true,
      "rewards": 50000,
      "evolutionLevel": 2
    }
  ]
}
```

</details>

<details>
<summary><strong>POST /payments</strong></summary>

Initiate a payment using Solana Pay or Blinks.

**Request**:  
```bash
curl -X POST https://api.polymers.io/payments \
-H "Authorization: Bearer <your-token>" \
-H "Content-Type: application/json" \
-d '{"wallet":"5Hb...xYz","amount":50,"token":"USDC","method":"solana-pay","recipient":"7Jk...aBc"}'
```

**Response**:  
```json
{
  "paymentId": "pay_123",
  "status": "pending",
  "amount": 50,
  "token": "USDC",
  "timestamp": "2025-09-26T07:43:00Z",
  "transactionSignature": "4xY...pQr"
}
```

</details>

<details>
<summary><strong>GET /esg</strong></summary>

Retrieve ESG metrics for a user or city.

**Request**:  
```bash
curl -X GET https://api.polymers.io/esg?wallet=5Hb...xYz \
-H "Authorization: Bearer <your-token>"
```

**Response**:  
```json
{
  "esg": {
    "wallet": "5Hb...xYz",
    "plasticCollected": 25.5,
    "co2Reduced": 10.2,
    "recyclingCount": 15,
    "cityRank": 3
  }
}
```

</details>

<details>
<summary><strong>GET /smartbins</strong></summary>

Fetch real-time SmartBin data, including location and telemetry.

**Request**:  
```bash
curl -X GET https://api.polymers.io/smartbins?city=NewYork \
-H "Authorization: Bearer <your-token>"
```

**Response**:  
```json
{
  "smartbins": [
    {
      "id": "bin_456",
      "location": {
        "lat": 40.7128,
        "lng": -74.0060
      },
      "fillLevel": 75,
      "status": "operational",
      "lastUpdated": "2025-09-26T07:43:00Z"
    }
  ]
}
```

</details>

<details>
<summary><strong>POST /ai-agents</strong></summary>

Send a message to the AI chat agent and receive a response.

**Request**:  
```bash
curl -X POST https://api.polymers.io/ai-agents \
-H "Authorization: Bearer <your-token>" \
-H "Content-Type: application/json" \
-d '{"wallet":"5Hb...xYz","message":"What is my recycling impact?"}'
```

**Response**:  
```json
{
  "messageId": "msg_789",
  "response": "You’ve recycled 25.5kg of plastic, reducing CO2 by 10.2kg!",
  "remainingMessages": 8,
  "timestamp": "2025-09-26T07:43:00Z"
}
```

</details>

<details>
<summary><strong>POST /donations</strong></summary>

Create a donation transaction for ESG initiatives.

**Request**:  
```bash
curl -X POST https://api.polymers.io/donations \
-H "Authorization: Bearer <your-token>" \
-H "Content-Type: application/json" \
-d '{"wallet":"5Hb...xYz","amount":200,"token":"CARB","cause":"ocean_cleanup"}'
```

**Response**:  
```json
{
  "donationId": "don_101",
  "status": "confirmed",
  "amount": 200,
  "token": "CARB",
  "cause": "ocean_cleanup",
  "timestamp": "2025-09-26T07:43:00Z"
}
```

</details>

<details>
<summary><strong>GET /recycling</strong></summary>

Retrieve recycling history for a user.

**Request**:  
```bash
curl -X GET https://api.polymers.io/recycling?wallet=5Hb...xYz \
-H "Authorization: Bearer <your-token>"
```

**Response**:  
```json
{
  "recycling": [
    {
      "id": "rec_202",
      "wallet": "5Hb...xYz",
      "item": "plastic_bottle",
      "weight": 0.5,
      "timestamp": "2025-09-25T10:00:00Z"
    }
  ]
}
```

</details>

<details>
<summary><strong>POST /swap</strong></summary>

Perform a token swap via Jupiter or Raydium.

**Request**:  
```bash
curl -X POST https://api.polymers.io/swap \
-H "Authorization: Bearer <your-token>" \
-H "Content-Type: application/json" \
-d '{"wallet":"5Hb...xYz","fromToken":"SOL","toToken":"PLY","amount":1.5}'
```

**Response**:  
```json
{
  "swapId": "swp_303",
  "status": "completed",
  "fromAmount": 1.5,
  "toAmount": 150000,
  "fromToken": "SOL",
  "toToken": "PLY",
  "timestamp": "2025-09-26T07:43:00Z"
}
```

</details>

<details>
<summary><strong>PUT /settings</strong></summary>

Update user settings (e.g., wallet preferences, notifications).

**Request**:  
```bash
curl -X PUT https://api.polymers.io/settings \
-H "Authorization: Bearer <your-token>" \
-H "Content-Type: application/json" \
-d '{"wallet":"5Hb...xYz","defaultWallet":"Phantom","notifications":{"email":true}}'
```

**Response**:  
```json
{
  "userId": "user_123",
  "settings": {
    "defaultWallet": "Phantom",
    "notifications": {
      "email": true
    }
  },
  "updatedAt": "2025-09-26T07:43:00Z"
}
```

</details>

<details>
<summary><strong>GET /messages</strong></summary>

Retrieve a user’s AI chat message history.

**Request**:  
```bash
curl -X GET https://api.polymers.io/messages?wallet=5Hb...xYz \
-H "Authorization: Bearer <your-token>"
```

**Response**:  
```json
{
  "messages": [
    {
      "id": "msg_789",
      "wallet": "5Hb...xYz",
      "prompt": "What is my recycling impact?",
      "response": "You’ve recycled 25.5kg of plastic, reducing CO2 by 10.2kg!",
      "timestamp": "2025-09-26T07:43:00Z"
    }
  ]
}
```

</details>

---

## Monorepo Structure

```
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
```

---

## Environment Variables

```plaintext
NEXT_PUBLIC_SUPABASE_URL=https://<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
RPC_URL=https://api.mainnet-beta.solana.com
SOLANA_PRIVATE_KEY=<base58-private-key>
```

---

## Installation

<details>
<summary><strong>Web Dashboard</strong></summary>

```bash
cd apps/web
npm install
npm run dev
```

</details>

<details>
<summary><strong>Mobile App</strong></summary>

```bash
cd apps/mobile
npm install
expo start
```

</details>

<details>
<summary><strong>Backend API</strong></summary>

```bash
cd apps/backend
npm install
npm run dev
```

</details>

---

## Supabase Setup

1. Create tables:  
   `Users`, `Wallets`, `NFT Twins`, `Staking`, `Transactions`, `ESG`, `Payments`, `Donations`, `SmartBins`, `SavedPrompts`, `Recycling`, `Swap`  
2. Run migrations and seed data from `/app/data/sample-data.ts`  
3. Configure API keys in `.env`

---

## Usage

- **Web Dashboard**: Analytics, NFT Twins, staking, ESG metrics, SmartBin monitoring, token flows  
- **Mobile App**: Wallet management, AI chat, scan-to-pay, AR SmartBin navigation, ESG dashboards  
- **API**: REST endpoints for `/users`, `/transactions`, `/nft-twins`, `/payments`, `/esg`, `/smartbins`, `/ai-agents`

---

## AI Chat Billing

- **Free**: 10 messages per user  
- **Additional**: 10 messages = 100,000 PLY tokens  
- Messages and prompts stored in **Supabase** and integrated into the chat interface  

---

## Blockchain & DeFi Integration

- **Solana**: Blinks, NFT Twins (Metaplex), Dialect, Pyth, Jupiter, Raydium, Solana Pay, Helius, Helium/DePIN, Embedded Wallets  
- **SUI**: CARB token, NFT Twins, PoT, staking  
- **Payments & Swap**: SOL, PLY, CARB, USDC via Jupiter/Raydium  
- **Maps & AR**: Mapbox + AR Wayfinder + static image fallback  

---

## Backend API & MCP

- **Framework**: Fastify with MCP actions  
- **Endpoints**: `/users`, `/transactions`, `/nft-twins`, `/payments`, `/esg`, `/smartbins`, `/ai-agents`, `/donations`, `/recycling`, `/swap`, `/settings`, `/messages`  
- **MCP Actions**: Staking, NFT Twin evolution, reward claims, token swaps, ESG updates  
- **Telemetry**: IoT/SmartBin device data ingestion  

---

## Contributing

- Use **TypeScript** and adhere to the monorepo structure  
- Route blockchain operations through **MCP actions**  
- Implement fallbacks for wallets, maps, scanning, and offline scenarios  
- Maintain offline caching for IoT/SmartBin telemetry  

---

## Swagger API

- Full documentation: `docs/swagger.yaml`  
- Endpoints: `/users`, `/transactions`, `/nft-twins`, `/payments`, `/esg`, `/smartbins`, `/ai-agents`, `/donations`, `/swap`, `/messages`  

---

## License

[MIT License](https://opensource.org/licenses/MIT)
