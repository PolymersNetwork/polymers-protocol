# About Swap features

Polymers is a protocol built on the Solana blockchain that enables fast, low-cost, and direct cryptocurrency transactions using QR codes or URLs. In the context of the Polymers Protocol, Our application facilitates SPL token swaps for rewards (E.g.. PLY, CARB, USDC, SOL, EWASTE), integrating seamlessly with the platform’s recycling ecosystem. Below, I’ll explore how Solana Pay token swaps work within Polymers Protocol, their technical implementation, benefits, and considerations.

### How Token Swaps Work in Polymers Protocol
Jupiter API, Raydium enables instant, on-chain token transfers and swaps, leveraging Solana’s high-throughput blockchain (up to 65,000 transactions per second) and low fees (typically under $0.01). In Polymers Protocol, token swaps are used to distribute rewards to users and enterprises for recycling activities, as outlined in the project’s token flow.

#### Token Swap Process
1. **Trigger Event**: A user deposits waste into a SmartBin, which captures telemetry (e.g., weight, contamination) via IoT protocols (Helium, NB-IoT, Sigfox).
2. **Reward Calculation**:
   - The `iot/smartbins.ts` API processes telemetry data.
   - Oracles (Pyth for ESG metrics, Chainlink for token prices) feed real-time data to the `calculateReward` function in the reward engine.
   - The system determines the reward amount in PLY, CARB, USDC, SOL, or EWASTE based on waste type, volume, and ESG impact.
3. **Solana Pay Transaction**:
   - The `wallet/swap.ts` API constructs a Solana Pay transaction, specifying the recipient’s wallet, token mint (e.g., PLY_MINT, USDC_MINT), and amount.
   - A QR code or URL is generated for the transaction, which can be scanned via the mobile app or processed via the dashboard.
   - The transaction is executed on Solana’s mainnet or devnet, using `@solana/pay` and `@solana/web3.js` libraries.
4. **Wallet Update**: Tokens are transferred to the user’s wallet, and the dashboard/mobile app reflects the updated balance.
5. **Leaderboard Integration**: Rewards contribute to gamified leaderboards, incentivizing further participation.

#### Token Flow Example
- **Scenario**: A user recycles 5 kg of PET plastic in a SmartBin.
- **Calculation**: The system assigns 50 PLY tokens (based on weight and ESG metrics) and 0.1 CARB for carbon offsets.
- **Swap Option**: The user can swap PLY to SOL or USDC via Solana Pay.
- **Transaction**: The `swap.ts` API initiates a swap, using Chainlink price feeds to ensure fair market value (e.g., 50 PLY = 0.01 SOL). The transaction is confirmed in ~400ms.
- **Outcome**: The user receives 0.01 SOL in their wallet, and the leaderboard updates their ranking.

### Technical Implementation
The Polymers Protocol’s token swap functionality is implemented in the `/api/wallet/swap.ts` file, leveraging Solana’s ecosystem libraries. Below is a simplified breakdown of the process:

#### Key Libraries
- **@solana/web3.js**: Handles blockchain interactions (e.g., creating transactions, querying wallets).
- **@solana/spl-token**: Manages token mints and transfers for SPL tokens (PLY, CARB, USDC, EWASTE).
- **@solana/pay**: Constructs Solana Pay transactions with QR code/URL support.
- **Chainlink**: Provides real-time price feeds for token swaps (e.g., PLY to SOL conversion rates).

#### Sample Code (Simplified)
```typescript
import { PublicKey, Transaction } from '@solana/web3.js';
import { createTransferInstruction } from '@solana/spl-token';
import { createSolanaPayTransaction } from '@solana/pay';

async function swapTokens(
  sender: PublicKey,
  recipient: PublicKey,
  tokenMint: PublicKey,
  amount: number,
  connection: Connection
) {
  const transaction = new Transaction();
  // Add token transfer instruction
  transaction.add(
    createTransferInstruction(
      senderTokenAccount, // Sender's token account
      recipientTokenAccount, // Recipient's token account
      sender, // Sender's public key
      amount // Token amount (in smallest unit)
    )
  );

  // Create Solana Pay transaction with QR code
  const solanaPayUrl = createSolanaPayTransaction({
    recipient,
    amount,
    splToken: tokenMint,
    reference: new PublicKey('reward-reference-key'),
    memo: 'Polymers Reward Swap',
  });

  // Sign and send transaction
  const signature = await sendTransaction(transaction, connection);
  await connection.confirmTransaction(signature);
  return solanaPayUrl;
}
```

