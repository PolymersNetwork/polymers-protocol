# Polymers Protocol – Full Stack Blockchain Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue)](https://www.typescriptlang.org/)
[![Solana](https://img.shields.io/badge/Solana-Mainnet-green)](https://solana.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Postgres-3ECF8E)](https://supabase.com/)
[![Swagger](https://img.shields.io/badge/Swagger-API_Docs-brightgreen)](https://api.polymers.io/swagger)
[![AI](https://img.shields.io/badge/Feature-AI_Chat-FF69B4)](https://docs.polymers.io/ai)
[![AR](https://img.shields.io/badge/Feature-AR_Navigation-00CED1)](https://docs.polymers.io/ar)
[![ESG](https://img.shields.io/badge/Feature-ESG_Tracking-32CD32)](https://docs.polymers.io/esg)

**Polymers Protocol** is a production-ready platform integrating **blockchain**, **IoT**, and **ESG** solutions. It provides seamless wallet management, NFT Twins, payments, recycling analytics, AI assistance, and SmartBin integration.

This repository is a **monorepo** housing the **Web Dashboard**, **Mobile App**, and **Backend APIs**.

---

## Table of Contents

- [Screenshots](#screenshots)
- [Features](#features)
- [Dashboard Pages](#dashboard-pages)
- [Mobile Screens](#mobile-screens)
- [API Examples](#api-examples)
- [Helium/DePIN Integration](#heliumdepin-integration)
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
| ![Web Dashboard](https://raw.githubusercontent.com/polymers-protocol/repo/main/public/images/web-dashboard.png) | ![Mobile App](https://raw.githubusercontent.com/polymers-protocol/repo/main/public/images/mobile-app.png) | ![SmartBin Map](https://raw.githubusercontent.com/polymers-protocol/repo/main/public/images/smartbin-map.png) |
| Analytics, NFT Twins, ESG | Wallet, AI Chat, Scan-to-Pay | Real-time AR navigation |

---

## Features

<details>
<summary><strong>Wallet & Token Management 💸</strong></summary>

- Supports **Phantom**, **Solflare**, **Backpack**, **Privy**, embedded wallet, and biometric fallback  
- Manage **SOL**, **PLY**, **CARB**, **USDC** tokens  
- Staking and NFT Twin rewards  
- Automatic updates post-blockchain actions  

</details>

<details>
<summary><strong>NFT Twins 🖼️</strong></summary>

- Staking, evolution, gamification, and reward claiming  
- Rewards linked to token issuance  

</details>

<details>
<summary><strong>AI Chat 🤖</strong></summary>

- GPT-powered chat with **PLY token billing**  
- Free: 10 messages per user  
- Additional: 10 messages = 100,000 PLY  
- Saved prompts with quick-insert functionality  

</details>

<details>
<summary><strong>Payments & Token Swap 💱</strong></summary>

- Token swaps via **Jupiter** and **Raydium**  
- Payments with **SOL**, **PLY**, **CARB**, **USDC**, or **Blinks**  
- QR/NFC scan-to-pay with manual fallback  

</details>

<details>
<summary><strong>Recycling & ESG ♻️</strong></summary>

- Track recycled items, CO2 reduction, and plastic collected  
- City-level dashboards and leaderboards  

</details>

<details>
<summary><strong>Transactions 📜</strong></summary>

- Paginated, sortable transaction history  
- Wallet-specific views  

</details>

<details>
<summary><strong>SmartBins / IoT / AR 📍</strong></summary>

- Real-time maps with **AR navigation**  
- Offline caching and synchronization  
- Telemetry and device status monitoring  

</details>

<details>
<summary><strong>Offline & Fallbacks 🔌</strong></summary>

- Wallet: Embedded → Privy → Biometric  
- Map: AR → Mapbox → Static images  
- Scanning: QR/NFC → Manual input  

</details>

---

## Dashboard Pages

<details>
<summary><strong>Analytics Dashboard 📊</strong></summary>

- Real-time metrics for recycling, CO2 reduction, and token flows  
- Visualizations: Charts, graphs, and leaderboards  
- Filters for time range and wallet-specific data  

</details>

<details>
<summary><strong>NFT Twins Dashboard 🖼️</strong></summary>

- View, stake, and evolve NFT Twins  
- Track rewards and gamification progress  
- Integration with **Metaplex** for NFT management  

</details>

<details>
<summary><strong>ESG Dashboard ♻️</strong></summary>

- City-level ESG metrics (CO2, plastic collected)  
- Leaderboards for recycling contributions  
- Exportable reports for compliance  

</details>

<details>
<summary><strong>SmartBins Dashboard 📍</strong></summary>

- Real-time map of SmartBin locations  
- Telemetry data: Fill levels, device status  
- AR navigation toggle  

</details>

---

## Mobile Screens

<details>
<summary><strong>Wallet Management 💸</strong></summary>

- View balances for **SOL**, **PLY**, **CARB**, **USDC**  
- Stake NFTs and claim rewards  
- Switch between wallets (Phantom, Solflare, etc.)  

</details>

<details>
<summary><strong>AI Chat 🤖</strong></summary>

- Chat interface with GPT-powered responses  
- View message quotas and PLY billing  
- Access saved prompts  

</details>

<details>
<summary><strong>Scan-to-Pay 💳</strong></summary>

- QR/NFC scanning for payments  
- Manual input fallback  
- Supports **Solana Pay** and **Blinks**  

</details>

<details>
<summary><strong>AR SmartBin Navigation 🗺️</strong></summary>

- AR-powered navigation to nearby SmartBins  
- Fallback to **Mapbox** or static images  
- Offline caching for map data  

</details>

<details>
<summary><strong>ESG Dashboard ♻️</strong></summary>

- Mobile-optimized ESG metrics  
- Track personal recycling contributions  
- View city-level leaderboards  

</details>

---

## API Examples

Below are example API calls for the Polymers Protocol endpoints. All requests require an `Authorization: Bearer <your-token>` header for authentication. Optional query parameters and error responses are included where applicable.

<details>
<summary><strong>GET /users</strong></summary>

Retrieve a list of users or a specific user’s details.

**Request Parameters**:  
| Parameter | Type | Description | Required | Example |
|-----------|------|-------------|----------|---------|
| `wallet` | String | Filter by wallet address | Optional | `5Hb...xYz` |
| `limit` | Integer | Number of users to return | Optional | `10` |

**Request**:  
```bash
curl -X GET "https://api.polymers.io/users?wallet=5Hb...xYz&limit=10" \
-H "Authorization: Bearer <your-token>"
```

**Success Response (200)**:  
```json
{
  "users": [
    {
      "id": "user_123",
      "wallet": "5Hb...xYz",
      "email": "user@example.com",
      "createdAt": "2025-09-26T08:06:00Z",
      "role": "user"
    }
  ]
}
```

**Error Response (401)**:  
```json
{
  "error": "Unauthorized",
  "message": "Invalid or missing authorization token",
  "statusCode": 401
}
```

</details>

<details>
<summary><strong>POST /transactions</strong></summary>

Create a new transaction (e.g., token transfer or payment).

**Request Body**:  
| Field | Type | Description | Required |
|-------|------|-------------|----------|
| `wallet` | String | Sender wallet address | Yes |
| `amount` | Number | Transaction amount | Yes |
| `token` | String | Token type (SOL, PLY, CARB, USDC) | Yes |
| `recipient` | String | Recipient wallet address | Yes |

**Request**:  
```bash
curl -X POST https://api.polymers.io/transactions \
-H "Authorization: Bearer <your-token>" \
-H "Content-Type: application/json" \
-d '{"wallet":"5Hb...xYz","amount":100,"token":"PLY","recipient":"7Jk...aBc"}'
```

**Success Response (201)**:  
```json
{
  "transactionId": "txn_456",
  "status": "confirmed",
  "amount": 100,
  "token": "PLY",
  "timestamp": "2025-09-26T08:06:00Z",
  "signature": "5xY...zQw"
}
```

**Error Response (400)**:  
```json
{
  "error": "Bad Request",
  "message": "Invalid token type",
  "statusCode": 400
}
```

</details>

<details>
<summary><strong>GET /nft-twins</strong></summary>

Retrieve a user’s NFT Twins and their staking/reward status.

**Request Parameters**:  
| Parameter | Type | Description | Required | Example |
|-----------|------|-------------|----------|---------|
| `wallet` | String | Filter by owner wallet | Yes | `5Hb...xYz` |
| `staked` | Boolean | Filter by staking status | Optional | `true` |

**Request**:  
```bash
curl -X GET "https://api.polymers.io/nft-twins?wallet=5Hb...xYz&staked=true" \
-H "Authorization: Bearer <your-token>"
```

**Success Response (200)**:  
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

**Error Response (404)**:  
```json
{
  "error": "Not Found",
  "message": "No NFTs found for wallet",
  "statusCode": 404
}
```

</details>

<details>
<summary><strong>POST /payments</strong></summary>

Initiate a payment using Solana Pay or Blinks.

**Request Body**:  
| Field | Type | Description | Required |
|-------|------|-------------|----------|
| `wallet` | String | Sender wallet address | Yes |
| `amount` | Number | Payment amount | Yes |
| `token` | String | Token type (SOL, PLY, CARB, USDC) | Yes |
| `method` | String | Payment method (solana-pay, blinks) | Yes |
| `recipient` | String | Recipient wallet address | Yes |

**Request**:  
```bash
curl -X POST https://api.polymers.io/payments \
-H "Authorization: Bearer <your-token>" \
-H "Content-Type: application/json" \
-d '{"wallet":"5Hb...xYz","amount":50,"token":"USDC","method":"solana-pay","recipient":"7Jk...aBc"}'
```

**Success Response (201)**:  
```json
{
  "paymentId": "pay_123",
  "status": "pending",
  "amount": 50,
  "token": "USDC",
  "timestamp": "2025-09-26T08:06:00Z",
  "transactionSignature": "4xY...pQr"
}
```

**Error Response (500)**:  
```json
{
  "error": "Internal Server Error",
  "message": "Failed to process payment",
  "statusCode": 500
}
```

</details>

<details>
<summary><strong>GET /esg</strong></summary>

Retrieve ESG metrics for a user or city.

**Request Parameters**:  
| Parameter | Type | Description | Required | Example |
|-----------|------|-------------|----------|---------|
| `wallet` | String | Filter by user wallet | Optional | `5Hb...xYz` |
| `city` | String | Filter by city name | Optional | `NewYork` |

**Request**:  
```bash
curl -X GET "https://api.polymers.io/esg?wallet=5Hb...xYz" \
-H "Authorization: Bearer <your-token>"
```

**Success Response (200)**:  
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

**Error Response (400)**:  
```json
{
  "error": "Bad Request",
  "message": "Missing wallet or city parameter",
  "statusCode": 400
}
```

</details>

<details>
<summary><strong>GET /smartbins</strong></summary>

Fetch real-time SmartBin data, including location and telemetry.

**Request Parameters**:  
| Parameter | Type | Description | Required | Example |
|-----------|------|-------------|----------|---------|
| `city` | String | Filter by city name | Optional | `NewYork` |
| `status` | String | Filter by bin status (operational, full) | Optional | `operational` |

**Request**:  
```bash
curl -X GET "https://api.polymers.io/smartbins?city=NewYork&status=operational" \
-H "Authorization: Bearer <your-token>"
```

**Success Response (200)**:  
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
      "lastUpdated": "2025-09-26T08:06:00Z"
    }
  ]
}
```

**Error Response (404)**:  
```json
{
  "error": "Not Found",
  "message": "No SmartBins found for specified city",
  "statusCode": 404
}
```

</details>

<details>
<summary><strong>POST /ai-agents</strong></summary>

Send a message to the AI chat agent and receive a response.

**Request Body**:  
| Field | Type | Description | Required |
|-------|------|-------------|----------|
| `wallet` | String | User wallet address | Yes |
| `message` | String | User input message | Yes |

**Request**:  
```bash
curl -X POST https://api.polymers.io/ai-agents \
-H "Authorization: Bearer <your-token>" \
-H "Content-Type: application/json" \
-d '{"wallet":"5Hb...xYz","message":"What is my recycling impact?"}'
```

**Success Response (201)**:  
```json
{
  "messageId": "msg_789",
  "response": "You’ve recycled 25.5kg of plastic, reducing CO2 by 10.2kg!",
  "remainingMessages": 8,
  "timestamp": "2025-09-26T08:06:00Z"
}
```

**Error Response (429)**:  
```json
{
  "error": "Too Many Requests",
  "message": "Message quota exceeded. Purchase more with PLY tokens.",
  "statusCode": 429
}
```

</details>

<details>
<summary><strong>POST /donations</strong></summary>

Create a donation transaction for ESG initiatives.

**Request Body**:  
| Field | Type | Description | Required |
|-------|------|-------------|----------|
| `wallet` | String | Donor wallet address | Yes |
| `amount` | Number | Donation amount | Yes |
| `token` | String | Token type (SOL, PLY, CARB, USDC) | Yes |
| `cause` | String | Donation cause (e.g., ocean_cleanup) | Yes |

**Request**:  
```bash
curl -X POST https://api.polymers.io/donations \
-H "Authorization: Bearer <your-token>" \
-H "Content-Type: application/json" \
-d '{"wallet":"5Hb...xYz","amount":200,"token":"CARB","cause":"ocean_cleanup"}'
```

**Success Response (201)**:  
```json
{
  "donationId": "don_101",
  "status": "confirmed",
  "amount": 200,
  "token": "CARB",
  "cause": "ocean_cleanup",
  "timestamp": "2025-09-26T08:06:00Z"
}
```

**Error Response (400)**:  
```json
{
  "error": "Bad Request",
  "message": "Invalid cause specified",
  "statusCode": 400
}
```

</details>

<details>
<summary><strong>GET /recycling</strong></summary>

Retrieve recycling history for a user.

**Request Parameters**:  
| Parameter | Type | Description | Required | Example |
|-----------|------|-------------|----------|---------|
| `wallet` | String | Filter by user wallet | Yes | `5Hb...xYz` |
| `startDate` | String | Filter by start date (ISO) | Optional | `2025-09-01` |

**Request**:  
```bash
curl -X GET "https://api.polymers.io/recycling?wallet=5Hb...xYz&startDate=2025-09-01" \
-H "Authorization: Bearer <your-token>"
```

**Success Response (200)**:  
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

**Error Response (404)**:  
```json
{
  "error": "Not Found",
  "message": "No recycling records found for wallet",
  "statusCode": 404
}
```

</details>

<details>
<summary><strong>POST /swap</strong></summary>

Perform a token swap via Jupiter or Raydium.

**Request Body**:  
| Field | Type | Description | Required |
|-------|------|-------------|----------|
| `wallet` | String | User wallet address | Yes |
| `fromToken` | String | Source token (SOL, PLY, CARB, USDC) | Yes |
| `toToken` | String | Target token (SOL, PLY, CARB, USDC) | Yes |
| `amount` | Number | Amount to swap | Yes |

**Request**:  
```bash
curl -X POST https://api.polymers.io/swap \
-H "Authorization: Bearer <your-token>" \
-H "Content-Type: application/json" \
-d '{"wallet":"5Hb...xYz","fromToken":"SOL","toToken":"PLY","amount":1.5}'
```

**Success Response (201)**:  
```json
{
  "swapId": "swp_303",
  "status": "completed",
  "fromAmount": 1.5,
  "toAmount": 150000,
  "fromToken": "SOL",
  "toToken": "PLY",
  "timestamp": "2025-09-26T08:06:00Z"
}
```

**Error Response (400)**:  
```json
{
  "error": "Bad Request",
  "message": "Insufficient balance for swap",
  "statusCode": 400
}
```

</details>

<details>
<summary><strong>PUT /settings</strong></summary>

Update user settings (e.g., wallet preferences, notifications).

**Request Body**:  
| Field | Type | Description | Required |
|-------|------|-------------|----------|
| `wallet` | String | User wallet address | Yes |
| `defaultWallet` | String | Preferred wallet (Phantom, Solflare, etc.) | Optional |
| `notifications` | Object | Notification preferences | Optional |

**Request**:  
```bash
curl -X PUT https://api.polymers.io/settings \
-H "Authorization: Bearer <your-token>" \
-H "Content-Type: application/json" \
-d '{"wallet":"5Hb...xYz","defaultWallet":"Phantom","notifications":{"email":true}}'
```

**Success Response (200)**:  
```json
{
  "userId": "user_123",
  "settings": {
    "defaultWallet": "Phantom",
    "notifications": {
      "email": true
    }
  },
  "updatedAt": "2025-09-26T08:06:00Z"
}
```

**Error Response (400)**:  
```json
{
  "error": "Bad Request",
  "message": "Invalid wallet address",
  "statusCode": 400
}
```

</details>

<details>
<summary><strong>GET /messages</strong></summary>

Retrieve a user’s AI chat message history.

**Request Parameters**:  
| Parameter | Type | Description | Required | Example |
|-----------|------|-------------|----------|---------|
| `wallet` | String | Filter by user wallet | Yes | `5Hb...xYz` |
| `limit` | Integer | Number of messages to return | Optional | `20` |

**Request**:  
```bash
curl -X GET "https://api.polymers.io/messages?wallet=5Hb...xYz&limit=20" \
-H "Authorization: Bearer <your-token>"
```

**Success Response (200)**:  
```json
{
  "messages": [
    {
      "id": "msg_789",
      "wallet": "5Hb...xYz",
      "prompt": "What is my recycling impact?",
      "response": "You’ve recycled 25.5kg of plastic, reducing CO2 by 10.2kg!",
      "timestamp": "2025-09-26T08:06:00Z"
    }
  ]
}
```

**Error Response (404)**:  
```json
{
  "error": "Not Found",
  "message": "No messages found for wallet",
  "statusCode": 404
}
```

</details>

---

## Helium/DePIN Integration 📡

The Polymers Protocol leverages **Helium's DePIN** for low-cost, decentralized IoT connectivity, particularly for **SmartBin telemetry** and **AR navigation**. Helium's LoRaWAN network and Solana integration enable scalable, real-time data ingestion and rewards in HNT tokens.

### Key Features
- **LoRaWAN Telemetry**: SmartBins transmit fill levels and status via Helium's low-power network, reducing costs by 90% compared to cellular.
- **AR Navigation**: Helium coverage maps enhance Hivemapper's real-time imagery for precise AR overlays.
- **HNT Rewards**: Users earn HNT for deploying hotspots near bins, integrated with NFT Twin staking.

### Code Snippets
1. **Ingest SmartBin Telemetry** (Backend `/api/smartbins`):
   ```javascript
   import { Helium } from '@helium/sdk';
   import { Connection } from '@solana/web3.js';

   const helium = new Helium({ rpc: 'https://api.mainnet-beta.solana.com' });
   const connection = new Connection('https://api.mainnet-beta.solana.com');

   async function ingestBinTelemetry(binId, fillLevel) {
     const payload = { binId, fillLevel, timestamp: new Date().toISOString() };
     const oracleTx = await helium.oracles.submitData(payload);
     const sig = await connection.sendTransaction(oracleTx);
     // Save to Supabase
     await supabase.from('SmartBins').upsert({ id: binId, fillLevel });
     return sig;
   }
   ```

2. **AR Navigation with Helium Coverage** (Mobile App):
   ```javascript
   import { Helium } from '@helium/sdk';
   import MapboxGL from '@react-native-mapbox-gl/maps';

   const helium = new Helium({ rpc: 'https://api.mainnet-beta.solana.com' });

   async function renderARMap(lat, lng) {
     const coverage = await helium.hotspots.getCoverage(lat, lng);
     if (coverage.available) {
       // Use Hivemapper tiles for AR overlay
       const tiles = await fetchHivemapperTiles(lat, lng, 18);
       // Render AR with Mapbox
       return <MapboxGL.MapView tiles={tiles} />;
     }
     // Fallback to static Mapbox images
     return <MapboxGL.MapView tiles="static" />;
   }
   ```

3. **HNT Rewards for Hotspot Deployment**:
   ```javascript
   import { Helium } from '@helium/sdk';
   import { PublicKey } from '@solana/web3.js';

   async function claimHNTRewards(wallet) {
     const hotspotKey = new PublicKey('hotspot-pubkey');
     const rewardTx = await helium.hotspots.claimRewards(hotspotKey, wallet);
     const sig = await connection.sendTransaction(rewardTx);
     return sig; // HNT credited to wallet
   }
   ```

For more, see [Helium Developer Portal](https://docs.helium.com/).

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
HIVEMAPPER_API_KEY=<your-hivemapper-api-key>
```

---

## Installation

<details>
<summary><strong>Web Dashboard 🖥️</strong></summary>

```bash
cd apps/web
npm install
npm run dev
```

</details>

<details>
<summary><strong>Mobile App 📱</strong></summary>

```bash
cd apps/mobile
npm install
expo start
```

</details>

<details>
<summary><strong>Backend API ⚙️</strong></summary>

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

- **Solana**: Blinks, NFT Twins (Metaplex), Dialect, Pyth, Jupiter, Raydium, Solana Pay, Helius, Embedded Wallets  
- **Helium/DePIN**: LoRaWAN for SmartBin telemetry, coverage maps for AR navigation, HNT rewards for hotspot deployment, integrated via Solana for low-cost transactions  
- **Hivemapper**: Real-time street imagery for AR SmartBin navigation, providing sub-meter precision and daily updates  
- **SUI**: CARB token, NFT Twins, PoT, staking  
- **Payments & Swap**: SOL, PLY, CARB, USDC, HNT via Jupiter/Raydium  
- **Maps & AR**: Mapbox + Hivemapper + AR Wayfinder + static image fallback  

---

## Backend API & MCP

- **Framework**: Fastify with MCP actions  
- **Endpoints**: `/users`, `/transactions`, `/nft-twins`, `/payments`, `/esg`, `/smartbins`, `/ai-agents`, `/donations`, `/recycling`, `/swap`, `/settings`, `/messages`  
- **MCP Actions**: Staking, NFT Twin evolution, reward claims, token swaps, ESG updates  
- **Telemetry**: IoT/SmartBin device data ingestion via Helium LoRaWAN  

---

## Contributing

- Use **TypeScript** and adhere to the monorepo structure  
- Route blockchain operations through **MCP actions**  
- Implement fallbacks for wallets, maps, scanning, and offline scenarios  
- Maintain offline caching for IoT/SmartBin telemetry  

---

## Swagger API

- Full documentation: [View Swagger Docs](https://api.polymers.io/swagger)  
- Endpoints: `/users`, `/transactions`, `/nft-twins`, `/payments`, `/esg`, `/smartbins`, `/ai-agents`, `/donations`, `/swap`, `/messages`  

---

## License

[MIT License](https://opensource.org/licenses/MIT)
