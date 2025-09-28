# Polymers Protocol Backend Developer Guide

**Version**: 1.0.0 beta
**Date**: September 28, 2025

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Environment Setup](#environment-setup)
4. [Database Models](#database-models)
5. [Backend Services](#backend-services)
6. [Carbon Offset & ESG Integration](#carbon-offset--esg-integration)
7. [NFT Twin Staking & Rewards](#nft-twin-staking--rewards)
8. [Solana Program Details](#solana-program-details)
9. [API Endpoints](#api-endpoints)
10. [Developer Tools](#developer-tools)
11. [Flowcharts & Architecture](#flowcharts--architecture)
12. [Testing](#testing)
13. [Best Practices](#best-practices)
14. [Quick Action Checklist](#quick-action-checklist)
15. [Next Steps](#next-steps)

---

## Project Overview

The **Polymers Protocol** is a Solana-based backend service that tracks recycling contributions via SmartBins, calculates carbon offsets and ESG points, and integrates them with NFT Twin staking rewards.

**Key Components**:
- **SmartBins**: IoT devices reporting recycled material and weight.
- **ESG Service**: Calculates carbon offsets and ESG points from recycling data.
- **NFT Twins**: Solana-based NFTs (using Metaplex) that accrue rewards based on staking duration and ESG points.
- **Database**: Stores SmartBin submissions, ESG data, and staking history using Prisma ORM.
- **Blockchain**: Solana for NFT management and optional ESG data logging.

**Tech Stack**:
- Backend: Node.js, TypeScript, Express
- Database: PostgreSQL with Prisma
- Blockchain: Solana, Metaplex, `@solana/web3.js`, `@metaplex-foundation/js`

---

## Prerequisites

- **Node.js** ≥ 20
- **npm** ≥ 9 (or Yarn)
- **PostgreSQL** ≥ 15 (supports JSON/array fields if needed)
- **Solana CLI**: For local validator or Devnet testing
- **Optional**: Mermaid CLI for diagram rendering (`npm install -g @mermaid-js/mermaid-cli`)

---

## Environment Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/polymers-protocol/backend.git
   cd backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure `.env`**:
   Create a `.env` file in the project root with:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/polymers
   SOLANA_RPC_URL=https://api.devnet.solana.com
   NFT_PROGRAM_ID=metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s
   TOKEN_PROGRAM_ID=TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA
   ESG_PROGRAM_ID=<Custom ESG Program ID>
   STAKING_PROGRAM_ID=<Custom Staking Program ID>
   DEFAULT_WALLET_ADDRESS=<Your Wallet Public Key>
   SECRET_KEY=<Your Secret Key>
   JWT_SECRET=<Your JWT Secret>
   NODE_ENV=development
   ```

4. **Initialize the Database**:
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Start the Backend**:
   ```bash
   npm run dev:backend
   ```
   - Backend runs at `http://localhost:3001`.
   - Swagger UI available at `http://localhost:3001/swagger`.

---

## Database Models

**Prisma Schema** (in `prisma/schema.prisma`):

```prisma
model SmartBin {
  id        Int     @id @default(autoincrement())
  binId     String
  user      String  // Solana wallet public key
  weight    Float   // kg of recycled material
  material  String  // e.g., "plastic", "glass"
  timestamp Int     // Unix timestamp
}

model ESG {
  user         String   @id // Solana wallet public key
  points       Int      // Total ESG points
  carbonOffset Float    // Total kg CO₂e offset
  updatedAt    DateTime
}

model Staking {
  id          Int     @id @default(autoincrement())
  user        String  // Solana wallet public key
  nftMint     String  // NFT Twin mint address
  stakedAt    Int     // Unix timestamp
  rewards     Int     // Accumulated PLY tokens
}
```

---

## Backend Services

### 1. SmartBin Service
- **Purpose**: Processes telemetry data from IoT SmartBins.
- **Functions**: Validates weight/material, stores data, triggers ESG calculations.
- **Location**: `/services/smartbins.ts`

### 2. ESG Service
- **Purpose**: Calculates carbon offsets and ESG points from recycling data.
- **Formula**:
  ```
  Carbon Offset (kg CO₂e) = Weight Recycled (kg) × Emission Factor (kg CO₂e/kg)
  ESG Points = Carbon Offset × 10
  ```
- **Emission Factors**:
  | Material  | kg CO₂e/kg |
  |-----------|------------|
  | Plastic   | 1.5        |
  | Glass     | 0.3        |
  | Paper     | 0.9        |
  | Aluminum  | 9.0        |
- **Location**: `/services/esg.ts`
- **Tip**: Cache emission factors to reduce lookups.

### 3. NFT Twin Staking Service
- **Purpose**: Manages NFT Twin staking and reward calculations.
- **Reward Formula**:
  ```
  Total Reward = (Base Rate × Staking Days) + (floor(ESG Points / 100) × 5 PLY)
  ```
  - Base Rate: 10 PLY/day
  - ESG Reward: 5 PLY per 100 ESG points
- **Location**: `/services/staking.ts`

---

## Carbon Offset & ESG Integration

### 1. SmartBin Data Processing
Records telemetry data and triggers carbon offset calculations.

**Example** (in `/services/smartbins.ts`):
```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface SmartBinData {
  binId: string;
  user: string;
  weight: number;
  material: string;
  timestamp: number;
}

async function recordSmartBinData(data: SmartBinData) {
  if (data.weight < 0) throw new Error('Invalid weight');
  await prisma.smartBin.create({ data });
  await calculateCarbonOffset(data.user, data.weight, data.material);
}
```

### 2. Carbon Offset Calculation
Converts recycling data to carbon offsets and ESG points.

**Example** (in `/services/esg.ts`):
```typescript
const emissionFactors = {
  plastic: 1.5,
  glass: 0.3,
  paper: 0.9,
  aluminum: 9.0,
};

async function calculateCarbonOffset(user: string, weight: number, material: string) {
  const emissionFactor = emissionFactors[material] || 0.5;
  const carbonOffset = weight * emissionFactor;
  const esgPoints = Math.floor(carbonOffset * 10);

  const existing = await prisma.esg.findUnique({ where: { user } });
  if (existing) {
    await prisma.esg.update({
      where: { user },
      data: { points: existing.points + esgPoints, carbonOffset: existing.carbonOffset + carbonOffset, updatedAt: new Date() },
    });
  } else {
    await prisma.esg.create({
      data: { user, points: esgPoints, carbonOffset, updatedAt: new Date() },
    });
  }

  return { carbonOffset, esgPoints };
}
```

### 3. On-Chain Logging (Optional)
Logs ESG data to a Solana program for transparency.

**Example** (in `/services/esg.ts`):
```typescript
import { Connection, PublicKey, Keypair, Transaction } from '@solana/web3.js';

async function logCarbonOffsetOnChain(connection: Connection, user: PublicKey, carbonOffset: number, programId: PublicKey, payer: Keypair) {
  const [esgPDA] = await PublicKey.findProgramAddress([Buffer.from('esg'), user.toBuffer()], programId);
  const instruction = createUpdateESGInstruction(esgPDA, user, carbonOffset, programId); // Custom instruction
  const transaction = new Transaction().add(instruction);
  const signature = await connection.sendTransaction(transaction, [payer]);
  await connection.confirmTransaction(signature);
  return signature;
}
```

### 4. Staking Integration
ESG points boost NFT Twin staking rewards.

**Example** (in `/services/staking.ts`):
```typescript
async function calculateRewards(connection: Connection, user: PublicKey, nftMint: PublicKey, stakingProgramId: PublicKey) {
  const [stakingPDA] = await PublicKey.findProgramAddress([Buffer.from('staking'), nftMint.toBuffer(), user.toBuffer()], stakingProgramId);
  const accountInfo = await connection.getAccountInfo(stakingPDA);
  if (!accountInfo) throw new Error('NFT not staked');

  const stakingAccount = deserializeAccount(accountInfo.data);
  const esgData = await prisma.esg.findUnique({ where: { user: user.toString() } });
  const esgPoints = esgData?.points || 0;

  const durationDays = Math.floor((Date.now() / 1000 - stakingAccount.stakedAt) / (24 * 60 * 60));
  const baseReward = 10 * durationDays;
  const esgReward = Math.floor(esgPoints / 100) * 5;
  const totalReward = baseReward + esgReward;

  return { totalReward, baseReward, esgReward, carbonOffset: esgData?.carbonOffset || 0, stakingDuration: durationDays };
}
```

---

## NFT Twin Staking & Rewards

- **Mechanism**: Users stake NFT Twins (Metaplex NFTs) in a Solana program vault.
- **Rewards**: Calculated daily, combining base PLY tokens and ESG-based bonuses.
- **Security**: Validate staking requests with wallet signatures.
- **Endpoints**:
  - `GET /nft-twins`: View staked NFTs and rewards.
  - `POST /nft-twins/stake`: Stake an NFT Twin.

**Example Response** (GET `/nft-twins`):
```json
{
  "status": "success",
  "data": {
    "user": "<USER_PUBLIC_KEY>",
    "nftMint": "<NFT_MINT_ADDRESS>",
    "stakedAt": 1698585600,
    "rewards": 85, // 70 base + 15 ESG
    "carbonOffset": 7.5
  }
}
```

---

## Solana Program Details

The Polymers Protocol leverages Solana programs for NFT Twin staking and optional ESG data logging.

### 1. Metaplex Token Metadata Program
- **Program ID**: `metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s`
- **Purpose**: Manages NFT Twin metadata (e.g., name, URI, collection).
- **Usage**: Fetches NFT details for staking and verifies ownership/collection.
- **Backend Interaction** (in `/services/nft.ts`):
  ```typescript
  import { Metaplex } from '@metaplex-foundation/js';

  async function getNFTTwins(connection: Connection, wallet: Keypair, owner: PublicKey) {
    const metaplex = Metaplex.make(connection).use(keypairIdentity(wallet));
    const nfts = await metaplex.nfts().findAllByOwner({ owner });
    return nfts.filter(nft => nft.collection?.address.toString() === '<NFT_TWIN_COLLECTION_ADDRESS>');
  }
  ```

### 2. Staking Program
- **Program ID**: `<STAKING_PROGRAM_ID>` (configured in `.env`)
- **Purpose**: Manages NFT Twin staking and reward calculations on-chain.
- **Account Structure** (Rust, Anchor framework):
  ```rust
  use anchor_lang::prelude::*;

  #[account]
  pub struct StakingAccount {
      pub owner: Pubkey,      // User wallet
      pub nft_mint: Pubkey,   // NFT Twin mint address
      pub staked_at: i64,     // Unix timestamp
      pub esg_points: u64,    // ESG points for reward calculation
      pub last_claimed: i64,  // Last reward claim timestamp
  }
  ```
- **Instructions**:
  - `stake_nft`: Locks NFT in a vault PDA and initializes `StakingAccount`.
  - `claim_rewards`: Calculates and transfers PLY tokens.
  - `unstake_nft`: Releases NFT and updates rewards.
- **Backend Interaction** (in `/services/staking.ts`):
  ```typescript
  async function stakeNFT(connection: Connection, user: Keypair, nftMint: PublicKey, stakingProgramId: PublicKey) {
    const [stakingPDA] = await PublicKey.findProgramAddress(
      [Buffer.from('staking'), nftMint.toBuffer(), user.publicKey.toBuffer()],
      stakingProgramId
    );
    const instruction = createStakeInstruction(stakingPDA, user.publicKey, nftMint, stakingProgramId); // Custom instruction
    const transaction = new Transaction().add(instruction);
    const signature = await connection.sendTransaction(transaction, [user]);
    await connection.confirmTransaction(signature);
    return signature;
  }
  ```

### 3. ESG Logging Program (Optional)
- **Program ID**: `<ESG_PROGRAM_ID>` (configured in `.env`)
- **Purpose**: Logs carbon offsets and ESG points on-chain for transparency.
- **Account Structure** (Rust, Anchor framework):
  ```rust
  use anchor_lang::prelude::*;

  #[account]
  pub struct ESGAccount {
      pub owner: Pubkey,        // User wallet
      pub points: u64,          // Total ESG points
      pub carbon_offset: f64,   // Total kg CO₂e
      pub last_updated: i64,    // Unix timestamp
  }
  ```
- **Instructions**:
  - `initialize_esg`: Creates a new `ESGAccount`.
  - `update_esg`: Updates points and carbon offsets.
- **Backend Interaction** (in `/services/esg.ts`):
  ```typescript
  async function logCarbonOffsetOnChain(connection: Connection, user: PublicKey, carbonOffset: number, programId: PublicKey, payer: Keypair) {
    const [esgPDA] = await PublicKey.findProgramAddress([Buffer.from('esg'), user.toBuffer()], programId);
    const instruction = createUpdateESGInstruction(esgPDA, user, carbonOffset, programId);
    const transaction = new Transaction().add(instruction);
    const signature = await connection.sendTransaction(transaction, [payer]);
    await connection.confirmTransaction(signature);
    return signature;
  }
  ```

### 4. Key Considerations
- **Security**: Use Anchor for safe PDA derivation and instruction validation.
- **Performance**: Minimize on-chain writes by batching ESG updates or caching locally.
- **Deployment**: Deploy programs to Devnet, then Mainnet:
  ```bash
  solana program deploy <program.so> --url https://api.devnet.solana.com
  ```
- **Dependencies**: `@solana/web3.js`, `@metaplex-foundation/js`, `anchor-lang` (Rust).

---

## API Endpoints

| Endpoint          | Method | Description                          |
|-------------------|--------|--------------------------------------|
| `/smartbins`      | POST   | Submit SmartBin telemetry data       |
| `/smartbins`      | GET    | Retrieve SmartBin data for user      |
| `/esg`            | GET    | Retrieve ESG points & carbon offsets |
| `/nft-twins`      | GET    | View staked NFTs & rewards           |
| `/nft-twins/stake`| POST   | Stake an NFT Twin                    |
| `/staking`        | GET    | Calculate staking rewards            |

**Example Request** (POST `/smartbins`):
```json
{
  "binId": "BIN123",
  "user": "<USER_PUBLIC_KEY>",
  "weight": 5,
  "material": "plastic",
  "timestamp": 1698585600
}
```

**Example Response** (GET `/esg`):
```json
{
  "status": "success",
  "data": {
    "user": "<USER_PUBLIC_KEY>",
    "points": 250,
    "carbonOffset": 7.5,
    "contributions": [
      { "binId": "BIN123", "weight": 5, "material": "plastic", "carbonOffset": 7.5, "points": 75, "timestamp": 1698585600 }
    ]
  }
}
```

---

## Developer Tools

### 1. Swagger UI
- **URL**: `http://localhost:3001/swagger`
- Interactive API playground for testing endpoints.

### 2. Postman Collection
- **File**: `docs/postman/polymers-protocol-api.json`
- Includes preconfigured requests for all endpoints.
- Add `Authorization: Bearer <JWT>` to headers.

### 3. TypeScript SDK
- Generate from Swagger:
  ```bash
  npx openapi-typescript http://localhost:3001/swagger -o src/shared/types/api.ts
  ```
- **Example Usage**:
  ```typescript
  import { PolymersSDK } from 'polymers-sdk';

  const sdk = new PolymersSDK({ rpcUrl: process.env.SOLANA_RPC_URL });
  const esg = await sdk.getESGPoints('<USER_PUBLIC_KEY>');
  console.log(esg.points, esg.carbonOffset);

  await sdk.stakeNFT('<USER_PUBLIC_KEY>', '<NFT_MINT_ADDRESS>');
  ```

---

## Flowcharts & Architecture

### Developer Workflow
![Developer Workflow](diagrams/workflow.png)

```mermaid
flowchart TD
    A[SmartBin Submission] --> B[POST /smartbins]
    B --> C[ESG Calculation]
    C --> D[Update DB]
    D --> E{On-Chain Logging?}
    E -->|Yes| F[Solana Program]
    E -->|No| G[Calculate Staking Rewards]
    F --> G
    G --> H[POST /nft-twins/stake]
    H --> I[GET /nft-twins: Rewards]
```

### Architecture Diagram
![Architecture Diagram](diagrams/architecture.png)

```mermaid
graph TD
    A[User Wallet] --> B[Backend: Node.js/Express]
    B --> C[SmartBins: IoT Devices]
    C --> D[Database: Prisma]
    B --> D
    D --> E[Staking Service]
    B --> F[Swagger UI / Postman]
    E --> G[Solana Blockchain]
    G --> H[Metaplex NFT Program]
    G --> I[Custom ESG Program]
    G --> J[Custom Staking Program]
```

### Database Schema
![Database Schema](diagrams/schema.png)

```mermaid
erDiagram
    ESG ||--o{ SmartBin : tracks
    ESG ||--o{ Staking : influences
    ESG {
        string user PK
        int points
        float carbonOffset
        datetime updatedAt
    }
    SmartBin {
        int id PK
        string binId
        string user
        float weight
        string material
        int timestamp
    }
    Staking {
        int id PK
        string user
        string nftMint
        int stakedAt
        int rewards
    }
```

### Solana Program Interaction
![Solana Program Interaction](diagrams/solana.png)

```mermaid
sequenceDiagram
    actor User
    participant Backend
    participant Database
    participant Solana
    User->>Backend: POST /smartbins
    Backend->>Database: Store SmartBin data
    Backend->>Database: Calculate & store carbon offset
    Backend->>Solana: Log ESG data (optional)
    User->>Backend: GET /esg
    Backend->>Database: Fetch ESG points & offsets
    Backend-->>User: Return ESG data
    User->>Backend: POST /nft-twins/stake
    Backend->>Solana: Stake NFT Twin
    Backend->>Database: Update staking rewards with ESG
```

---

## Testing

### 1. Unit Tests
Run unit tests to verify calculations:
```bash
npm run test
```

**Example Test**:
```typescript
test('Carbon offset calculation', async () => {
  await recordSmartBinData({
    binId: 'BIN123',
    user: '<USER_PUBLIC_KEY>',
    weight: 5,
    material: 'plastic',
    timestamp: Math.floor(Date.now() / 1000),
  });
  const esg = await prisma.esg.findUnique({ where: { user: '<USER_PUBLIC_KEY>' } });
  expect(esg.carbonOffset).toBe(7.5); // 5 kg * 1.5 kg CO₂e/kg
  expect(esg.points).toBe(75); // 7.5 * 10 points
});
```

### 2. Swagger/Postman
- Test endpoints via Swagger (`http://localhost:3001/swagger`) or Postman.
- Import `docs/postman/polymers-protocol-api.json` and add JWT.

### 3. Local Solana Validator
```bash
solana-test-validator --reset
solana airdrop 2 <WALLET_ADDRESS> --url http://localhost:8899
npm run dev:backend
```

---

## Best Practices

- **Validation**: Ensure SmartBin data has non-negative weights and valid materials.
- **Security**: Require wallet signatures for SmartBin submissions, staking, and ESG updates.
- **Accuracy**: Use EPA/IPCC emission factors for carbon offsets.
- **Scalability**: Batch process SmartBin data; cache ESG queries.
- **Auditing**: Regularly audit ESG points, offsets, and Solana program accounts.
- **Solana Programs**: Use Anchor for secure PDA derivation and instruction validation.

---

## Quick Action Checklist

- [ ] Confirm `.env` variables and program IDs.
- [ ] Run database migrations: `npx prisma migrate dev --name init`
- [ ] Start backend: `npm run dev:backend`
- [ ] Test SmartBin submission → ESG points → staking rewards.
- [ ] Deploy Solana programs (Devnet → Mainnet):
  ```bash
  solana program deploy <program.so> --url https://api.devnet.solana.com
  ```
- [ ] Generate PDF guide with embedded diagrams.

---

## Next Steps

1. **Validate Configuration**: Ensure `.env` settings for `DATABASE_URL`, `SOLANA_RPC_URL`, and program IDs.
2. **Test End-to-End**: Submit SmartBin data, verify ESG points, and check staking rewards.
3. **Deploy**: Test on Solana Devnet, then deploy to Mainnet.
4. **Generate PDF**: Create a visually rich PDF with embedded diagrams (see below).

---

## Generating the PDF Guide

To create a presentation-ready PDF with embedded diagrams:

1. **Save Diagrams**:
   - Install Mermaid CLI:
     ```bash
     npm install -g @mermaid-js/mermaid-cli
     ```
   - Generate images for each diagram:
     ```bash
     mmdc -i workflow.mmd -o diagrams/workflow.png --scale 2
     mmdc -i architecture.mmd -o diagrams/architecture.png --scale 2
     mmdc -i schema.mmd -o diagrams/schema.png --scale 2
     mmdc -i solana.mmd -o diagrams/solana.png --scale 2
     ```
   - Alternatively, use `mermaid.live` to export PNGs/SVGs.
   - Save images in a `diagrams/` folder.

2. **Convert to PDF**:
   - **Pandoc** (simple):
     ```bash
     pandoc README.md -o README.pdf --pdf-engine=xelatex -V geometry:margin=1in
     ```
   - **MkDocs** (professional styling):
     - Install: `pip install mkdocs mkdocs-material mkdocs-pdf-export-plugin`
     - Create `mkdocs.yml`:
       ```yaml
       site_name: Polymers Protocol Developer Guide
       theme:
         name: material
         palette:
           primary: teal
       plugins:
         - pdf-export
       ```
     - Build and export: `mkdocs build && mkdocs serve`
   - **Typora** (quick export):
     - Open `README.md` in Typora.
     - Render Mermaid diagrams (built-in support).
     - Export to PDF via `File > Export > PDF`.

3. **Polish**:
   - Add a cover page with title, version, date, and optional logo.
   - Ensure diagrams are high-resolution and text is readable (e.g., Arial, 12pt).
   - Include a table of contents (auto-generated by Pandoc/MkDocs).

---

**References**:
- Solana: https://docs.solana.com
- Metaplex: https://docs.metaplex.com
- Anchor: https://www.anchor-lang.com
- Prisma: https://www.prisma.io/docs
- GitHub: https://github.com/polymers-protocol/backend
- Swagger: http://localhost:3001/swagger
```

---

### LaTeX Template for Polished PDF

For a professional PDF, you can use LaTeX to combine the Markdown content (converted to LaTeX via Pandoc) with a custom cover page and styling. Below is a sample LaTeX template to wrap the README content.

```latex
\documentclass[12pt]{article}
\usepackage[utf8]{inputenc}
\usepackage{geometry}
\usepackage{graphicx}
\usepackage{hyperref}
\usepackage{tocloft}
\usepackage{titling}
\usepackage{xcolor}

\geometry{a4paper, margin=1in}
\hypersetup{
    colorlinks=true,
    linkcolor=blue,
    urlcolor=blue,
    pdftitle={Polymers Protocol Backend Developer Guide},
    pdfauthor={Polymers Protocol Team}
}

\title{Polymers Protocol Backend Developer Guide}
\author{Polymers Protocol Team}
\date{September 28, 2025}

\begin{document}

% Cover Page
\begin{titlepage}
    \centering
    \vspace*{2cm}
    % Optional: Add logo
    % \includegraphics[width=0.5\textwidth]{logo.png}
    \vspace{1cm}
    {\Huge \textbf{\thetitle}\par}
    \vspace{0.5cm}
    {\Large Version 1.0.0\par}
    \vspace{0.5cm}
    {\large \thedate\par}
    \vspace{1cm}
    {\large \theauthor\par}
    \vfill
\end{titlepage}

% Table of Contents
\tableofcontents
\newpage

% Content (generated from Markdown)
\section{Project Overview}
% Paste Pandoc-converted LaTeX content here or include as a separate file
% Example: \input{readme_content.tex}

\section{Prerequisites}
% Add sections manually or via Pandoc conversion

% Include Diagrams
\section{Flowcharts \& Architecture}
\begin{figure}[h]
    \centering
    \includegraphics[width=\textwidth]{diagrams/workflow.png}
    \caption{Developer Workflow}
\end{figure}
\begin{figure}[h]
    \centering
    \includegraphics[width=\textwidth]{diagrams/architecture.png}
    \caption{Architecture Diagram}
\end{figure}
\begin{figure}[h]
    \centering
    \includegraphics[width=\textwidth]{diagrams/schema.png}
    \caption{Database Schema}
\end{figure}
\begin{figure}[h]
    \centering
    \includegraphics[width=\textwidth]{diagrams/solana.png}
    \caption{Solana Program Interaction}
\end{figure}

\end{document}
```

**Steps to Use LaTeX Template**:
1. Save the LaTeX code as `guide.tex`.
2. Convert `README.md` to LaTeX using Pandoc:
   ```bash
   pandoc README.md -o readme_content.tex
   ```
3. Include `readme_content.tex` in the LaTeX template (replace comment in `\section{Project Overview}`).
4. Generate diagram images using Mermaid CLI and save in `diagrams/`.
5. Compile the PDF:
   ```bash
   xelatex guide.tex
   ```
6. Add a logo (optional) by uncommenting the `\includegraphics` line and providing `logo.png`.

---

### Instructions for PDF Generation

1. **Save the Markdown**:
   - Copy the Markdown content into `README.md`.
   - Create a `diagrams/` folder for images (`workflow.png`, `architecture.png`, `schema.png`, `solana.png`).

2. **Generate Diagram Images**:
   - Install Mermaid CLI:
     ```bash
     npm install -g @mermaid-js/mermaid-cli
     ```
   - Save each Mermaid code block as a `.mmd` file (e.g., `workflow.mmd`, `architecture.mmd`, `schema.mmd`, `solana.mmd`).
   - Generate images:
     ```bash
     mmdc -i workflow.mmd -o diagrams/workflow.png --scale 2
     mmdc -i architecture.mmd -o diagrams/architecture.png --scale 2
     mmdc -i schema.mmd -o diagrams/schema.png --scale 2
     mmdc -i solana.mmd -o diagrams/solana.png --scale 2
     ```
   - Alternatively, use `mermaid.live` to export PNGs/SVGs.

3. **Convert to PDF**:
   - **Pandoc** (simple):
     ```bash
     pandoc README.md -o README.pdf --pdf-engine=xelatex -V geometry:margin=1in
     ```
   - **MkDocs** (professional styling):
     - Install: `pip install mkdocs mkdocs-material mkdocs-pdf-export-plugin`
     - Use the provided `mkdocs.yml`.
     - Build: `mkdocs build`
     - Export PDF: Generated by `pdf-export` plugin.
     - Preview: `mkdocs serve`
   - **Typora** (quick export):
     - Open `README.md` in Typora.
     - Render Mermaid diagrams.
     - Export to PDF via `File > Export > PDF`.
   - **LaTeX** (polished):
     - Save the LaTeX template as `guide.tex`.
     - Convert Markdown to LaTeX: `pandoc README.md -o readme_content.tex`.
     - Compile: `xelatex guide.tex`.

4. **Polish the PDF**:
   - Add a cover page with title, version, date, and optional logo.
   - Ensure diagrams are high-resolution (use `--scale 2` in Mermaid CLI).
   - Use Arial or similar font (12pt) for readability.
   - Include a table of contents (auto-generated by Pandoc/MkDocs/LaTeX).

---

### Additional Notes
- **New Diagram**: Added a **Solana Program Interaction** sequence diagram to visualize backend-Solana interactions, as suggested in your checklist.
- **Styling**: The LaTeX template and MkDocs configuration use a clean, professional look (teal palette for MkDocs, Arial for LaTeX). Specify custom colors or fonts if desired.
- **Logo**: A Polymers Protocol logo, add it to the LaTeX cover page or MkDocs theme.
- **Optimization**: The checklist is integrated as a dedicated section for quick reference, aligning with your action-ready format.