#### Environment Variables
The `.env` file configures key parameters:
- `NEXT_PUBLIC_SOLANA_RPC_URL`: Solana mainnet or devnet endpoint (e.g., `https://api.mainnet-beta.solana.com`).
- `PLY_MINT`, `CARB_MINT`, `USDC_MINT`, `EWASTE_MINT`: Public keys for token mints.
- `REWARD_WALLET_ADDRESS`: Wallet for distributing rewards.
- `CHAINLINK_API_KEY`: For price feed integration.

#### Testing
The `/tests/wallet/swap.test.ts` file includes unit tests for:
- Token swap execution (e.g., PLY to SOL).
- Balance updates in user wallets.
- Error handling for failed transactions (e.g., insufficient funds).

Run tests with:
```bash
npm run test
```

### Benefits of Solana Pay Token Swaps
1. **Speed**: Transactions confirm in ~400ms, enabling real-time rewards.
2. **Low Cost**: Fees are typically <$0.01, making micro-rewards feasible.
3. **Scalability**: Solana’s high throughput supports large-scale adoption.
4. **User-Friendly**: QR code-based transactions simplify swaps via the mobile app.
5. **Transparency**: On-chain transactions ensure auditable reward distribution.
6. **Flexibility**: Supports multiple tokens (PLY, CARB, USDC, SOL, EWASTE), catering to diverse user preferences.

### Challenges and Considerations
1. **Token Volatility**: Prices of SOL, PLY, or EWASTE may fluctuate, affecting reward value. USDC mitigates this as a stablecoin option.
2. **Wallet Setup**: Users need Solana-compatible wallets (e.g., Phantom, Solflare), which may pose an adoption barrier for non-crypto users.
3. **Network Congestion**: While rare, Solana network congestion could delay transactions (mitigated by priority fees).
4. **Security**: Private key management and phishing risks (e.g., fake QR codes) require robust user education.
5. **Regulatory Compliance**: Token swaps may face scrutiny in jurisdictions with strict crypto regulations.

### Enhancing Solana Pay in Polymers Protocol
The project’s `CONTRIBUTING.md` highlights Solana Pay as a key focus for improvement. Potential enhancements include:
- **Automated Swaps**: Integrate decentralized exchanges (e.g., Orca, Raydium) for seamless PLY-to-SOL or PLY-to-USDC swaps.
- **Multi-Signature Wallets**: Add support for enterprise-grade security in reward distribution.
- **Cross-Chain Swaps**: Explore bridges (e.g., Wormhole) to enable swaps with tokens on other blockchains (e.g., Ethereum).
- **Improved UX**: Simplify wallet setup with in-app wallet creation via Privy.io.
- **Analytics**: Add swap history and tax reporting features to the dashboard.

### Practical Example
Suppose a user wants to swap 100 PLY for SOL:
1. **Prompt**: The user selects “Swap 100 PLY to SOL” in the mobile app.
2. **Execution**:
   - The app queries Chainlink for the PLY/SOL price (e.g., 100 PLY = 0.02 SOL).
   - A Solana Pay QR code is generated.
   - The user scans the QR code with their wallet (e.g., Phantom).
   - The transaction transfers 100 PLY from the user’s wallet to the reward wallet and 0.02 SOL back to the user.
3. **Outcome**: The swap completes in seconds, and the dashboard updates the user’s SOL balance and leaderboard ranking.

### Testing on Devnet
To explore Solana Pay swaps in a sandbox:
1. Fund a devnet wallet:
   ```bash
   solana airdrop 1 --url https://api.devnet.solana.com
   ```
2. Configure `.env` for devnet (e.g., `NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com`).
3. Run the platform:
   ```bash
   npm run dev
   npx expo start
   ```
4. Simulate a swap via the dashboard or mobile app, using devnet token mints (e.g., `DEV_PLY_MINT`).

### Conclusion
Solana, SPL token swaps in Polymers Protocol enable fast, cost-effective, and transparent reward distribution, aligning economic incentives with sustainable recycling. The integration of Solana’s blockchain, Chainlink oracles, and a user-friendly mobile app creates a seamless experience for users and enterprises. Future enhancements could focus on UX improvements, cross-chain compatibility, and advanced analytics to further drive adoption. To experiment, visit the live demo at [demo.polymersnetwork.org](https://demo.polymersnetwork.org) or explore the code at [github.com/PolymersNetwork/polymers-recycling-platform](https://github.com/PolymersNetwork/polymers-recycling-platform).
