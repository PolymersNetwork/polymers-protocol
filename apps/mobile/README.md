Polymers Mobile App – E-Waste & Recycling dApp

Version 1.0 Beta

A Web3-enabled mobile app built with Expo and React Native to simplify recycling, track environmental impact, and reward sustainable behavior using Solana blockchain tokens. The app features a sleek dark theme with a green-gray-white palette, Font Awesome icons, and Satoshi + Geist typography, designed in Figma.

🔗 Live Demo: demo.polymers.app

⸻

📱 Key Features

1. Schedule Pickups
	•	Book e-waste or recycling pickups in a few taps
	•	Assign SmartBins to scheduled pickups
	•	Track pickup status in real-time

2. SmartBin Telemetry
	•	Sensors for fill level, weight, temperature, and contamination
	•	Historical time-series tracking for trend analysis
	•	Automated Solana rewards for recycling deposits
	•	Over-the-air (OTA) firmware updates via Expo

3. Solana Rewards & NFT Twins
	•	Tokens: PLY, CARB, EWASTE
	•	NFT Twins for batch ESG compliance and recycling history
	•	Instant wallet updates via Solana Pay
	•	Gamified missions, leaderboards, and achievements

4. Predictive Analytics & ESG
	•	Compute fill levels, contamination trends, and predicted collection times
	•	ESG impact metrics (e.g., carbon footprint)
	•	AI/LLM assistant for pickup, reward, and environmental queries

5. Gamification
	•	Missions, challenges, and eco-badges
	•	Leaderboards for individuals and organizations
	•	Unlock rewards based on recycling and ESG compliance

⸻

📋 Mobile App Prompts

Category	Prompt Example	Action/Flow
Pickups	“Schedule an e-waste pickup for tomorrow”	Books pickup → assigns SmartBin → triggers rewards
SmartBins	“Show bins >70% full”	Displays AR map → fetches telemetry → updates dashboard
SmartBins	“Add new IoT reading”	Updates historical data → recomputes analytics → triggers rewards
Rewards	“Check my PLY token balance”	Queries Solana blockchain → updates wallet & NFT Twins
Rewards	“Swap 50 PLY to USDC”	Executes Solana Pay swap → updates balances
ESG	“Show my carbon footprint this month”	Computes from IoT history & NFT Twins → displays in app
Predictions	“Predict next collection time for Bin #12”	Uses historical telemetry + ML → displays ETA
Gamification	“Show leaderboard”	Retrieves missions and scores → updates display


⸻

🔧 Mobile App Architecture

IoT + Analytics Flow

graph LR
    A[User deposits waste] --> B[SmartBin records IoT telemetry]
    B --> C[Historical telemetry updated]
    C --> D[Analytics helpers compute averages, trends, predictions]
    D --> E[Solana rewards calculated & NFT Twins minted]
    E --> F[Wallet & mobile app updated]

	•	Historical Telemetry: Stored locally and synced to backend
	•	Analytics Helpers: Automatically compute metrics on new readings
	•	Reward Triggers: Automated Solana token issuance
	•	NFT Twins: Track batch ESG compliance and recycling history

⸻

### Environment Variables

