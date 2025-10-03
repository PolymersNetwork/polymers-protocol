## 📂 Full-Stack Architecture

The end-to-end flow covers:

**SmartBin → AI ESG Scanner → Oracles → Token Flow → NFT Twin → Compliance Dashboard → CI/CD**

```mermaid
graph TD
    A[SmartBin Sensors<br>Fill, Weight, Material, Contamination<br>Helium DePIN] -->|LoRaWAN| B[Helium Hotspot<br>10km Range]
    B -->|Telemetry| C[Supabase<br>Realtime Database]
    C -->|Validated Data & ESG Calculations| D[Rewards System<br>PLY, CARB, EWASTE, HONEY, HNT]
    D -->|NFT Minting| E[Metaplex cNFTs<br>NFT Twins]
    C -->|Map Data| F[AR Wayfinder<br>Hivemapper + Mapbox]
    D -->|ATA Updates| G[Wallets<br>Phantom, Solflare, Backpack]
    F -->|Frontend| H[React Native / Next.js Dashboards]
    H -->|AI Chat| I[Dialect + GPT/Grok]
    C -->|API Requests| J[Fastify/MCP Backend]
    J -->|Audit Logs| K[Compliance Dashboard<br>GDPR, CSRD, TCFD, ISO]
    H -->|Build/Test| L[CI/CD Pipeline<br>Expo, Vercel, GitHub Actions]

Full implementation plan diagram is available in /docs/implementation_plan.md with detailed integration, component breakdown, and visual design specs.

⸻

🛠 Features

1. SmartBin Telemetry & AI ESG Scanner
	•	Real-time data collection via Helium DePIN IoT sensors.
	•	Material detection using TensorFlow.js (expo-camera) >95% accuracy.
	•	ESG metrics: CO₂e, energy, water, points.

2. Oracle Integrations
	•	Real-time emission factors and token prices via Pyth & Chainlink.
	•	Validates ESG metrics before token issuance.
	•	Multi-token rewards: PLY, CARB, EWASTE, HONEY, HNT.

3. Token Flow & NFT Twins
	•	GSAP-animated Bezier paths visualize multi-token flows.
	•	NFT Twins minted via Metaplex cNFTs, with staking and animated evolution.
	•	Leaderboard tracks top users with dynamic animations.

4. Compliance Dashboard
	•	Displays GDPR, CSRD, TCFD, ISO 14064-1, ISO 31000, INC-5.2 metrics.
	•	Risk scoring and audit history visualization.
	•	Monitors anomalies via Sentry integration.

5. Frontend Dashboards
	•	Mobile: React Native (ESGImpact.tsx, TokenFlowDemo.tsx, Leaderboard.tsx).
	•	Web: Next.js (TokenFlowDemoWeb.tsx, ComplianceDashboard.tsx).
	•	AR Wayfinding via Hivemapper + Mapbox overlays.
	•	AI chat support via Dialect + GPT/Grok.

6. CI/CD & OTA Updates
	•	GitHub Actions handle build, test, and deployment.
	•	Expo OTA updates for mobile.
	•	Vercel deployment for web.

⸻

⚙️ Development Setup

Prerequisites
	•	Node.js >= 20
	•	npm >= 9
	•	Yarn (optional)
	•	Expo CLI for mobile
	•	GitHub access for CI/CD pipelines
	•	Supabase project with real-time DB

Environment Variables

Create a .env.local with the following:

NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
TOKEN_PROGRAM_ID=<token-program-id>
NFT_PROGRAM_ID=<nft-program-id>
DEFAULT_WALLET_ADDRESS=<wallet-address>
METADATA_SERVICE_URL=<metadata-api-url>
ERROR_TRACKING_SERVICE_URL=<sentry-url>
SECRET_KEY=<secret-key>
JWT_SECRET=<jwt-secret>
NODE_ENV=development

Install Dependencies

npm install

Run Mobile App

cd apps/mobile
expo start

Run Web App

cd apps/web
npm run dev

Run Backend

cd apps/backend
npm run dev


⸻

📊 Rendering Diagrams
	•	Mermaid CLI for SVG export:

npm install -g @mermaid-js/mermaid-cli
npx @mermaid-js/mermaid-cli -i docs/implementation_plan.md -o docs/implementation_plan.svg

	•	Convert SVG to PNG for presentations:

convert docs/implementation_plan.svg docs/implementation_plan.png


⸻

📈 Contribution Guidelines
	•	Follow ESLint + Prettier rules.
	•	Use Supabase test dataset for simulation.
	•	Ensure CI/CD pipeline passes before merging.
	•	Document new components in /docs/components.md.

⸻

🎨 Design & Compliance
	•	Colors: Dark Green #1A3C34, Sand #F4A261, Light Gray #D3D3D3, White #FFFFFF.
	•	Fonts: Satoshi Bold / Geist Regular.
	•	Compliance: GDPR, CSRD, TCFD, ISO 14064-1, ISO 31000, INC-5.2.
	•	Animations: GSAP Bezier flows, NFT evolution, leaderboard sparklines.
