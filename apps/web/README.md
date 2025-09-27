# 🌐 Polymers – Recycling Dashboard & Website

A blockchain-powered platform leveraging **Solana**, **AI**, **IoT**, and **AR** to revolutionize polymer recycling, e-waste management, and ESG tracking. Using **DePIN IoT SmartBins** and **predictive AI routing**, it enables:

- Transparent plastic and e-waste recovery
- AI-driven contamination validation
- NFT Twin tracking for recycled batches
- Gamified ESG rewards

🔗 **[Live Demo](#)** *(Coming soon)*

---

## ✨ Features

### Polymer & E-Waste Recycling
- **SmartBins**: IoT-enabled bins for PET, HDPE, LDPE, mixed plastics, and e-waste plastics, using fill-level, weight, and material detection sensors.
- **AI Contamination Detection**: Spectroscopy and imaging sensors identify impurities (e.g., labels, adhesives, metals) with real-time `contamination_score`.
- **NFT Twins**: Recycled batches (polymers or e-waste plastics) generate NFTs via **Metaplex**, linked to material type and weight.
- **E-Waste Extension**: Specialized bins detect plastics vs. hazardous materials (e.g., batteries) for safe recycling.

### Role-Based Access
- **Recycler+**: Gamified recycling with Solana-based rewards and missions for polymers and e-waste.
- **Company Partner**: ESG dashboards with carbon credit reports and polymer/e-waste offset tracking.
- **Manufacturer+**: Tracks polymer and e-waste input/output with predictive IoT maintenance.
- **Admin Auditor**: Validates ESG compliance with audit-ready reporting.

### Blockchain Integrations
- **Solana**: Powers NFTs, staking, **Solana Pay**, **Actions**, and **Blinks** for fast, low-cost transactions.
- **Metaplex**: NFT metadata and marketplace for polymer/e-waste credits and badges.
- **Pyth + Chainlink**: ESG price feeds and commodity oracle data for recycled materials.
- **Helius**: Indexes on-chain data for recycling history and analytics.
- **Helium/DePIN**: IoT network for SmartBin telemetry (fill levels, contamination, material type).
- **Privy.io**: Privacy-preserving identity for recyclers and partners.

### IoT & Waste Management
- **SmartBin Sensors**:
  - **Fill-Level**: Ultrasonic sensors optimize collection via `fill_level` (e.g., 75%).
  - **Weight**: Load cells measure recycled material quantities.
  - **Material Detection**: NIR spectroscopy identifies polymers or e-waste plastics.
  - **Temperature/Humidity**: Monitors bin conditions to prevent degradation or hazards.
- **Predictive Routing**: AI optimizes pickup routes, reducing CO₂ emissions.
- **Real-Time Telemetry**: Sensor data updates dashboards via **Helium/DePIN** and WebSockets.

### QR Codes & NFC
- **Validation**: QR codes and NFC tags on bins or waste items authenticate recycling actions.
- **Blockchain Triggers**: Scans initiate Solana transactions (e.g., PLY rewards, NFT minting).
- **E-Waste Use**: Tags on e-waste (e.g., phone casings) ensure traceability and compliance.

### Gamification
- **Missions**: Target polymer or e-waste categories for streak bonuses.
- **Rewards**: Cleaner separation earns higher ESG scores and token multipliers.
- **NFT Badges**: Unlock rare NFTs (e.g., *Polymer Guardian*, *E-Waste Hero*).
- **Leaderboards**: Rank individuals and companies by recycling impact.

### AR & Website
- **AR Maps**: Navigate to nearby SmartBins for polymers or e-waste.
- **Polymer Streams**: Visualize waste flow from user to manufacturer.
- **Notifications**: Mobile alerts for mission progress and contamination warnings.
- **AI Assistant**: Guides users on sorting, ESG benefits, and recycling value.

### Analytics
- **ESG Tracking**: Dashboards display carbon credits, recovery stats, and ESG scores.
- **Real-Time Insights**: IoT telemetry visualized via maps and AR overlays.
- **AI Analytics**: Predictive models optimize routing and detect contamination.
- **E-Waste Metrics**: Tracks plastic recovery and hazardous material alerts.

---

## 🚀 Production Dashboard

### Features
- **Authentication**: Solana wallet or **Privy.io** login with fallback support.
- **Wallet Management**: Real-time SOL, PLY, USDC, CARB balances; supports **Solana Pay**.
- **Telemetry**: SmartBin data, predictive routing, and AR overlays for polymers and e-waste.
- **Analytics**: Carbon credits, recovery stats, and ESG dashboards, stored via **Supabase**.
- **AI**: Chat assistant, contamination detection, and ESG insights.
- **Error Handling**: Robust boundaries for blockchain and IoT APIs.

### Dashboard Layout
- **Sidebar**: Navigate Dashboard, Missions, Wallet, Analytics, ESG Reports.
- **Header**: Live token badges, notifications, user profile.
- **Main Panel**: Telemetry maps, AR overlays, polymer/e-waste streams.
- **Footer**: ESG metrics and links to website/partner dashboards.

### Build Commands
```bash
npm ci
npm run build
npm run start
npm run api:start  # Optional backend
```

### Environment Variables
```env
NEXT_PUBLIC_WS_URL="wss://prod.polymers.io/ws"
NEXT_PUBLIC_SOLANA_RPC_URL="https://api.mainnet-beta.solana.com"
NEXT_PUBLIC_SUPABASE_URL="https://supabase.polymers.io"
NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_KEY"
PRIVY_APP_ID="YOUR_PRIVY_APP_ID"
CHAINLINK_API_KEY="YOUR_CHAINLINK_API_KEY"
TOKEN_PROGRAM_ID="TokenkegQfeZyiNwAJbNbGKPFXkQd5J8X8wnF8MPzYx"
PLY_MINT="PLYKdaCUgxTUw6rSjWbgSN97Qtecb6Fy6SazWf1tvAC"
CARB_MINT="CARBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
USDC_MINT="Es9vMFrzxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

---

## 🛠️ API Examples

### Token Balances
```http
GET /api/wallet/balances?address=<WALLET_ADDRESS>
```
**Response**:
```json
{
  "SOL": 0.123,
  "PLY": 456.789,
  "USDC": 123.45,
  "CARB": 987.654
}
```

### SmartBin Telemetry
```http
GET /api/iot/smartbins
```
**Response**:
```json
[
  {
    "id": "bin-001",
    "location": "Warehouse 12",
    "fill_level": 75,
    "polymer_type": "PET",
    "contamination_score": 0.02
  }
]
```

---

## ⚙️ Development Setup

### Scripts
```bash
npm run dev        # Website + Dashboard
npm run api:dev    # APIs
npm run ws:dev     # WebSocket updates
npm run db:migrate # Database migrations
```

### Environment Variables
```env
NEXT_PUBLIC_WS_URL="ws://localhost:3001"
NEXT_PUBLIC_SOLANA_RPC_URL="https://api.devnet.solana.com"
NEXT_PUBLIC_SUPABASE_URL="your_supabase_url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_key"
PRIVY_APP_ID="your_privy_app_id"
CHAINLINK_API_KEY="your_chainlink_key"
```

---

## 🌍 ESG & Waste Impact
- **Polymer & E-Waste Credits**: Tokenized credits for PET, HDPE, LDPE, and e-waste plastics via Solana.
- **Carbon Offsets**: Verified CO₂ savings using **Pyth/Chainlink** oracles.
- **Corporate ESG**: Audit-ready dashboards for polymer and e-waste circularity.
- **Global Leaderboards**: Community competition to reduce waste.

---

## 🔌 IoT Sensors for Waste Management
- **Fill-Level Sensors**: Ultrasonic sensors optimize collection schedules.
- **Weight Sensors**: Measure polymer/e-waste quantities for NFT minting.
- **Material Detection**: NIR spectroscopy identifies plastics and contaminants.
- **Temperature/Humidity**: Ensures safe storage, especially for e-waste.
- **NFC/QR**: Validates deposits, triggering Solana transactions.
- **Integration**: **Helium/DePIN** powers connectivity; data logged on Solana via **Helius**.

**Example Workflow**:
1. A SmartBin’s fill-level sensor reports 75% capacity via **Helium/DePIN**.
2. NFC scan validates a PET deposit, triggering a **Solana Pay** reward:
   ```javascript
   const { Connection, Transaction } = require("@solana/web3.js");
   const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL);
   async function rewardRecycler(userAddress, amount) {
     const tx = new Transaction().add(
       SystemProgram.transfer({
         fromPubkey: new PublicKey(process.env.REWARD_ACCOUNT),
         toPubkey: new PublicKey(userAddress),
         lamports: amount * 1e9
       })
     );
     await connection.sendTransaction(tx, [rewardSigner]);
   }
   ```
3. Analytics update the dashboard with telemetry and ESG metrics.

---

## 🔧 Next Steps for IoT & E-Waste Integration
1. **Expand Sensor Types**
   - Integrate spectroscopy (NIR, MIR) and advanced imaging sensors to detect and classify e-waste plastics (ABS, polycarbonate) versus metals or hazardous materials.
   - Add chemical sensors for batteries, heavy metals, and toxic substances to improve safety and ESG reporting.
2. **Enhance NFC/QR Integration with Solana Actions/Blinks**
   - Streamline NFC/QR interactions to trigger Solana blockchain transactions automatically.
   - Enable instant PLY/CARB token rewards, NFT Twin minting, and mission tracking for both polymers and e-waste items.
3. **Extend Analytics Dashboards with E-Waste Metrics**
   - Add e-waste-specific KPIs such as:
     - Plastic vs. metal recovery rates
     - Contamination scores
     - Carbon offset contributions from recycled electronics
   - Visualize metrics on the main dashboard with AR overlays, maps, and leaderboards.
4. **Test Sensor-to-Blockchain Workflows on Solana Devnet**
   - Simulate IoT sensor events (fill-level, contamination, e-waste detection) to verify:
     - NFT Twin minting
     - Token reward issuance
     - Data logging and real-time dashboard updates
   - Ensure low-latency, high-throughput integration before Mainnet deployment.
5. **Ensure Robust IoT Connectivity with Helium/DePIN**
   - Optimize SmartBin network reliability for consistent telemetry.
   - Implement fallback strategies for 4G/5G connectivity in areas with weak LoRaWAN coverage.
   - Monitor sensor uptime, data integrity, and error reporting to maintain dashboard accuracy.

---

## 🤝 Contributing
Contributions are welcome! See our [Contributing Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md).

## 📜 License
[MIT License](LICENSE).
