## 🌐 Helium / DePIN Integration

Helium’s [Decentralized Physical Infrastructure Network (DePIN)](https://docs.helium.com/) powers Polymers’ IoT layer, providing low-cost, global connectivity for SmartBins in polymer and e-waste recycling. Leveraging Helium’s LoRaWAN network—on [Solana](https://solana.com) since April 2023 (HIP-70, 81% approval)—Polymers achieves real-time telemetry (fill levels, weight, temperature, contamination) at ~$0.00001 per 24KB payload, feeding [ESG Metrics](#esg-nft-twins--rewards), [NFT Twins](#esg-nft-twins--rewards), [Token Rewards & Swap Panel](#polymers-swap-panel), and [Leaderboard](#gamification--leaderboard).

#### Overview of Helium DePIN
- **LoRaWAN Network**: Low-power, long-range (10–15 km rural, 1–2 km urban) IoT connectivity, ideal for SmartBins.
- **Solana Integration**: Unified HNT token (HIP-138, Jan 2025) for Data Credits (DCs) and on-chain proofs via [Helius](https://helius.dev).
- **Token Model**: DCs minted from HNT for micro-transmissions; daily DC burns (e.g., $20K+ in 2025) reduce HNT supply.
- **Network Growth**: 350K+ Hotspots, 1M+ daily users, with expansions via Telefónica (Mexico) and Google Pixel 8 bundling.

#### Integration Flow
Helium powers `/lib/helium.ts`, with NB-IoT/Sigfox fallbacks (`/lib/nbiot.ts`, `/lib/sigfox.ts`):
1. **Data Capture**: SmartBin sensors (ultrasonic, load cells) transmit via LoRaWAN to Hotspots.
2. **Transmission & DCs**: Payloads (~24KB) consume DCs minted from HNT, authenticated via `HELIUM_API_KEY`.
3. **On-Chain Processing**: Data streams to Supabase via Helius RPC, triggering:
   - [NFT Twins](#esg-nft-twins--rewards) minting (Metaplex).
   - [Token Rewards](#esg-nft-twins--rewards) (PLY, CARB, HONEY) using PYTH oracles.
4. **Feedback Loop**: Updates [Dashboard](#full-stack-features) and Mobile App (AR Wayfinder via Hivemapper/Mapbox); Dialect notifications alert pickups/rewards.
5. **Gamification**: High-quality data boosts [Leaderboard](#gamification--leaderboard) rankings and [Swap Panel](#polymers-swap-panel) eligibility for HNT/HONEY.

This creates a proof-of-coverage ecosystem, with Hotspot owners earning HNT for relaying Polymers’ data.

#### Technical Implementation
- **Libraries**:
  - `@helium/iot-sdk`: Device onboarding, DC payments, telemetry decoding.
  - `helium-cli`: Wallet setup (`helium wallet export --key-type solana`).
  - [Helius](https://helius.dev): RPC for DC burns, HNT mints.
- **Environment Variables**:
  ```plaintext
  HELIUM_API_KEY=YOUR_HELIUM_API_KEY
  NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
  NB_IOT_MQTT_BROKER=mqtt://broker.hivemq.com
  SIGFOX_API_KEY=YOUR_SIGFOX_API_KEY
  ```
- **Code Example** (from `/lib/helium.ts`):
  ```typescript
  import { HeliumIoT } from '@helium/iot-sdk';
  import { Connection } from '@solana/web3.js';
  import { supabase } from '../lib/supabaseClient';

  async function sendTelemetry(payload: Buffer, deviceId: string, connection: Connection) {
    const helium = new HeliumIoT({ apiKey: process.env.HELIUM_API_KEY });
    const dcCost = await helium.calculateDCCost(payload.length); // ~$0.00001/24KB
    const burnTx = await helium.burnHNTForDCs(dcCost, wallet);
    await connection.sendTransaction(burnTx);
    const response = await helium.transmit(payload, deviceId);
    if (response.success) {
      await supabase.from('telemetry').insert({ data: response.payload, binId: deviceId });
    }
    return response;
  }
  ```
- **Testing**:
  ```bash
  npm run simulate:iot  # Mock Hotspot relays
  npm run test          # Verify telemetry, DC burns (<1s latency)
  npm run ota:deploy    # OTA firmware updates
  ```

#### Benefits for E-Waste Management
| Aspect              | Benefit                              | Impact                                      |
|---------------------|--------------------------------------|---------------------------------------------|
| Cost Efficiency     | $0.00001/24KB vs. $0.01+ cellular    | Scales 100K+ SmartBins globally             |
| Coverage            | 350K+ Hotspots, long-range LoRaWAN   | Accurate [NFT Twins](#esg-nft-twins--rewards) & [ESG Metrics](#esg-nft-twins--rewards) |
| Decentralization    | HNT rewards for Hotspot owners       | Boosts [Leaderboard](#gamification--leaderboard) & [Swap Panel](#polymers-swap-panel) |
| Scalability         | 1M+ connections, ~400ms confirmations | Supports AI predictions for pickups         |
| ESG Alignment       | Low-energy LoRaWAN, on-chain proofs  | Enhances CARB tokens, EU CSRD compliance    |

#### Challenges & Mitigations
- **Coverage Gaps**: Use NB-IoT/Sigfox; Hivemapper maps Hotspots in AR Wayfinder.
- **DC Volatility**: Batch transmissions; swap USDC in [Swap Panel](#polymers-swap-panel).
- **Security**: AES-256 encryption, Privy.io auth.
- **Adoption**: Incentivize Hotspot deployment with HNT/PLY bonuses.

#### Future Potential
- Hybrid IoT/5G SmartBins for video contamination detection.
- DC auto-minting via Solana programs.
- HNT staking for enterprise users.

#### Resources
- [Helium Docs](https://docs.helium.com/)
- [Helius RPC](https://helius.dev)
- [Polymers Repo](https://github.com/polymers-protocol/smartbin)

---

### 📊 ESG, NFT Twins & Rewards

- **Core Metrics**:
  - Carbon Offset (kg CO₂e) = Weight Recycled × Emission Factor
  - ESG Points = Carbon Offset × 10
  - Cleanliness Score = 100 - (Contamination % × 2)
  - Tons Recycled = Weight / 1000
  - Rivers Cleaned = Plastic Recycled × 0.001 km
- **Rewards & NFTs**:
  - [NFT Twins](#esg-nft-twins--rewards): 5 PLY per 100 ESG Points, minted as Metaplex cNFTs.
  - Staking: HONEY = Staked ESG Points × 0.01/day.
  - [Leaderboard](#gamification--leaderboard): Animated rankings with CARB/EWASTE bonuses.
  - [Swap Panel](#polymers-swap-panel): Swap PLY, CARB, EWASTE, SOL.
- **Tokenomics**:
  | Token  | Purpose                    | Swap Support         |
  |--------|----------------------------|----------------------|
  | PLY    | Recycling points           | Solana Pay, Jupiter  |
  | CARB   | Carbon offset rewards      | Solana Pay, Raydium  |
  | EWASTE | E-waste rewards            | Solana Pay, Jupiter  |
  | HONEY  | Staking rewards            | Solana Pay           |
  | SOL    | Native Solana transactions | Solana Pay, Raydium  |

---

### 💹 Polymers Swap Panel

The [Polymers Swap Panel](#polymers-swap-panel) connects [SmartBins](#helium-depin-integration) → [Rewards](#esg-nft-twins--rewards) → Swaps → Wallets with live multi-token flows, Solana Pay QR codes, and Jupiter/Raydium swaps.

- **Screenshot**: [View Swap Panel Screenshot](/docs/swap-panel-screenshot.png) *(Placeholder: Add actual image to repo)*
- **Interactive GIF**: [View Token Flow Animation](/docs/swap-flow.gif) *(Placeholder: Add to repo)*

#### 📱 Mobile Demo
```jsx
import { SwapPanel } from './components/SwapPanel';
import { TokenFlow } from './components/TokenFlowDemo';

export default function SwapDemo() {
  return (
    <TokenFlow tokens={['PLY','CARB','EWASTE','SOL']} from="SmartBin" to="Wallets">
      <SwapPanel userWallet="Phantom" />
    </TokenFlow>
  );
}
```

#### 💻 Web Dashboard Demo
```jsx
import { SwapPanel } from '../components/SwapPanelWeb';
import { BezierTokenFlow } from '../components/BezierTokenFlow';

export default function WebSwapDemo() {
  return (
    <BezierTokenFlow tokens={['PLY','CARB','EWASTE','SOL']} path="SmartBins→Rewards→Swap→Wallets">
      <SwapPanel />
    </BezierTokenFlow>
  );
}
```

---

### 🏆 Gamification & Leaderboard

- **Animated Rankings**: Monthly rewards:
  - 1st: 100 CARB + 50 EWASTE
  - 2nd: 50 CARB + 25 EWASTE
  - 3rd: 25 CARB + 10 EWASTE
- **Swap Integration**: Rewards swappable via [Polymers Swap Panel](#polymers-swap-panel).
- **NFT Visibility**: [NFT Twins](#esg-nft-twins--rewards) reflect ESG points and reward history.

---

### 📂 Monorepo Structure

```
/apps
  /web              # Next.js dashboard
  /mobile           # React Native app
  /backend          # Fastify/MCP API
/shared
/data
/lib
  /helium.ts        # Helium DePIN integration
  /nbiot.ts         # NB-IoT fallback
  /sigfox.ts        # Sigfox fallback
  /lstm_model.ts    # LSTM analytics
/hooks
/context
/constants
/utils
/api
  /iot/smartbins.ts # Telemetry processing
  /wallet/swap.ts   # Solana Pay swaps
/prisma
/docs
/scripts
  /simulate_iot.ts  # IoT simulations
.env.example
README.md
```

---

### 🛠️ Quickstart

1. **Clone & Install**:
   ```bash
   git clone https://github.com/polymers-protocol/smartbin
   cd smartbin
   npm install
   cp .env.example .env
   ```
2. **Configure `.env`**:
   ```plaintext
   NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
   HELIUM_API_KEY=YOUR_HELIUM_API_KEY
   NB_IOT_MQTT_BROKER=mqtt://broker.hivemq.com
   SIGFOX_API_KEY=YOUR_SIGFOX_API_KEY
   PRIVY_APP_ID=YOUR_PRIVY_APP_ID
   CHAINLINK_API_KEY=YOUR_CHAINLINK_KEY
   ```
3. **Run Simulations**:
   ```bash
   npm run simulate:iot        # Mock Helium Hotspot relays
   npm run simulate:hivemapper # Geospatial mapping
   npm run simulate:rewards    # Reward calculations
   npm run test:lstm           # LSTM analytics
   npm run ota:deploy          # OTA firmware updates
   ```
4. **Run Demos**:
   ```bash
   cd apps/mobile && npm run start  # Mobile app
   cd ../web && npm run dev        # Web dashboard
   ```

---

### 🤝 Community & Support

- **GitHub**: [Polymers Protocol Repo](https://github.com/polymers-protocol/smartbin)
- **Discord**: [Polymers Protocol](https://discord.com/invite/polymersprotocol)
- **Telegram**: [Polymers Protocol](https://t.me/polymersprotocol)
- **Solana**: [Solana Discord](https://discord.com/invite/solana)
- **Helium**: [Helium Discord](https://discord.com/invite/helium)

---

### 📜 License

MIT License – Contributors: Polymers Protocol