Variable	Description	Example / Notes
NEXT_PUBLIC_SOLANA_RPC_URL	RPC endpoint for Solana blockchain	https://api.mainnet-beta.solana.com
NEXT_PUBLIC_SUPABASE_URL	URL for Supabase project	https://xyzcompany.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY	Supabase anon/public key	public-anon-key
PLY_MINT	Mint address for PLY token	PLY_TOKEN_MINT_ADDRESS
CARB_MINT	Mint address for CARB token	CARB_TOKEN_MINT_ADDRESS
EWASTE_MINT	Mint address for EWASTE token	EWASTE_TOKEN_MINT_ADDRESS
REWARD_WALLET_ADDRESS	Public key of wallet distributing rewards	REWARD_WALLET_PUBLIC_KEY
REWARD_WALLET_TOKEN_ACCOUNT	Token account of reward wallet	TOKEN_ACCOUNT_PUBLIC_KEY
PRIVY_APP_ID	Privy.io app ID for authentication	privy-app-id
CHAINLINK_API_KEY	API key for Chainlink oracles	chainlink-key
BUBBLEGUM_TREE_ID	ID of the Bubblegum Merkle Tree for cNFTs	TREE_PUBLIC_KEY
CANDY_MACHINE_ID	ID of the deployed Candy Machine	CANDY_MACHINE_PUBLIC_KEY
HELIUS_API_KEY	API key for Helius Webhooks	helius-api-key
NEXT_PUBLIC_ENV	Environment tag for app (dev/test/prod)	production


⸻

🚀 Getting Started (Expo + React Native)

Prerequisites
	•	Node.js: ≥16
	•	npm: ≥8
	•	Expo CLI: npm install -g expo-cli
	•	Solana CLI: For blockchain interactions
	•	Supabase: For transaction logging
	•	Privy.io: For authentication
	•	TensorFlow.js: For predictive analytics
	•	Solana Pay SDK: @solana/pay, @solana/web3.js, @solana/spl-token

Installation

git clone https://github.com/PolymersNetwork/polymers-recycling-app.git
cd polymers-recycling-app
npm ci
cp .env.example .env
# Configure environment variables in .env
npx expo start  # Start development server


⸻

📦 Build & OTA Deployment (Expo)

Build Production Apps

npx eas build --platform ios      # iOS
npx eas build --platform android  # Android

Over-the-Air (OTA) Updates

npx eas update


⸻

🧪 Testing

Run unit and integration tests to ensure reliability:

npm run test

Tests cover:
	•	IoT data ingestion
	•	Analytics helpers
	•	Solana reward workflows
	•	Mobile prompts and gamification

⸻

🛠 Error Monitoring & Rollbacks
	•	Monitoring: Use Sentry for telemetry, blockchain, and app error tracking
	•	Rollbacks: Versioned deployments for Solana program updates to enable safe rollbacks

⸻

### Configuring a Metaplex Candy Machine for cNFT Twin Minting

Polymers uses Metaplex Candy Machine v3 and Bubblegum to mint compressed NFT (cNFT) Twins for SmartBin batches.

Key Points
	•	Compressed NFTs (cNFTs): Low-cost, high-volume minting (~$0.00001 per NFT)
	•	Batch Minting: Mint multiple cNFT Twins in one transaction
	•	Integration:
	•	Solana Pay: Combines mint + reward tokens
	•	Helius Webhooks: Tracks NFT_MINT and TRANSFER events
	•	Supabase: Logs batch data and ESG metrics
	•	Gamification: cNFT Twins grant eco-badges, leaderboard points, and AR overlays

Setup Steps
	1.	Deploy Bubblegum Merkle Tree (~16,000 NFTs capacity)
	2.	Configure Candy Machine with cNFT support
	3.	Prepare metadata with ESG attributes
	4.	Batch mint cNFT Twins + PLY tokens via Solana Pay
	5.	Display QR code in the app (AR Wayfinder)
	6.	Verify mints via Helius Webhook
	7.	Log to Supabase and update leaderboard/dashboard

Example Code Snippets
	•	scripts/setupCandyMachine.js → Deploy Candy Machine and Merkle Tree
	•	components/BatchMintReward.js → React Native component to mint cNFTs and generate Solana Pay QR
	•	server/webhook.js → Node.js webhook handler to update Supabase

⸻

🌍 Why Polymers Mobile App?
	•	Simplifies recycling for homeowners and businesses
	•	Gamifies eco-friendly actions with tokens and NFTs
	•	Delivers real-time analytics and ESG insights
	•	Ensures transparent, secure blockchain-based rewards

⸻

🛡 License

MIT License
