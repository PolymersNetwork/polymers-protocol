# Token Swaps

Solana Pay is a protocol built on the Solana blockchain enabling fast, low-cost, and direct cryptocurrency transactions using QR codes or URLs. Within Polymers Protocol, Solana Pay facilitates token swaps for rewards (PLY, CARB, USDC, SOL, EWASTE), integrating seamlessly with the recycling ecosystem.

## How Token Swaps Work

	1.	Trigger Event
	•	Users deposit waste into a SmartBin.
	•	IoT protocols (Helium, NB-IoT, Sigfox) capture telemetry (weight, contamination, etc.).
	2.	Reward Calculation
	•	iot/smartbins.ts processes telemetry.
	•	Oracles (Pyth for ESG metrics, Chainlink for token prices) feed data into calculateReward.
	•	Determines reward amounts in PLY, CARB, USDC, SOL, or EWASTE.
	3.	Solana Pay Transaction
	•	wallet/swap.ts constructs a Solana Pay transaction specifying recipient wallet, token mint, and amount.
	•	Generates a QR code or URL for mobile or dashboard interaction.
	•	Transaction executes on Solana (mainnet or devnet) via @solana/pay and @solana/web3.js.
	4.	Wallet Update
	•	Tokens are transferred to the user’s wallet.
	•	Dashboard/mobile app reflects updated balances.
	5.	Leaderboard Integration
	•	Rewards contribute to gamified leaderboards, incentivizing recycling participation.

Token Flow Example
	•	Scenario: User recycles 5 kg of PET plastic.
	•	Calculation: 50 PLY + 0.1 CARB assigned based on weight and ESG impact.
	•	Swap Option: Swap PLY to SOL or USDC via Solana Pay.
	•	Transaction: Chainlink price feeds determine 50 PLY = 0.01 SOL. Transaction confirmed in ~400ms.
	•	Outcome: User receives 0.01 SOL; leaderboard updates ranking.

⸻

## Technical Implementation

Key Libraries:
	•	@solana/web3.js – blockchain interactions
	•	@solana/spl-token – SPL token transfers
	•	@solana/pay – QR code / URL-based payments
	•	Chainlink – real-time token price feeds
