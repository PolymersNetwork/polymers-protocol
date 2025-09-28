# Polymers Protocol API - Developer Playground

Welcome to the **Polymers Protocol API**! This README provides a fully self-guided playground for developers to explore, simulate, and deploy SmartBin workflows while testing all main API endpoints.

---

## Quickstart Flowchart

```mermaid
graph TD
    A[Start: New Contributor] -->|Check Prerequisites| B{Node.js, Solana CLI, Helium CLI, Supabase CLI,<br>Hivemapper API Key, Phantom Wallet?}
    B -->|No| C[Install Prerequisites]
    C -->|Run npm install -g| D[Clone Repository]
    B -->|Yes| D[Clone Repository]
    D -->|Run git clone| E[Install Dependencies]
    E -->|Run npm install| F[Set Up .env]
    F -->|Configure API keys| G{Simulations Ready?}
    G -->|Run npm run simulate:*| H[Run Simulations]
    H --> I[Telemetry: simulate:iot<br>💡 Tip: Test fill levels<br>cURL: `npm run simulate:iot`]
    H --> J[Hivemapper: simulate:hivemapper<br>💡 Tip: Verify location & map features<br>cURL: `npm run simulate:hivemapper`]
    H --> K[Rewards: simulate:rewards<br>💡 Tip: Check ESG thresholds > 0.5<br>cURL: `npm run simulate:rewards`]
    H --> L[Analytics: test:lstm<br>💡 Tip: Run LSTM model<br>cURL: `npm run test:lstm`]
    H --> M[OTA: ota:deploy<br>💡 Tip: Use test bin first<br>cURL: `npm run ota:deploy --bin test_bin --file ./firmware/latest.bin`]
    I --> N{Simulations Successful?}
    J --> N
    K --> N
    L --> N
    M --> N
    N -->|Yes| O[Deploy to Devnet<br>cURL: `anchor deploy --provider.cluster devnet`]
    N -->|No| P[Check Logs, Fix Errors]
    P --> H
    O --> Q[End: Devnet Deployed]
    style A fill:#f9f,stroke:#333
    style C fill:#f9f,stroke:#333
    style D fill:#f9f,stroke:#333
    style E fill:#f9f,stroke:#333
    style F fill:#f9f,stroke:#333
    style H fill:#cff,stroke:#333
    style I fill:#cff,stroke:#333
    style J fill:#cff,stroke:#333
    style K fill:#cff,stroke:#333
    style L fill:#cff,stroke:#333
    style M fill:#cff,stroke:#333
    style O fill:#9f9,stroke:#333
    style Q fill:#9f9,stroke:#333

Developer Tip: Follow the flowchart for proper environment setup, simulation validation, OTA deployment safety, and reward checks. Commands are ready for copy-paste.

⸻

Setup & Authentication
	1.	Clone the repository:

git clone https://github.com/polymers-protocol/polymers
cd polymers
npm install

	2.	Configure environment variables (.env):

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

	3.	Install dependencies for simulations & OTA testing:

npm install
npm run simulate:iot
npm run simulate:hivemapper
npm run simulate:rewards
npm run test:lstm
npm run ota:deploy --bin test_bin --file ./firmware/latest.bin


⸻

API Endpoints & Examples

1. Users

cURL:

curl -X GET "https://api.polymersprotocol.org/users?wallet=5Hb...xYz" \
-H "Authorization: Bearer <your-token>"

TypeScript SDK:

import { api } from "./sdk";

const userData = await api.getUsers({ wallet: "5Hb...xYz" });
console.log(userData);


⸻

2. NFT Twins

cURL:

curl -X GET "https://api.polymersprotocol.org/nft-twins?wallet=5Hb...xYz&staked=true" \
-H "Authorization: Bearer <your-token>"

TypeScript SDK:

const nfts = await api.getNftTwins({ wallet: "5Hb...xYz", staked: true });
console.log(nfts);


⸻

3. Payments

cURL:

curl -X POST "https://api.polymersprotocol.org/payments" \
-H "Authorization: Bearer <your-token>" \
-H "Content-Type: application/json" \
-d '{"wallet":"5Hb...xYz","amount":50,"token":"USDC","method":"solana-pay","recipient":"7Jk...aBc"}'

TypeScript SDK:

const payment = await api.createPayment({
  wallet: "5Hb...xYz",
  amount: 50,
  token: "USDC",
  method: "solana-pay",
  recipient: "7Jk...aBc"
});
console.log(payment);


⸻

4. AI Chat

cURL:

curl -X POST "https://api.polymersprotocol.org/ai-agents" \
-H "Authorization: Bearer <your-token>" \
-H "Content-Type: application/json" \
-d '{"wallet":"5Hb...xYz","message":"What is my recycling impact?"}'

TypeScript SDK:

const response = await api.sendAiMessage({
  wallet: "5Hb...xYz",
  message: "What is my recycling impact?"
});
console.log(response);


⸻

5. SmartBins

cURL:

curl -X GET "https://api.polymersprotocol.org/smartbins?city=NewYork&status=operational" \
-H "Authorization: Bearer <your-token>"

TypeScript SDK:

const bins = await api.getSmartBins({ city: "NewYork", status: "operational" });
console.log(bins);


⸻

6. ESG Metrics

cURL:

curl -X GET "https://api.polymersprotocol.org/esg?wallet=5Hb...xYz" \
-H "Authorization: Bearer <your-token>"

TypeScript SDK:

const esg = await api.getEsgMetrics({ wallet: "5Hb...xYz" });
console.log(esg);


⸻

Postman Collection Setup
	1.	Download the ready-to-use JSON:
PolymersProtocol.postman_collection.json
	2.	Import in Postman:
	•	Open Postman → File → Import → Select JSON file.
	•	Set environment variable auth_token with your JWT or wallet OAuth token.
	3.	Run Requests:
	•	Explore endpoints interactively.
	•	Modify payloads to test scenarios.
	•	Automate tests using Postman’s built-in test scripts.

✅ With this setup, developers can follow the flowchart, run simulations, deploy OTA updates safely, verify reward thresholds, and test all endpoints without manual configuration.
