# Polymers Protocol – Developer Package

This repository/package provides everything developers need to run, test, and integrate with the Polymers Protocol backend API, including:
	•	Backend setup (Node.js + TypeScript + Express)
	•	API endpoints & Swagger documentation
	•	TypeScript SDK types
	•	Postman collection
	•	Flowcharts and playground guidance

⸻

1. Overview

The Polymers Protocol API enables developers to interact with:
	•	Users (wallet/email auth)
	•	Token transactions (PLY, SOL)
	•	NFT Twins & staking
	•	Payments (Solana Pay / Jupiter / Raydium)
	•	ESG metrics & SmartBins telemetry
	•	AI Chat powered by GPT
	•	Additional endpoints: donations, recycling, swaps, settings, messages

Domains
	•	Frontend/Dashboard: https://polymersprotocol.org
	•	API Base: https://api.polymersprotocol.org
	•	Swagger / Playground: https://api.polymersprotocol.org/swagger

All endpoints require Authorization: Bearer <JWT>.

⸻

2. Backend Setup

Clone & Install

git clone https://github.com/PolymersNetwork/polymers-protocol.git
cd polymers-protocol
npm install

Environment Variables

Create .env:

NODE_ENV=development
PORT=3001
JWT_SECRET=your-jwt-secret
SOLANA_RPC_URL=https://api.devnet.solana.com
DATABASE_URL=postgres://user:password@localhost:5432/polymers

Run Backend Locally

npm run dev:backend

	•	Swagger Docs: http://localhost:3001/swagger
	•	API Root: http://localhost:3001

⸻

3. API Endpoints

Category	Endpoint	Method	Description
Users	/users	GET	Retrieve user details
Transactions	/transactions	POST	Token transfers
NFT Twins	/nft-twins	GET	NFT staking & rewards
Payments	/payments	POST	Solana Pay & swaps
ESG Metrics	/esg	GET	Environmental tracking
SmartBins	/smartbins	GET	IoT bin data
AI Chat	/ai-agents	POST	GPT-powered messaging
Additional	/donations, /recycling, /swap, /settings, /messages	GET/POST	Various utility endpoints

Example cURL Requests:

# Get users
curl -X GET "https://api.polymersprotocol.org/users?wallet=5Hb...xYz&limit=10" \
  -H "Authorization: Bearer <token>"

# Create transaction
curl -X POST "https://api.polymersprotocol.org/transactions" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"wallet":"5Hb...xYz","amount":100,"token":"PLY","recipient":"7Jk...aBc"}'

Use Swagger or Postman to explore full request/response flows.

⸻

4. TypeScript SDK

Shared types are available in /apps/shared:

import { User, Transaction, NFTTwin, Payment, ESG, SmartBin, AIMessage } from '../shared/types';

Generate SDK types from Swagger:

npx openapi-typescript http://localhost:3001/swagger -o src/shared/types/api.ts

Use these types for frontend integration, backend services, or automated testing.

⸻

5. Postman Collection
	1.	Import docs/postman/polymers-protocol-api.json
	2.	Set Authorization: Bearer <JWT> in the collection
	3.	Test full flows:
Users → Transactions → NFT Twins → Payments → ESG → SmartBins → AI Chat

⸻

6. Flowchart Guidance

flowchart TD
    A[Start Backend & Auth] --> B[Simulate SmartBins & NFT Twins]
    B --> C[Check Rewards & ESG Metrics]
    C --> D[Process Transactions & Payments]
    D --> E[AI Chat & Logs]
    E --> F[Test Postman/Swagger]

	•	A: Start backend, connect wallet, generate JWT
	•	B: Query NFT Twins & SmartBins endpoints
	•	C: Validate ESG metrics & reward points
	•	D: Execute token transfers and payments
	•	E: Test AI chat & logs
	•	F: Explore API fully via Postman or Swagger

⸻

7. Integration Notes
	•	Blockchain Ops: All Solana interactions (transactions, NFTs via Metaplex) use SOLANA_RPC_URL from .env.
	•	Error Handling:

{
  "status": "error",
  "error": {
    "code": 401,
    "message": "Unauthorized"
  }
}

	•	401 – Unauthorized
	•	429 – Rate limited
	•	500 – Internal server error
	•	Webhooks: For real-time updates, subscribe via /webhooks/register.

⸻

8. Testing & Linting

npm run test        # Unit tests
npm run lint        # Lint code
npm run type-check  # TypeScript checks


⸻

9. References
	•	Swagger UI
	•	GitHub Repo
	•	Polymers Protocol Frontend
