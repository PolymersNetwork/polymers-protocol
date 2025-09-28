import { Connection, Keypair, PublicKey, Transaction } from "@solana/web3.js";
import { PolymersRaydiumClient } from "../solana/raydiumClient";
import { HeliusClient, WebhookConfig } from "../solana/helius";

// ---------------- Types ----------------
export interface RewardRecipient {
  user: string;        // recipient public key
  amount: string;      // raw token amount (string for bignum safety)
  tokenMint: string;   // token mint (PLY, SOL, etc.)
}

export interface DistributorConfig {
  connection: Connection;
  heliusApiKey: string;
  merchantWallet: string;
  wallet: Keypair;
}

// ---------------- Rewards Distributor ----------------
export class RewardsDistributor {
  private connection: Connection;
  private raydium: PolymersRaydiumClient;
  private helius: HeliusClient;
  private merchantWallet: PublicKey;

  constructor(config: DistributorConfig) {
    this.connection = config.connection;
    this.raydium = new PolymersRaydiumClient(config.wallet);
    this.helius = new HeliusClient({ apiKey: config.heliusApiKey });
    this.merchantWallet = new PublicKey(config.merchantWallet);
  }

  /**
   * Claim staking rewards → swap → distribute
   * All in one atomic transaction
   */
  async processRewards(recipients: RewardRecipient[]): Promise<string> {
    // Step 1: claim staking rewards (stub — integrate your staking program)
    // Example: await this.claimFromStakingProgram();

    // Step 2: optimize by grouping by tokenMint
    const grouped: Record<string, RewardRecipient[]> = {};
    for (const r of recipients) {
      if (!grouped[r.tokenMint]) grouped[r.tokenMint] = [];
      grouped[r.tokenMint].push(r);
    }

    // Step 3: build a single Solana transaction
    const tx = new Transaction();

    for (const [tokenMint, group] of Object.entries(grouped)) {
      // Example: merge swaps if all recipients need PLY
      if (tokenMint !== "PLY") {
        const totalAmount = group
          .map(r => BigInt(r.amount))
          .reduce((a, b) => a + b, BigInt(0));

        const swapIx = await this.raydium.buildSwapIx({
          fromMint: tokenMint,
          toMint: "PLY",
          amountIn: totalAmount.toString(),
        });
        tx.add(swapIx);
      }

      // Add transfers for each recipient
      for (const r of group) {
        const ix = await this.raydium.buildTransferIx({
          to: new PublicKey(r.user),
          mint: "PLY", // everything ends up as PLY
          amount: r.amount,
        });
        tx.add(ix);
      }
    }

    // Step 4: send atomic tx
    const sig = await this.connection.sendTransaction(tx, [this.raydium.wallet]);
    console.log(`✅ Rewards processed in tx: ${sig}`);
    return sig;
  }

  // ---------------- Webhooks ----------------

  async registerRewardWebhook(webhookUrl: string) {
    const config: WebhookConfig = {
      webhookURL: webhookUrl,
      transactionTypes: ["TRANSFER", "NFT_SALE"],
      webhookType: "enhanced",
      authHeader: "Bearer my-webhook-secret",
    };
    return this.helius.createWebhook(config);
  }

  async listRewardWebhooks() {
    return this.helius.listWebhooks();
  }

  /**
   * Called by backend when Helius webhook fires
   */
  async handleWebhookEvent(payload: any) {
    console.log("🔔 Received Helius webhook", payload);

    if (payload.type === "TRANSFER" && payload.events?.stake) {
      const recipients: RewardRecipient[] = payload.events.stake.map((evt: any) => ({
        user: evt.user,
        amount: evt.amount,
        tokenMint: evt.tokenMint,
      }));

      return this.processRewards(recipients);
    }

    return null;
  }
}
