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

