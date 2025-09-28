## Polymers Protocol API Overview

move to pages folder. 

Based on the provided URL `https://polymersprotocol.org` and the context from the Polymers Protocol documentation, this appears to be the base domain for the project's website, dashboard, and documentation. However, the primary **API** is hosted at `https://api.polymersprotocol.org`. The root domain (`https://polymersprotocol.org`) likely serves as the frontend entry point (e.g., the live demo website and dashboard mentioned in the repo), while the API subdomain handles backend requests.

Since the site may be under development or not publicly indexed yet (as of September 28, 2025), I'll summarize the API details directly from the project's structure. All API endpoints require authentication via `Authorization: Bearer <your-token>`. For interactive testing, use the [Swagger Docs](https://api.polymersprotocol.org/swagger).

### Base API URL
- **API Base**: `https://api.polymersprotocol.org`
- **Documentation**: [Swagger UI](https://api.polymersprotocol.org/swagger) – Auto-generated OpenAPI spec for exploring and testing endpoints.
- **Rate Limits**: Not explicitly documented; monitor headers like `X-RateLimit-Remaining` in responses.
- **Authentication**: JWT tokens obtained via `/auth/login` or wallet-based OAuth (e.g., via Phantom integration).
- **Content-Type**: `application/json` for requests/responses.

### Key API Endpoints
Here's a table of the main endpoints, grouped by category, with example requests and responses. These are derived from the project's backend (`/apps/backend` in the monorepo).

| Category       | Endpoint                  | Method | Description                                                                 | Example Request                                                                 | Example Response (Status) |
|----------------|---------------------------|--------|-----------------------------------------------------------------------------|---------------------------------------------------------------------------------|---------------------------|
| **Users**     | `/users`                 | GET   | Retrieve user details by wallet or email.                                   | `curl -X GET "https://api.polymersprotocol.org/users?wallet=5Hb...xYz&limit=10" -H "Authorization: Bearer <token>"` | `{"users": [{"id": "user_123", "wallet": "5Hb...xYz", "email": "user@example.com", "createdAt": "2025-09-26T08:06:00Z", "role": "user"}]}` (200) |
| **Transactions** | `/transactions`        | POST  | Create a token transfer (e.g., PLY, SOL).                                   | `curl -X POST https://api.polymersprotocol.org/transactions -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"wallet":"5Hb...xYz","amount":100,"token":"PLY","recipient":"7Jk...aBc"}'` | `{"transactionId": "txn_456", "status": "confirmed", "amount": 100, "token": "PLY", "timestamp": "2025-09-26T08:06:00Z", "signature": "5xY...zQw"}` (201) |
| **NFT Twins** | `/nft-twins`             | GET   | Fetch NFT details for a wallet, filtered by staking status.                 | `curl -X GET "https://api.polymersprotocol.org/nft-twins?wallet=5Hb...xYz&staked=true" -H "Authorization: Bearer <token>"` | `{"nfts": [{"id": "nft_789", "owner": "5Hb...xYz", "name": "EcoTwin #001", "staked": true, "rewards": 50000, "evolutionLevel": 2}]}` (200) |
| **Payments**  | `/payments`              | POST  | Initiate a payment via Solana Pay or swaps (Jupiter/Raydium).               | `curl -X POST https://api.polymersprotocol.org/payments -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"wallet":"5Hb...xYz","amount":50,"token":"USDC","method":"solana-pay","recipient":"7Jk...aBc"}'` | `{"paymentId": "pay_123", "status": "pending", "amount": 50, "token": "USDC", "timestamp": "2025-09-26T08:06:00Z", "transactionSignature": "4xY...pQr"}` (201) |
| **ESG Metrics**| `/esg`                   | GET   | Get ESG tracking data (e.g., CO2 reduction, recycling stats).               | `curl -X GET "https://api.polymersprotocol.org/esg?wallet=5Hb...xYz" -H "Authorization: Bearer <token>"` | `{"esg": {"wallet": "5Hb...xYz", "plasticCollected": 25.5, "co2Reduced": 10.2, "recyclingCount": 15, "cityRank": 3}}` (200) |
| **SmartBins** | `/smartbins`             | GET   | Fetch IoT SmartBin data by city or status (integrated with Helium/Hivemapper). | `curl -X GET "https://api.polymersprotocol.org/smartbins?city=NewYork&status=operational" -H "Authorization: Bearer <token>"` | `{"smartbins": [{"id": "bin_456", "location": {"lat": 40.7128, "lng": -74.0060}, "fillLevel": 75, "status": "operational", "lastUpdated": "2025-09-26T08:06:00Z"}]}` (200) |
| **AI Chat**   | `/ai-agents`             | POST  | Send messages to the GPT-powered AI assistant (billed in PLY tokens).       | `curl -X POST https://api.polymersprotocol.org/ai-agents -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"wallet":"5Hb...xYz","message":"What is my recycling impact?"}'` | `{"messageId": "msg_789", "response": "You’ve recycled 25.5kg of plastic, reducing CO2 by 10.2kg!", "remainingMessages": 8, "timestamp": "2025-09-26T08:06:00Z"}` (201) |
| **Additional** | `/donations`, `/recycling`, `/swap`, `/settings`, `/messages` | GET/POST | Handle donations, recycling logs, token swaps, user settings, and chat history. | Varies; see Swagger for params.                                                 | Varies (200/201)         |

### Integration Notes
- **Blockchain Ops**: All Solana interactions (e.g., transactions, NFTs via Metaplex) route through this API. Use the RPC URL from your `.env` (e.g., `https://api.mainnet-beta.solana.com`).
- **Error Handling**: Common responses include 401 (Unauthorized), 429 (Rate Limited), and 500 (Internal Error). Always check `error.message` in JSON bodies.
- **Webhooks**: For real-time updates (e.g., transaction confirmations or SmartBin telemetry), subscribe via `/webhooks/register`.
- **Local Testing**: Run the backend locally with `npm run dev:backend` after cloning the repo (`git clone https://github.com/PolymersNetwork/polymers-protocol.git && cd polymers-protocol && npm install`). The local API will be at `http://localhost:3001`.
- **Feature-Specific Docs**:
  - [AI Chat](https://docs.polymersprotocol.org/ai)
  - [AR Navigation](https://docs.polymersprotocol.org/ar)
  - [ESG Tracking](https://docs.polymersprotocol.org/esg)

### Getting Started with the API
1. **Generate a Token**: Use the mobile/web app to connect a wallet (Phantom/Solflare) and authenticate.
2. **Test in Swagger**: Visit [https://api.polymersprotocol.org/swagger](https://api.polymersprotocol.org/swagger) – No auth needed for read-only exploration.
3. **SDKs**: The monorepo includes shared TypeScript types in `/apps/shared`. Generate client SDKs from Swagger if needed.

If `https://polymersprotocol.org` is intended as the frontend/dashboard, you can access the live demo there (e.g., for wallet connections and visualizations). For custom integrations or issues, check the [GitHub repo](https://github.com/PolymersNetwork/polymers-protocol) or open an issue.
