# Helium DePIN Integration with Polymers Protocol

This guide provides a comprehensive walkthrough for integrating **Helium's Decentralized Physical Infrastructure Network (DePIN)** with the **Polymers Protocol** on Solana, enhanced by **Hivemapper's Map Data APIs** for geospatial validation. The integration enables scalable, low-cost, and incentivized SmartBin functionality, leveraging Helium’s LoRaWAN for IoT connectivity, Solana’s blockchain for transactions, Supabase for telemetry storage, and Hivemapper for location accuracy.

## Table of Contents
1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Wallet and Environment Setup](#wallet-and-environment-setup)
4. [Helium Program Library (HPL) Installation](#helium-program-library-installation)
5. [SmartBin Hardware Setup](#smartbin-hardware-setup)
6. [Telemetry Transmission](#telemetry-transmission)
7. [Hivemapper API Integration](#hivemapper-api-integration)
8. [Rewards Integration](#rewards-integration)
9. [Predictive Analytics](#predictive-analytics)
10. [OTA Firmware Management](#ota-firmware-management)
11. [Devnet Testing](#devnet-testing)
12. [Local Simulation and Testing](#local-simulation-and-testing)
13. [Troubleshooting and Best Practices](#troubleshooting-and-best-practices)
14. [Resources](#resources)

---

## Introduction

The integration combines **Helium’s DePIN**, **Polymers Protocol**, and **Hivemapper APIs** to create a decentralized SmartBin network for waste tracking, user rewards, and ESG analytics. Key features include:

- **Scalability**: Solana’s 65,000+ TPS (with Firedancer) supports millions of transactions.
- **Low Costs**: ~$0.000005 per transaction for micropayments (Data Credits, HNT/IOT, PLY/CARB/EWASTE, HONEY).
- **Long-Range IoT**: Helium’s LoRaWAN enables connectivity up to 10km.
- **Geospatial Validation**: Hivemapper’s real-time map data ensures accurate bin locations.
- **Composability**: Integrates with Solana Pay, Metaplex (NFT Twins), Pyth oracles, and Hivemapper APIs.
- **Rewards Synergy**: Combines HNT/IOT, PLY/CARB/EWASTE, and HONEY tokens for gamified incentives.

### SmartBin Flow
```mermaid
graph TD
    A[SmartBin Sensors] --> B[Helium LoRaWAN]
    B --> C[Telemetry API / Supabase]
    C --> D[Hivemapper API Validation]
    D --> E[Solana Blockchain]
    E --> F[Reward Calculation (HNT, HONEY, PLY)]
    F --> G[Wallet Updates & NFT Twins]
    G --> H[Dashboard & Mobile App]
    C --> H[Analytics & LSTM Predictions]
    D --> H[Map Features]
```

**Key Files**:
- `/lib/helium.ts`: Configures LoRaWAN routing.
- `/lib/hivemapper.ts`: Handles Hivemapper API calls.
- `/api/iot/smartbins.ts`: Ingests telemetry with Hivemapper validation.
- `/api/wallet/swap.ts`: Manages reward distribution.
- `/programs/src/nft_mint.ts`: Mints SmartBin NFT Twins.
- `/lib/lstm_model.ts`: Runs predictive analytics.
- `/scripts/ota_utils.ts`: Manages OTA firmware updates.
- `/scripts/sample_data/sample_telemetry.json`: Sample dataset for testing.
- `/scripts/simulate_iot.ts`, `/scripts/simulate_rewards.ts`, `/scripts/test_lstm.ts`: Simulation scripts.

---

## Prerequisites

### Software
- **Node.js**: v18+.
- **Solana CLI**: v1.18+ (`npm install -g @solana/cli`).
- **Helium CLI**: v2.0+ (`npm install -g @helium/cli`).
- **Anchor CLI**: v0.30+ for Solana programs.
- **Phantom Wallet**: v25.9.x+ for wallet management.
- **Supabase CLI**: For telemetry database.
- **Axios**: For Hivemapper API calls (`npm install axios`).
- **TypeScript**: For scripts and APIs.

### Hardware
- **LoRaWAN Devices**: RAK Wireless or Dragino modules with GPS.
- **Firmware**: LoRaWAN 1.0.3 compliant with OTA support.

### Accounts
- **Supabase**: For telemetry storage.
- **Helium**: For hotspot onboarding and rewards.
- **Hivemapper**: Sign up at [hivemapper.com](https://hivemapper.com/) for API keys via [Map Data Console](https://hivemapper.com/map-data-console).
- **Solana Devnet**: For testing.

---

## Wallet and Environment Setup

### Step 1: Wallet Setup
1. **Create Solana Wallet**:
   - Install Phantom Wallet and create a wallet.
   - Back up the seed phrase securely.
2. **Export Helium Wallet**:
   ```bash
   helium wallet export --key-type solana > solana_wallet.json
   ```
   > **Note**: Update `@helium/sdk` if export fails (`npm install @helium/sdk@latest`).
3. **Import into Phantom**:
   - Import `solana_wallet.json` and verify HNT/IOT balances.
4. **Create Associated Token Accounts (ATAs)**:
   ```typescript
   import { Connection, Keypair, PublicKey } from '@solana/web3.js';
   import { getOrCreateAssociatedTokenAccount } from '@solana/spl-token';

   const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL);
   const payer = Keypair.fromSecretKey(Uint8Array.from([...]));
   const mints = [
     process.env.PLY_MINT,
     process.env.CARB_MINT,
     process.env.EWASTE_MINT,
     process.env.HONEY_MINT,
   ];

   for (const mint of mints) {
     const ata = await getOrCreateAssociatedTokenAccount(
       connection,
       payer,
       new PublicKey(mint),
       payer.publicKey
     );
     console.log(`ATA for ${mint}: ${ata.address}`);
   }
   ```

### Step 2: Environment Configuration
Create `.env`:
```env
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
HELIUM_HOTSPOT_ADDRESS=<your_hotspot_address>
PLY_MINT=<ply_mint_address>
CARB_MINT=<carb_mint_address>
EWASTE_MINT=<ewaste_mint_address>
HONEY_MINT=<honey_mint_address>
REWARD_WALLET_ADDRESS=<reward_wallet_address>
NEXT_PUBLIC_SUPABASE_URL=<supabase_url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<supabase_anon_key>
HIVEMAPPER_API_KEY=<your_api_key>
HIVEMAPPER_USERNAME=<your_username>
```

**Security**:
- Add `.env` to `.gitignore`:
  ```bash
  echo ".env" >> .gitignore
  ```
- Use a secrets manager (e.g., Doppler) for production.

---

## Helium Program Library (HPL) Installation

### Steps
1. **Clone HPL**:
   ```bash
   git clone https://github.com/helium/helium-program-library
   cd helium-program-library
   ```
2. **Build and Test**:
   ```bash
   anchor build
   anchor test
   ```
3. **Deploy to Devnet**:
   ```bash
   anchor deploy --provider.cluster devnet
   ```

**Key Programs**:
- **Hotspot Manager**: Mints NFTs for SmartBins.
- **SubDAOs**: Distributes IOT/HNT rewards.
- **Lazy Distributor**: Triggers oracle-based rewards.

**Production Note**: Requires Helium governance approval ([docs.helium.com/solana](https://docs.helium.com/solana)).

---

## SmartBin Hardware Setup

### Steps
1. **Select Hardware**:
   - Use RAK Wireless or Dragino LoRaWAN modules with GPS.
   - Ensure firmware supports LoRaWAN 1.0.3 and OTA updates.
2. **Onboard SmartBin**:
   - Register via Helium Hotspot App.
   - Verify at [api.helium.com/v1/hotspots](https://api.helium.com/v1/hotspots).
3. **Mint SmartBin NFT**:
   - Cost: ~0.002 SOL.
   - File: `/programs/src/nft_mint.ts`
     ```typescript
     import { Metaplex } from '@metaplex-foundation/js';
     import { Connection, PublicKey } from '@solana/web3.js';

     const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL);
     const metaplex = Metaplex.make(connection);
     const nftMetadata = {
       name: `SmartBin_${binId}`,
       symbol: 'SBIN',
       uri: `https://metadata.polymers.io/bins/${binId}`,
       attributes: [{ trait_type: 'Coverage', value: '10km' }],
     };
     const { nft } = await metaplex.nfts().create({
       uri: JSON.stringify(nftMetadata),
       owner: new PublicKey(process.env.REWARD_WALLET_ADDRESS),
     });
     console.log(`Minted NFT: ${nft.address}`);
     ```
4. **Configure LoRaWAN**:
   - File: `/lib/helium.ts`
     ```typescript
     import { Helium, Wallet } from '@helium/sdk';
     import { Connection, PublicKey } from '@solana/web3.js';

     const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL);
     const wallet = new Wallet(new PublicKey(process.env.REWARD_WALLET_ADDRESS));
     const helium = new Helium(connection, wallet);

     export async function configureHotspot() {
       const isValid = await helium.hotspots.isValid(process.env.HELIUM_HOTSPOT_ADDRESS);
       if (!isValid) throw new Error('Invalid hotspot address');
       await helium.hotspots.configure({
         hotspot: new PublicKey(process.env.HELIUM_HOTSPOT_ADDRESS),
       });
     }
     ```

**Best Practices**:
- Test OTA updates in a sandbox.
- Monitor NFT minting costs.

---

## Telemetry Transmission

SmartBins transmit telemetry via Helium’s LoRaWAN, validated by Hivemapper, and stored in Supabase and Solana.

### Implementation
File: `/api/iot/smartbins.ts`
```typescript
import { Helium, Wallet } from '@helium/sdk';
import { Connection, PublicKey } from '@solana/web3.js';
import { createClient } from '@supabase/supabase-js';
import { hivemapperClient, validateDeviceUpdate } from '../lib/hivemapper';

const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL);
const wallet = new Wallet(new PublicKey(process.env.REWARD_WALLET_ADDRESS));
const helium = new Helium(connection, wallet);
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

function validateTelemetry(telemetry: any) {
  if (
    !Number.isFinite(telemetry.fill) ||
    !Number.isFinite(telemetry.weight) ||
    !Number.isFinite(telemetry.temp) ||
    !Number.isFinite(telemetry.contamination)
  ) {
    throw new Error('Invalid telemetry data');
  }
}

export async function sendSmartBinTelemetry(binId: string, telemetry: any, deviceId: string, lat: number, lon: number) {
  try {
    validateTelemetry(telemetry);
    const payloadSize = Buffer.from(JSON.stringify({ binId, ...telemetry })).length;
    if (payloadSize > 24000) throw new Error('Payload exceeds 24KB');

    // Hivemapper validation
    const coverageRes = await hivemapperClient.get('/coverage', { params: { lat, lon } });
    if (coverageRes.data.coverage < 0.8) {
      console.warn(`Low Hivemapper coverage for ${binId}: ${coverageRes.data.coverage}`);
      await supabase.from('validation_logs').insert({ binId, status: 'low_coverage' });
    }
    const isUpdated = await validateDeviceUpdate(deviceId);
    if (!isUpdated) {
      console.warn(`Hivemapper device update stale for ${binId}`);
      await supabase.from('validation_logs').insert({ binId, status: 'stale_update' });
    }

    const submitTx = await helium.hotspots.submitPayload({
      payload: Buffer.from(JSON.stringify({ binId, ...telemetry, lat, lon })),
      hotspot: new PublicKey(process.env.HELIUM_HOTSPOT_ADDRESS),
    });
    const sig = await connection.sendTransaction(submitTx, [wallet.payer], { maxRetries: 3 });
    const { error } = await supabase.from('telemetry').insert({ binId, ...telemetry, lat, lon, tx: sig });
    if (error) throw new Error(`Supabase insert failed: ${error.message}`);
    return sig;
  } catch (e) {
    console.error(`Telemetry error for ${binId}: ${e.message}`);
    throw e;
  }
}
```

### Batch Telemetry
```typescript
export async function sendBatchTelemetry(bins: { binId: string; telemetry: any; deviceId: string; lat: number; lon: number }[]) {
  try {
    const payloads = bins.map(({ binId, telemetry, lat, lon }) => ({
      binId,
      payload: Buffer.from(JSON.stringify({ binId, ...telemetry, lat, lon })),
    }));
    const batchTx = await helium.hotspots.submitBatchPayload(payloads);
    const sig = await connection.sendTransaction(batchTx, [wallet.payer], { maxRetries: 3 });
    const { error } = await supabase.from('telemetry').insert(
      bins.map(({ binId, telemetry, lat, lon }) => ({ binId, ...telemetry, lat, lon, tx: sig }))
    );
    if (error) throw new Error(`Supabase batch insert failed: ${error.message}`);
    return sig;
  } catch (e) {
    console.error(`Batch telemetry error: ${e.message}`);
    throw e;
  }
}
```

**Best Practices**:
- Cache Hivemapper coverage results in Supabase (expire after 1 hour).
- Monitor Data Credits (~$0.00001 per 24KB).

---

## Hivemapper API Integration

Hivemapper’s Bee Maps APIs provide geospatial validation and map features for SmartBins.

### Setup
File: `/lib/hivemapper.ts`
```typescript
import axios from 'axios';

const API_BASE = 'https://bee.hivemapper.com/v1';
const auth = Buffer.from(`${process.env.HIVEMAPPER_USERNAME}:${process.env.HIVEMAPPER_API_KEY}`).toString('base64');

export const hivemapperClient = axios.create({
  baseURL: API_BASE,
  headers: { Authorization: `Basic ${auth}` },
  timeout: 10000,
});

export async function validateDeviceUpdate(deviceId: string, expectedUpdateTime: number = 3600000) {
  try {
    const { data } = await hivemapperClient.get(`/devices/${deviceId}`);
    const lastUpdate = new Date(data.lastUpdate).getTime();
    return lastUpdate > Date.now() - expectedUpdateTime;
  } catch (error) {
    if (error.response?.status === 429) throw new Error('Rate limit exceeded');
    if (error.response?.status === 401) throw new Error('Invalid API credentials');
    throw new Error(`Hivemapper API error: ${error.message}`);
  }
}
```

**Endpoints**:
- `/v1/devices/{deviceId}`: Device status and last update.
- `/v1/coverage`: Check mapping coverage.
- `/v1/map-features/{country}/{week}`: Geospatial features (e.g., speed limits).

---

## Rewards Integration

Combines HNT/IOT, PLY/CARB/EWASTE, and HONEY rewards.

### Implementation
File: `/api/wallet/swap.ts`
```typescript
import { Helium, Wallet } from '@helium/sdk';
import { Connection, PublicKey } from '@solana/web3.js';
import { solanaPay } from '@solana/pay';
import { PythClient } from '@pythnetwork/client';
import { createClient } from '@supabase/supabase-js';
import { hivemapperClient } from '../lib/hivemapper';

const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL);
const wallet = new Wallet(new PublicKey(process.env.REWARD_WALLET_ADDRESS));
const helium = new Helium(connection, wallet);
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function getEsgScore(binId: string) {
  const pyth = new PythClient(connection);
  const esgPrice = await pyth.getPrice('ESG/USD');
  return esgPrice.price;
}

export async function issueRewards(binId: string, userWallet: string, deviceId: string, lat: number, lon: number) {
  try {
    const esgScore = await getEsgScore(binId);
    if (esgScore < 0.5) return;
    const cached = await supabase.from('rewards_cache').select().eq('binId', binId);
    if (cached.data?.length) return;

    // Hivemapper coverage score
    const coverageRes = await hivemapperClient.get('/coverage', { params: { lat, lon } });
    const hivemapperScore = coverageRes.data.coverage;

    // Helium rewards
    const rewardTx = await helium.rewards.distribute({
      hotspot: new PublicKey(process.env.HELIUM_HOTSPOT_ADDRESS),
      amount: { iot: 0.01, hnt: 0.001 },
      recipient: new PublicKey(userWallet),
    });
    await connection.sendTransaction(rewardTx, [wallet.payer], { maxRetries: 3 });

    // PLY rewards
    const plyTx = await solanaPay.transfer({
      mint: new PublicKey(process.env.PLY_MINT),
      amount: 10,
      recipient: new PublicKey(userWallet),
    });
    await connection.sendTransaction(plyTx, [wallet.payer], { maxRetries: 3 });

    // HONEY rewards
    if (hivemapperScore > 0.8) {
      const honeyTx = await solanaPay.transfer({
        mint: new PublicKey(process.env.HONEY_MINT),
        amount: 5,
        recipient: new PublicKey(userWallet),
      });
      await connection.sendTransaction(honeyTx, [wallet.payer]);
    }

    await supabase.from('rewards_cache').insert({ binId, rewardedAt: new Date() });
  } catch (e) {
    console.error(`Reward error for ${binId}: ${e.message}`);
    throw e;
  }
}
```

**Best Practices**:
- Cache rewards to avoid duplicates.
- Log transactions in Supabase for audits.

---

## Predictive Analytics

Enhance LSTM predictions with Hivemapper map features.

### Implementation
File: `/lib/lstm_model.ts`
```typescript
import { createClient } from '@supabase/supabase-js';
import { hivemapperClient } from '../lib/hivemapper';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

function preprocessData(data: any[], features: any) {
  return data.map(d => ({
    fill: d.fill / 100,
    contamination: d.contamination,
    weight: d.weight / 50,
    temp: (d.temp - 10) / 30,
    speedLimit: features.speedLimit ? features.speedLimit / 100 : 0,
    trafficLights: features.trafficLights || 0,
  }));
}

async function lstmPredict(preprocessed: any[]) {
  const response = await fetch('https://ml-service/predict', {
    method: 'POST',
    body: JSON.stringify(preprocessed),
  });
  return response.json();
}

export async function predictFillLevel(binId: string, lat: number, lon: number) {
  try {
    const { data, error } = await supabase
      .from('telemetry')
      .select('fill, contamination, weight, temp')
      .eq('binId', binId)
      .limit(100);
    if (error) throw new Error(`Supabase query failed: ${error.message}`);
    if (!data.length) throw new Error(`No telemetry data for ${binId}`);

    const featuresRes = await hivemapperClient.get('/map-features/US/current', { params: { lat, lon, radius: 0.1 } });
    const features = featuresRes.data.features;

    const preprocessed = preprocessData(data, features);
    const prediction = await lstmPredict(preprocessed);
    await supabase.from('predictions').insert({ binId, prediction, features });
    return prediction;
  } catch (e) {
    console.error(`Prediction error: ${e.message}`);
    throw e;
  }
}
```

### Dashboard
File: `/components/dashboards/analytics_dashboard.tsx`
```typescript
import { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export function AnalyticsDashboard({ binId }: { binId: string }) {
  useEffect(() => {
    const channel = supabase
      .channel('telemetry_updates')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'telemetry', filter: `binId=eq.${binId}` }, (payload) => {
        updateDashboard(payload.new);
      })
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [binId]);
}
```

**Best Practices**:
- Offload LSTM to AWS SageMaker for scalability.
- Cache Hivemapper features in Supabase.

---

## OTA Firmware Management

### Workflow
```mermaid
graph LR
    A[Firmware Release Trigger] --> B[Deploy to Stage Bins]
    B --> C[Helium Telemetry OK?]
    C -- Yes --> D[Hivemapper Update?]
    D -- Yes --> E[Deploy to Remaining Bins]
    D -- No --> F[Log Warning & Proceed?]
    E --> G[Full Deployment Complete]
    F --> G
    C -- No --> H[Rollback Stage Bins]
    H --> G
    D --> I[Check /devices/{id} API]
```

### Implementation
File: `/scripts/ota_utils.ts`
```typescript
import { sendOTAUpdate, rollbackFirmware } from '@polymers/iot-utils';
import { createClient } from '@supabase/supabase-js';
import { validateDeviceUpdate } from '../lib/hivemapper';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function validateTelemetryPostUpdate(binId: string) {
  const { data } = await supabase.from('telemetry').select('fill, weight').eq('binId', binId).limit(1);
  return data && data[0].fill >= 0 && data[0].weight >= 0;
}

export async function deployFirmware(binIds: string[], firmwareFile: string) {
  try {
    const stageBins = binIds.slice(0, Math.floor(binIds.length / 2));
    for (const bin of stageBins) {
      const result = await sendOTAUpdate(bin, firmwareFile);
      if (result.success) {
        await new Promise(resolve => setTimeout(resolve, 300000));
        const telemetryOk = await validateTelemetryPostUpdate(bin);
        const hivemapperOk = await validateDeviceUpdate(`hm_${bin}`);
        if (!telemetryOk || !hivemapperOk) {
          console.warn(`Validation failed for ${bin}, rolling back`);
          await rollbackFirmware(bin);
          await supabase.from('ota_logs').insert({ binId: bin, firmwareFile, status: 'failed' });
        } else {
          await supabase.from('ota_logs').insert({ binId: bin, firmwareFile, status: 'success' });
        }
      } else {
        await rollbackFirmware(bin);
      }
    }
    const remainingBins = binIds.slice(stageBins.length);
    for (const bin of remainingBins) {
      await sendOTAUpdate(bin, firmwareFile);
    }
    console.log('OTA deployment complete');
  } catch (e) {
    console.error(`OTA deployment error: ${e.message}`);
    throw e;
  }
}
```

**Best Practices**:
- Test OTA in a sandbox.
- Log events to Supabase.

---

## Devnet Testing

### Environment
File: `.env.dev`
```env
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
PLY_MINT=<dev_ply_mint>
CARB_MINT=<dev_carb_mint>
EWASTE_MINT=<dev_ewaste_mint>
HONEY_MINT=<dev_honey_mint>
REWARD_WALLET_ADDRESS=<dev_wallet>
HELIUM_HOTSPOT_ADDRESS=<dev_hotspot>
NEXT_PUBLIC_SUPABASE_URL=<supabase_url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<supabase_anon_key>
HIVEMAPPER_API_KEY=<dev_api_key>
HIVEMAPPER_USERNAME=<dev_username>
```

### Testing Commands
Update `package.json`:
```json
{
  "scripts": {
    "simulate:iot": "ts-node scripts/simulate_iot.ts",
    "simulate:rewards": "ts-node scripts/simulate_rewards.ts",
    "simulate:hivemapper": "ts-node scripts/simulate_hivemapper.ts",
    "test:lstm": "ts-node scripts/test_lstm.ts",
    "ota:deploy": "ts-node scripts/ota_utils.ts deploy",
    "ota:rollback": "ts-node scripts/ota_utils.ts rollback"
  }
}
```

**Best Practices**:
- Use [Helius.dev](https://helius.dev) for stable RPC.
- Run local validator: `solana-test-validator --rpc-port 8899`.

---

## Local Simulation and Testing

Test telemetry, rewards, and analytics without physical SmartBins or hotspots.

### Sample Dataset
File: `/scripts/sample_data/sample_telemetry.json`
```json
[
  { "binId": "bin_001", "fill": 45, "weight": 12, "temp": 22, "contamination": 0.05, "lat": 37.7749, "lon": -122.4194 },
  { "binId": "bin_002", "fill": 80, "weight": 20, "temp": 25, "contamination": 0.1, "lat": 37.7750, "lon": -122.4195 },
  { "binId": "bin_003", "fill": 30, "weight": 8, "temp": 18, "contamination": 0.02, "lat": 37.7751, "lon": -122.4196 }
]
```

### Simulation Scripts
1. **Telemetry Simulation**:
   File: `/scripts/simulate_iot.ts`
   ```typescript
   import { sendSmartBinTelemetry } from '../api/iot/smartbins';
   import { createClient } from '@supabase/supabase-js';
   import sampleTelemetry from './sample_data/sample_telemetry.json';

   const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

   async function simulate() {
     const edgeCases = [
       { fill: 100, weight: 25, temp: 40, contamination: 0.5, lat: 37.7749, lon: -122.4194 },
       { fill: 0, weight: 0, temp: -5, contamination: 0, lat: 37.7749, lon: -122.4194 },
     ];
     for (const { binId, ...telemetry } of sampleTelemetry) {
       await sendSmartBinTelemetry(binId, telemetry, `hm_${binId}`, telemetry.lat, telemetry.lon);
       await supabase.from('simulation_logs').insert({ binId, telemetry, timestamp: new Date() });
     }
     for (const telemetry of edgeCases) {
       await sendSmartBinTelemetry('bin_test', telemetry, 'hm_bin_test', telemetry.lat, telemetry.lon);
       await supabase.from('simulation_logs').insert({ binId: 'bin_test', telemetry, timestamp: new Date() });
     }
   }

   simulate();
   ```
   Run: `npm run simulate:iot`

2. **Rewards Simulation**:
   File: `/scripts/simulate_rewards.ts`
   ```typescript
   import { issueRewards } from '../api/wallet/swap';
   import sampleTelemetry from './sample_data/sample_telemetry.json';

   async function simulateRewards() {
     for (const { binId, lat, lon } of sampleTelemetry) {
       await issueRewards(binId, 'test_wallet_address', `hm_${binId}`, lat, lon);
     }
   }

   simulateRewards();
   ```
   Run: `npm run simulate:rewards`

3. **Predictive Analytics Testing**:
   File: `/scripts/test_lstm.ts`
   ```typescript
   import { predictFillLevel } from '../lib/lstm_model';
   import sampleTelemetry from './sample_data/sample_telemetry.json';
   import { createClient } from '@supabase/supabase-js';

   const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

   async function testLSTM() {
     for (const { binId, lat, lon } of sampleTelemetry) {
       const prediction = await predictFillLevel(binId, lat, lon);
       await supabase.from('test_logs').insert({ binId, prediction, timestamp: new Date() });
       console.log(`Prediction for ${binId}:`, prediction);
     }
   }

   testLSTM();
   ```
   Run: `npm run test:lstm`

4. **OTA Testing**:
   - Use `/scripts/ota_utils.ts` for staged deployment simulation.
   - Run: `npm run ota:deploy --bin test_bin --file ./firmware/latest.bin`

**Benefits**:
- Test dashboards, analytics, and rewards without hardware.
- Validate Supabase schema and API flows.
- Enable CI/unit tests for SmartBin features.

**Tip**: Chain `simulate:iot`, `simulate:rewards`, and `test:lstm` to emulate the full SmartBin lifecycle locally.

---

## Troubleshooting and Best Practices

### Common Issues
- **RPC Latency**: Use [Helius.dev](https://helius.dev) for stable RPC.
- **Hivemapper 401/429**: Regenerate API key or implement backoff:
  ```typescript
  import { setTimeout } from 'timers/promises';
  // In catch: await setTimeout(1000 * Math.pow(2, retryCount));
  ```
- **OTA Failures**: Test in sandbox; log to Supabase.
- **Supabase Errors**: Check query limits.

### Best Practices
- **Security**: Use secrets manager; validate hotspot/device IDs.
- **Scalability**: Shard telemetry data; cache Hivemapper results.
- **Monitoring**: Use Solana Explorer, Supabase logs, and Hivemapper console.
- **Cost Optimization**: Monitor Data Credits and HONEY credits.

---

## Resources

- **Helium Docs**: [docs.helium.com/solana](https://docs.helium.com/solana)
- **HPL GitHub**: [helium/helium-program-library](https://github.com/helium/helium-program-library)
- **Hivemapper Docs**: [docs.hivemapper.com](https://docs.hivemapper.com)
- **Hivemapper API**: [hivemapper.com/api/developer/docs](https://hivemapper.com/api/developer/docs)
- **Solana Cookbook**: [solanacookbook.com](https://solanacookbook.com)
- **Helius.dev**: [helius.dev](https://helius.dev)
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Metaplex Docs**: [docs.metaplex.com](https://docs.metaplex.com)
- **Pyth Network**: [pyth.network](https://pyth.network)
- **Community**: X posts (1.2M+ Helium hotspots, September 2025); Hivemapper Discord [discord.com/invite/FRWMKyy5v2](https://discord.com/invite/FRWMKyy5v2)

---

This guide ensures contributors can set up, test, and deploy the Helium-Hivemapper-Polymers integration locally or on devnet. For support, use GitHub issues or the Polymers communities on X and Discord.
