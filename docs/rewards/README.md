## Polymers – Rewards System Documentation

1️⃣ Overview

The Rewards System now supports:
Multi-level auto-mint rules: Partner → Bin Type → Individual Bin


Type-based default rules (e.g., E-Waste = manual, PET = instant)


Admin Dashboard tree view for visualizing policies in real time


Bi-directional Reward API: SmartBins push deposits directly to Supabase


Auto-minting: deposits trigger instant Solana token minting automatically


Manual claim fallback for auditing or selective bins/partners


Real-time updates: frontend subscribes to Supabase; no polling required



2️⃣ Reward Flow
graph TD
  A[SmartBin Deposit] -->|Push to Reward API| B[Reward API]
  B -->|Evaluate Multi-Level Rules| C{Auto-Mint?}
  C -->|Yes| D[Solana Program: Mint Tokens]
  C -->|No| E[Manual Claim Available]
  D --> F[Wallets Updated]
  E --> F
  F --> G[Dashboard / Mobile App / Leaderboard]

3️⃣ Auto-Mint Policy Hierarchy
Level
Target
Auto-Mint
Notes
Partner
EcoCorp
✅ Default
Applies if no overrides
Bin Type
PET
✅ Auto
Overrides Partner default
Bin Type
E-WASTE
❌ Manual
Overrides Partner default
Bin
Bin 101 (PET)
❌ Manual
Overrides Type & Partner
Bin
Bin 102 (PET)
✅ Auto
Overrides Type & Partner

Rules:
Bin-level overrides have highest precedence


Bin Type rules override Partner defaults


Partner defaults apply if no bin/type overrides exist


Type-based rules automatically apply to new bins unless manually overridden



4️⃣ Reward API – Bi-Directional
4.1 Push Deposit (SmartBin → Supabase)
POST /api/rewards/deposit
Payload:
{
  "bin_id": "b1",
  "partner_id": "p1",
  "deposit_amount": 100
}
Behavior:
Evaluates auto-mint rules via hierarchy


If auto_mint = true → mint tokens immediately via Solana program


If auto_mint = false → store deposit for manual claim


Frontend updates automatically via Supabase subscriptions



4.2 Fetch User Rewards
GET /api/rewards/:user_id
Response:
{
  "user_id": "wallet_pubkey",
  "pending_rewards": [
    {
      "deposit_id": "d1",
      "ply": 100,
      "carb": 50,
      "ewaste": 20,
      "auto_mint": true
    },
    {
      "deposit_id": "d2",
      "ply": 40,
      "carb": 20,
      "ewaste": 10,
      "auto_mint": false
    }
  ]
}

5️⃣ Solana Program Integration
Anchor-based program handles minting/transferring PLY, CARB, EWASTE tokens


Instructions:


mint_rewards(deposit_amount) → auto-mint


transfer_rewards(amount) → manual claim


Accounts: RewardVault PDA, token mints, user token accounts


Environment Variables:


PLY_MINT=PLY_TOKEN_MINT
CARB_MINT=CARB_TOKEN_MINT
EWASTE_MINT=EWASTE_TOKEN_MINT
REWARD_WALLET_ADDRESS=REWARD_WALLET
PROGRAM_ID=YourProgramIdHere11111111111111111111111111111111

6️⃣ Supabase Schema
CREATE TABLE token_flows (
  user_id TEXT,
  deposit_id TEXT,
  deposit_amount FLOAT,
  ply_tokens FLOAT,
  carb_tokens FLOAT,
  ewaste_tokens FLOAT,
  auto_mint BOOLEAN,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE auto_mint_policies (
  partner_id TEXT,
  bin_type TEXT,
  bin_id TEXT,
  auto_mint BOOLEAN
);
auto_mint_policies supports Partner, Bin Type, Bin overrides


token_flows tracks all deposits, whether auto-minted or manual



7️⃣ Admin Dashboard – Tree View
Hierarchy Visualization:
Partner: EcoCorp ✅ Auto
 ├─ Bin Type: PET ✅ Auto
 │   ├─ Bin 101 ❌ Manual
 │   └─ Bin 102 ✅ Auto
 └─ Bin Type: E-WASTE ❌ Manual
     └─ Bin 201 ❌ Manual
Features:
Toggle auto-mint at Partner, Bin Type, or Individual Bin


Type-based rules automatically apply to new bins


Overrides propagate immediately


Tree view shows policy inheritance & active overrides



8️⃣ Frontend Integration
Real-time Supabase subscriptions listen for deposits


Auto-mint deposits trigger Solana transactions immediately


Manual claim deposits appear for user action


React Hook Example:


const useRewards = (walletAddress: string) => {
  const [rewards, setRewards] = useState<RewardData[]>([]);

  useEffect(() => {
    const subscription = supabase
      .from(`token_flows:user_id=eq.${walletAddress}`)
      .on('INSERT', (payload) => setRewards(prev => [...prev, payload.new]))
      .subscribe();

    return () => supabase.removeSubscription(subscription);
  }, [walletAddress]);

  return rewards;
};

9️⃣ Key Features
Feature
Status / Behavior
Partner auto-mint
✅ Configurable
Bin Type override
✅ Configurable
Individual bin override
✅ Configurable
Type-based auto-mint rules
✅ Configurable
Bi-directional Reward API
✅ Push deposits automatically
Manual claim fallback
✅ Optional
Solana program integration
✅ Minting & transfers
Supabase persistence
✅ Tracks deposits & policies
Real-time frontend updates
✅ Realtime subscriptions
Admin Dashboard tree view
✅ Hierarchy & overrides


## Summary:
Fully automated reward minting with multi-level hierarchy rules

Admin Dashboard tree view provides real-time visibility & control

SmartBins push deposits automatically → auto-mint when allowed

Manual claim remains for auditing or selective partners/bins

All transactions, policies, and balances persist in Supabase and reflect immediately in the frontend



