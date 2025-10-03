# Oracle Integrations

This document outlines the **oracle integration layer** for the Polymers Protocol, providing **real-time ESG metrics and token prices** that drive **token flows, NFT twin minting, and compliance dashboards**.

---

## 🌐 Overview

**Purpose:**  
Ensure that ESG-based rewards and token flows are accurate, real-time, and auditable.

| Oracle / Source       | Purpose                                      | Protocol / Tech       | Notes |
|-----------------------|----------------------------------------------|---------------------|-------|
| **Pyth Network**       | Real-time CO₂e, energy, water metrics       | Solana-native        | Low-latency subscription feed for ESG metrics |
| **Chainlink**          | Token price feeds for multi-token rewards  | Cross-chain          | Redundant and fallback price feed |
| **Internal Emission DB** | Verified emission factors for unsupported materials | Supabase             | Ensures coverage when oracle data is unavailable |

**Data Flow:**

SmartBin Sensors → Supabase Realtime DB → Oracle Layer → Token Flow Engine → NFT Twins / Dashboards / Compliance

---

## 🛠 Architecture

```mermaid
graph TD
    A[Supabase Realtime DB] --> B[Oracle Layer]
    B --> C[Pyth Network Feed<br>CO₂e, Energy, Water]
    B --> D[Chainlink Price Feed<br>PLY, CARB, EWASTE, HONEY, HNT]
    B --> E[Internal Emission DB]
    C --> F[Token Flow Engine<br>Multi-Token Issuance]
    D --> F
    E --> F
    F --> G[NFT Twin Minting / Dashboards]
    F --> H[Compliance Dashboard<br>Audit Logs & ESG KPIs]

Key Points:
	•	Oracle layer aggregates, validates, and normalizes all data before feeding token flows.
	•	Supports real-time updates to dashboards and NFT evolution.
	•	Fallbacks ensure continuity when a primary oracle is unavailable.

⸻

💻 Implementation

1. Pyth Integration

File: /lib/oracles/pyth.ts

import { PythConnection } from '@pythnetwork/client';
import { Connection, PublicKey } from '@solana/web3.js';

const SOLANA_RPC = process.env.NEXT_PUBLIC_SOLANA_RPC_URL!;
const connection = new Connection(SOLANA_RPC);

const pythProgramKey = new PublicKey('YourPythProgramID');

export async function fetchPythFeed(feedId: string) {
  const pyth = new PythConnection(connection, pythProgramKey);
  await pyth.updateFeeds([feedId]);
  const price = pyth.getPrice(feedId);
  return price;
}

	•	Fetches real-time CO₂e, energy, and water metrics.
	•	Updates Supabase esg_metrics table for dashboards, token issuance, and NFT triggers.

⸻

2. Chainlink Integration

File: /lib/oracles/chainlink.ts

import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_SOLANA_RPC_URL);

export async function fetchTokenPrice(aggregatorAddress: string) {
  const aggregator = new ethers.Contract(
    aggregatorAddress,
    [
      "function latestAnswer() view returns (int256)",
      "function decimals() view returns (uint8)"
    ],
    provider
  );
  const price = await aggregator.latestAnswer();
  const decimals = await aggregator.decimals();
  return Number(price) / Math.pow(10, decimals);
}

	•	Retrieves token prices for PLY, CARB, EWASTE, HONEY, HNT.
	•	Normalized values feed the Token Flow Engine and dashboards.

⸻

3. Internal Emission DB
	•	Table: internal_emission_factors (Supabase)
	•	Fields: material, co2e_kg_per_unit, energy_kWh, water_liters
	•	Acts as a fallback when Pyth or Chainlink data is unavailable.

⸻

⚡ Token Flow Engine Usage

import { fetchPythFeed } from './pyth';
import { fetchTokenPrice } from './chainlink';
import supabase from '../supabaseClient';

export async function calculateReward(material: string, quantity: number) {
  let co2eFeed;
  try {
    co2eFeed = await fetchPythFeed(material);
  } catch {
    // fallback to internal DB
    const { data } = await supabase
      .from('internal_emission_factors')
      .select('co2e_kg_per_unit')
      .eq('material', material)
      .single();
    co2eFeed = data?.co2e_kg_per_unit ?? 0;
  }

  const tokenPrice = await fetchTokenPrice('0xAggregatorAddress');
  const rewardAmount = quantity * co2eFeed * tokenPrice;

  await supabase.from('token_flows').insert({ material, rewardAmount });
  return rewardAmount;
}

	•	Calculates ESG-based rewards per material deposited.
	•	Updates NFT Twin minting, dashboards, and compliance metrics in real-time.

⸻

📝 Best Practices
	•	Failover Strategy: Always include internal DB fallback for continuity.
	•	Normalization: Ensure CO₂e, energy, and water metrics use consistent units.
	•	Subscriptions vs Polling: Use Pyth subscriptions for low latency; Chainlink may require polling.
	•	Security: Validate oracle signatures where possible to prevent spoofing.

⸻

🔗 References
	•	Pyth Network Docs
	•	Chainlink Docs
	•	Supabase Realtime
	•	Solana Web3.js
