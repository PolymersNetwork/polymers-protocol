# ![Polymers Logo](https://raw.githubusercontent.com/PolymersNetwork/apps/web/assets/main/p-logo.png) Polymers Recycling Dashboard (Demo) & Website

A **blockchain-powered AI + IoT + AR platform** for **Polymer recycling and ESG tracking**.  
Built with **Solana, DePIN IoT SmartBins, and predictive AI routing**, the system enables **transparent plastic recovery, contamination validation, NFT Twin tracking, and gamified ESG rewards**.

---

## 🚀 Website + Dashboard Features

### 🔬 Polymer Recycling Focus

* **SmartBins for Polymers** – IoT-enabled bins for PET, HDPE, LDPE, and mixed plastics
* **NFC/QR Validation** – Scan packaging or polymer products for recycling proof
* **AI Contamination Detection** – Detect mixed polymers, labels, adhesives, or impurities
* **RWA & NFT Twins** – Each recycled batch generates an NFT twin (linked to polymer type & weight)

### 🎯 Role-Based Access

* **Recycler+** – Gamified plastic recycling with streaks, missions, and Solana rewards
* **Company Partner** – ESG dashboards, carbon credit reports, and supply chain polymer offsets
* **Manufacturer+** – Polymer input/output tracking, predictive IoT maintenance for recycling machines
* **Admin Auditor** – ESG proof validation, compliance, and audit-ready reporting

### 🔗 Blockchain Integrations

* **Solana** – NFTs, token transfers, staking, Solana Pay, Actions + Blinks
* **Metaplex** – NFT metadata & marketplace for polymer credits
* **Pyth + Chainlink** – ESG price feeds, polymer commodity oracle data
* **Helius** – On-chain indexing & history of polymer credits
* **Helium/DePIN** – IoT network for SmartBin telemetry (fill-levels, contamination, polymer type)
* **Privy.io** – Privacy-preserving identity for recyclers & corporate partners

### 📊 Dashboard Context

* **Website Frontend** – Public-facing educational pages + ESG campaign landing pages
* **Secure Dashboard** – Role-based access for recyclers, partners, manufacturers, auditors
* **Real-Time Telemetry** – IoT polymer bin updates on map + AR overlays
* **Predictive Routing** – AI-driven polymer pickup routes for efficiency & lower CO₂ footprint

---

## 🎮 Gamification for Polymers

* **Recycling Missions** – Target specific polymer categories for streak bonuses
* **Reward Multipliers** – Cleaner polymer separation = higher ESG score
* **NFT Badges** – Unlock rare NFTs (Polymer Guardian, Circular Hero, etc.)
* **Leaderboards** – Individual and company-level polymer recycling rankings

---

## 📱 AR & Website Features

* **2D + AR Maps** – Navigate to nearest polymer SmartBins
* **Polymer Streams Visualization** – Show flow of plastics from user → recycler → manufacturer
* **Mobile Notifications** – Push alerts for mission streaks & polymer contamination warnings
* **AI Chat Assistant** – Answers about plastic sorting, ESG benefits, and polymer value recovery

---

## 🔧 Development Setup

### Environment Variables

```bash
NEXT_PUBLIC_WS_URL="ws://localhost:3001"
NEXT_PUBLIC_SOLANA_RPC_URL="https://api.devnet.solana.com"
NEXT_PUBLIC_SUPABASE_URL="your_supabase_url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_key"
PRIVY_APP_ID="your_privy_app_id"
CHAINLINK_API_KEY="your_chainlink_key"
