# Polymers Protocol – Backend

Overview

This repository contains the backend implementation of the Polymers Protocol API, supporting:
	•	User management (wallet/email authentication)
	•	Token transactions (PLY, SOL)
	•	NFT Twins & staking
	•	Payments (Solana Pay, Jupiter/Raydium)
	•	ESG Metrics & SmartBins telemetry
	•	AI Chat powered by GPT
	•	Additional endpoints: donations, recycling, swaps, settings, messages

The backend is built with Node.js + TypeScript and uses Express for routing. Swagger documentation provides an interactive playground for testing endpoints.

⸻

Backend Setup

Clone & Install

git clone https://github.com/PolymersNetwork/polymers-protocol.git
cd polymers-protocol
npm install

Environment Variables

Create a .env file with:

NODE_ENV=development
PORT=3001
JWT_SECRET=your-jwt-secret
SOLANA_RPC_URL=https://api.devnet.solana.com
DATABASE_URL=postgres://user:password@localhost:5432/polymers

Ensure your Solana wallet and RPC endpoints are properly configured for transactions and NFT operations.

⸻

Run Backend Locally

npm run dev:backend

	•	Swagger Docs: http://localhost:3001/swagger
	•	API Root: http://localhost:3001

⸻

Folder Structure

/apps/backend
├─ controllers/       # Endpoint logic
├─ routes/            # Express routes
├─ services/          # Business logic / blockchain ops
├─ models/            # Database models (Prisma/TypeORM)
├─ middlewares/       # Auth, validation, error handling
├─ utils/             # Helper functions
├─ index.ts           # Entry point
└─ swagger.yaml       # OpenAPI spec


⸻

API Overview

The backend implements all core Polymers Protocol endpoints. Full documentation available via Swagger UI.
	•	Base URL: http://localhost:3001 (local) / https://api.polymersprotocol.org (prod)
	•	Authentication: Authorization: Bearer <JWT>
	•	Content-Type: application/json

Key Endpoints:

Category	Endpoint	Method	Description
Users	/users	GET	Retrieve user details
Transactions	/transactions	POST	Token transfers
NFT Twins	/nft-twins	GET	NFT staking & rewards
Payments	/payments	POST	Solana Pay & swaps
ESG Metrics	/esg	GET	Environmental tracking
SmartBins	/smartbins	GET	IoT bin data
AI Chat	/ai-agents	POST	GPT-powered messaging
Additional	/donations, /recycling, /swap, /settings, /messages	GET/POST	Various utility endpoints

Use Swagger or Postman for testing full request/response flows.

⸻

TypeScript SDK

Shared TypeScript types are available in /apps/shared:

import { User, Transaction, NFTTwin, Payment, ESG, SmartBin, AIMessage } from '../shared/types';

Generate client SDK types directly from Swagger:

npx openapi-typescript http://localhost:3001/swagger -o src/shared/types/api.ts


⸻

Postman Collection
	1.	Import docs/postman/polymers-protocol-api.json
	2.	Add your Authorization: Bearer <JWT> token to the collection
	3.	Test the workflow:
Users → Transactions → NFT Twins → Payments → ESG → SmartBins → AI Chat

⸻

Flowchart Guidance

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

Error Handling

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

⸻

Testing & Linting

npm run test        # Unit tests
npm run lint        # Lint code
npm run type-check  # TypeScript checks


⸻

References
	•	Swagger UI
	•	GitHub Repo
	•	API Playground README – Includes flowcharts, Postman instructions, and TypeScript SDK
