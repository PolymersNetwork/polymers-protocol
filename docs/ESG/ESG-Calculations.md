📊 ESG Calculations – Polymers Protocol (draft)

Polymers Protocol tracks sustainability impact and gamified rewards via SmartBins, AI-powered ESG scanning, and a multi-token reward system (PLY, CARB, EWASTE, HONEY, HNT). Calculations feed token rewards, NFT Twins, leaderboards, and predictive analytics.

⸻

1️⃣ Core Metrics

Carbon Offset

Carbon Offset (kg CO₂e) = Weight Recycled (kg) × Emission Factor (kg CO₂e/kg)

Material	Emission Factor (kg CO₂e/kg)
Plastic	1.5
Glass	0.3
Paper	0.9
Aluminum	9.0

Notes: Supports dynamic updates via ESG oracles (Pyth/Chainlink). Calculated per SmartBin deposit.

⸻

ESG Points

ESG Points = Carbon Offset × 10

	•	Directly drives token rewards and NFT Twin evolution.

⸻

Cleanliness Score

Cleanliness Score = 100 - (Contamination % × 2)

	•	Contamination detected via AI ESG Scanner.
	•	Influences reward eligibility.

⸻

Tons Recycled

Tons Recycled = Weight Recycled / 1000


⸻

Rivers Cleaned

Rivers Cleaned (km) = Plastic Recycled × 0.001  # INC-5.2


⸻

2️⃣ Additional Metrics

Energy Savings

Energy Savings (kWh) = Weight Recycled × Energy Factor (kWh/kg)

Material	Energy Factor (kWh/kg)
Plastic	5.0
Glass	1.2
Paper	4.0
Aluminum	40.0


⸻

Water Savings

Water Savings (L) = Weight Recycled × Water Factor (L/kg)

Material	Water Factor (L/kg)
Plastic	22.0
Glass	15.0
Paper	10.0
Aluminum	150.0


⸻

Social Impact Score

Social Impact Score = (Number of Deposits × 5) + (Leaderboard Rank Points × 2)

	•	Rank points:
	•	1st: 100
	•	2nd: 50
	•	3rd: 25
	•	Others: 10

⸻

Governance Score

Governance Score = (Compliance Checkpoints Passed / Total) × 100

	•	Tracks GDPR, EU CSRD, TCFD, ISO 14064-1, INC-5.2 compliance.
	•	Displayed on dashboards and used for NFT evolution thresholds.

⸻

3️⃣ Reward Mechanism

NFT Twins
	•	Minted via Metaplex cNFTs: 5 PLY per 100 ESG Points.
	•	Animated scale-up and evolution to reflect ESG performance.
	•	Can be staked for HONEY token rewards.

HONEY Staking

HONEY = Staked ESG Points × 0.01/day

Leaderboard Rewards

Rank	CARB	EWASTE
1	100	50
2	50	25
3	25	10

Gamification Enhancements:
	•	Token flow animations show multi-token distribution in real-time.
	•	Leaderboard slide-ins and sparkline charts visualize monthly progress.
	•	NFT Twin animations reflect cumulative impact.

⸻

4️⃣ Real-Time Integration
	•	IoT Telemetry: SmartBins report weight, contamination, and fill-level via Helium DePIN → Supabase.
	•	AI ESG Scanner: TensorFlow.js detects material type and contamination in real-time.
	•	Bezier Token Flows: Multi-token rewards visualized on mobile (ESGImpact.tsx) and web (TokenFlowDemoWeb.tsx).
	•	Dashboard Analytics: Sparklines, tooltips, and NFT Twin status dynamically update.

⸻

5️⃣ Example Calculation

Input:
	•	Plastic: 50 kg
	•	Glass: 20 kg
	•	Aluminum: 10 kg
	•	Contamination: 10%
	•	Deposits: 5
	•	Rank: 2

Output:

Metric	Value
CO₂e Saved	171 kg
ESG Points	1710
PLY Rewards	85.5
Energy Savings	674 kWh
Water Savings	2900 L
Cleanliness Score	80
Rivers Cleaned	0.05 km
Social Impact Score	125


⸻

6️⃣ Dynamic & Oracle-Based Updates
	•	Pyth/Chainlink Oracles: Update emission factors and ESG points in real-time.
	•	Token Valuations: PLY, CARB, EWASTE values adjust dynamically for accurate rewards.
	•	Leaderboard & NFT Twin: Rewards and evolution respond instantly to telemetry changes.

⸻

7️⃣ Visual Flow Diagram

graph TD
  A[SmartBin Sensors<br>Weight, Material, Contamination] --> B[Supabase<br>Realtime ESG Calculations]
  B --> C[Token Rewards<br>(PLY, CARB, EWASTE, HONEY, HNT)]
  C --> D[NFT Twins Minted<br>Metaplex cNFTs]
  C --> E[Leaderboard & Staking<br>Mobile/Web Dashboards]
  B --> F[AI ESG Scanner<br>TensorFlow.js]
  B --> G[LSTM Predictions<br>Fill Levels & Future Rewards]

	•	Animations: GSAP-powered Bezier curves, sparkline charts, tooltips.
	•	Interactions: Touch/click reveals ESG points, token flow, and leaderboard details.

⸻

8️⃣ References & Resources
	•	/apps/mobile/src/components/ESGImpact.tsx – Real-time telemetry & token flow visualization.
	•	/apps/web/src/components/TokenFlowDemoWeb.tsx – Browser-based Bezier flow demo.
	•	/docs/demo.md – Setup instructions for mobile/web demos.
	•	/scripts/__tests__/esg.test.ts – ESG calculation unit tests.
	•	/docs/esg_calculations.pdf (optional visual cheat sheet) – For stakeholders and presentations.
