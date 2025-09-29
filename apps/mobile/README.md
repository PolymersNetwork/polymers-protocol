Polymers Mobile App – E-Waste & Recycling dApp

Production Version – 2025
A Web3-enabled mobile app built with Expo + React Native, designed to simplify recycling, track environmental impact, and reward sustainable behavior using Solana & SUI blockchain tokens.

Theme & Design: Dark mode, green-gray-white palette, Font Awesome icons, Satoshi + Geist typography, AR Wayfinder, and NFT Twins for batch tracking.

🔗 Live Demo: demo.polymers.app

⸻

📱 Key Features
	•	Schedule Pickups: Book e-waste or recycling pickups in a few taps, assign SmartBins, and track status in real-time.
	•	SmartBin Telemetry & IoT: Real-time fill, weight, temperature, and contamination sensors; historical telemetry for AI analytics; AR visualization of nearby SmartBins.
	•	Blockchain Rewards & NFT Twins: PLY, CARB, EWASTE tokens; NFT Twins track batch ESG compliance & recycling history; instant wallet updates via Solana Pay/SUI programs.
	•	Predictive Analytics & ESG Insights: AI-driven predictions for collection schedules, contamination, and ESG metrics; LLM assistant for recycling guidance.
	•	Gamification: Missions, challenges, eco-badges, leaderboards, and streak rewards.

⸻

📋 Mobile App Prompts

Category	Example Prompt	Action/Flow
Pickups	“Schedule an e-waste pickup for tomorrow”	Books pickup → assigns SmartBin → triggers token reward calculation
SmartBins	“Show bins >70% full”	Displays AR map → fetches telemetry → updates dashboard
Rewards	“Check my PLY token balance”	Queries blockchain → updates wallet & NFT Twins
ESG	“Show my carbon footprint this month”	Computes from IoT history & NFT Twins → displays dashboard
Predictions	“Predict next collection time for Bin #12”	Uses telemetry + AI → displays ETA
Gamification	“Show leaderboard”	Retrieves missions and scores → updates leaderboard UI
Achievements	“Claim streak reward”	Calculates streak bonus → issues PLY/CARB/EWASTE → updates NFT Twin


⸻

🔧 Architecture

graph LR
    A[User deposits waste] --> B[SmartBin records IoT telemetry]
    B --> C[Historical telemetry synced to backend]
    C --> D[Analytics compute metrics, trends, predictions]
    D --> E[Solana/SUI rewards calculated & NFT Twins minted]
    E --> F[Wallet & mobile app updated with balances & AR overlays]

	•	Telemetry stored locally and synced securely
	•	Analytics compute metrics, trends, and predictions
	•	Reward triggers issue blockchain tokens & NFT Twins
	•	AR overlays visualize SmartBin locations and ESG impact

⸻

🚀 Getting Started

Prerequisites
	•	Node.js ≥16, npm ≥8
	•	Expo CLI: npm install -g expo-cli
	•	Solana CLI & SUI CLI
	•	Supabase: Transaction logging
	•	Privy.io: Authentication
	•	TensorFlow.js: AI analytics
	•	Solana/SUI SDKs: @solana/pay, @solana/web3.js, @solana/spl-token, SUI JS SDK

Installation

git clone https://github.com/PolymersNetwork/polymers-recycling-app.git
cd polymers-recycling-app
npm ci
cp .env.example .env
# Configure environment variables in .env
npx expo start

Environment Variables

NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
NEXT_PUBLIC_SUI_RPC_URL=https://fullnode.devnet.sui.io
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_KEY
PLY_MINT=PLY_TOKEN_MINT
CARB_MINT=CARB_TOKEN_MINT
EWASTE_MINT=EWASTE_TOKEN_MINT
REWARD_WALLET_ADDRESS=REWARD_WALLET
REWARD_WALLET_TOKEN_ACCOUNT=REWARD_WALLET_TOKEN
PRIVY_APP_ID=YOUR_PRIVY_APP_ID
CHAINLINK_API_KEY=YOUR_CHAINLINK_KEY


⸻

📦 Build & OTA Deployment

npx eas build --platform ios
npx eas build --platform android
npx eas update


⸻

🧪 Testing

npm run test

Covers:
	•	IoT telemetry ingestion & syncing
	•	AI analytics & predictions
	•	Solana/SUI reward issuance
	•	NFT Twins creation & verification
	•	Mobile prompts, AR overlays, gamification

⸻

🛠 Error Monitoring & Rollbacks
	•	Monitoring: Sentry for telemetry, blockchain, and app errors
	•	Rollbacks: Versioned deployments for Solana/SUI program updates

⸻

🌍 Why Polymers Mobile App?
	•	Simplifies recycling for homeowners, businesses, and industrial clients
	•	Gamifies eco-friendly actions with blockchain tokens & NFTs
	•	Real-time analytics & ESG insights
	•	Secure, transparent, and verified rewards

⸻

🛡 License

MIT License
