# 🌐 Polymers – Recycling Dashboard & Website

A blockchain-powered platform leveraging **AI**, **IoT**, and **AR** to transform polymer recycling and ESG tracking. Built on **Solana** with **DePIN IoT SmartBins** and **AI-driven routing**, it delivers:

- Transparent plastic recovery
- Contamination validation
- NFT Twin tracking
- Gamified ESG rewards

🔗 **[Live Demo](#)** *(Coming soon)*

---

## ✨ Features

### Polymer Recycling
- **SmartBins**: IoT-enabled for PET, HDPE, LDPE, and mixed plastics.
- **NFC/QR Validation**: Scan to verify recycling.
- **AI Contamination Detection**: Identifies impurities in real time.
- **NFT Twins**: Recycled batches linked to NFTs by type and weight.

### Role-Based Access
- **Recycler+**: Gamified recycling with Solana rewards.
- **Company Partner**: ESG dashboards and carbon credit reports.
- **Manufacturer+**: Polymer tracking and predictive IoT maintenance.
- **Admin Auditor**: ESG validation and compliance reporting.

### Blockchain Integrations
- **Solana**: NFTs, staking, Solana Pay, Actions, Blinks.
- **Metaplex**: NFT metadata and polymer credit marketplace.
- **Pyth + Chainlink**: ESG price feeds and oracle data.
- **Helius**: On-chain indexing for polymer credits.
- **Helium/DePIN**: IoT network for SmartBin telemetry.
- **Privy.io**: Privacy-preserving identity management.

### Dashboard
- **Frontend**: Public educational pages and ESG campaigns.
- **Secure Dashboard**: Role-based access with IoT telemetry and AR overlays.
- **Predictive Routing**: AI-optimized pickup routes for lower CO₂.

### Gamification
- **Missions**: Target polymer categories for bonuses.
- **Rewards**: Higher ESG scores for cleaner separation.
- **NFT Badges**: Unlock rare NFTs (e.g., *Polymer Guardian*).
- **Leaderboards**: Individual and company rankings.

### AR & Website
- **AR Maps**: Locate nearby SmartBins.
- **Polymer Streams**: Visualize plastic flow from user to manufacturer.
- **Notifications**: Alerts for missions and contamination issues.
- **AI Assistant**: Guides on sorting and ESG benefits.

---

## 🚀 Production Dashboard

### Features
- **Authentication**: Solana wallet or Privy.io login with fallback.
- **Wallet**: Real-time SOL, PLY, USDC, CARB balances; Solana Pay.
- **Telemetry**: SmartBin data, predictive routing, AR overlays.
- **Analytics**: Carbon credits, recovery stats, ESG dashboards.
- **AI**: Chat assistant, contamination detection, ESG insights.
- **Error Handling**: Robust API fallbacks.

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

### Telemetry
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

## 🌍 ESG & Polymer Impact
- **Polymer Credits**: Tokenized PET, HDPE, LDPE recycling.
- **Carbon Offsets**: Verified CO₂ savings via oracles.
- **Corporate ESG**: Audit-ready dashboards for circularity.
- **Leaderboards**: Community-driven waste reduction.

---

## 🤝 Contributing
See our [Contributing Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md).

## 📜 License
[MIT License](LICENSE).
