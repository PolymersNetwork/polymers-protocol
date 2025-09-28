// lib/solana/helius.ts

import fetch from 'node-fetch';
import { Connection } from '@solana/web3.js';

export interface HeliusConfig {
  apiKey: string;
  rpcUrl?: string; // optional override
}

export interface ParsedTransaction {
  signature: string;
  slot: number;
  blockTime: number | null;
  fee: number;
  accounts: string[];
  instructions: any[];
  innerInstructions?: any[];
  events?: any;
}

export interface WebhookConfig {
  webhookURL: string; // your backend endpoint to receive notifications
  accountAddresses?: string[];
  transactionTypes?: string[]; // e.g., ["TRANSFER", "NFT_SALE"]
  webhookType?: 'enhanced' | 'raw'; // "enhanced" includes parsed events
  authHeader?: string; // optional authorization header
}

export class HeliusClient {
  private apiKey: string;
  private rpcUrl: string;
  private connection: Connection;

  constructor(config: HeliusConfig) {
    if (!config.apiKey) throw new Error('Helius API key is required');
    this.apiKey = config.apiKey;
    this.rpcUrl = config.rpcUrl || `https://mainnet.helius-rpc.com/?api-key=${config.apiKey}`;
    this.connection = new Connection(this.rpcUrl, 'confirmed');
  }

  /**
   * Get parsed transactions for an address
   */
  async getParsedTransactions(address: string, limit: number = 10): Promise<ParsedTransaction[]> {
    const url = `https://api.helius.xyz/v0/addresses/${address}/transactions?api-key=${this.apiKey}&limit=${limit}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Helius API error: ${res.statusText}`);
    return res.json();
  }

  /**
   * Get token balances for a wallet
   */
  async getTokenBalances(address: string) {
    const url = `https://api.helius.xyz/v0/addresses/${address}/balances?api-key=${this.apiKey}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Helius API error: ${res.statusText}`);
    return res.json();
  }

  /**
   * Resolve NFT metadata for a given mint
   */
  async getNftMetadata(mintAddress: string) {
    const url = `https://api.helius.xyz/v0/tokens/${mintAddress}/metadata?api-key=${this.apiKey}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Helius API error: ${res.statusText}`);
    return res.json();
  }

  /**
   * Get raw RPC request (fallback)
   */
  async rpcRequest(method: string, params: any[] = []): Promise<any> {
    const body = {
      jsonrpc: '2.0',
      id: 'helius-client',
      method,
      params,
    };
    const res = await fetch(this.rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`RPC error: ${res.statusText}`);
    const data = await res.json();
    if (data.error) throw new Error(`RPC error: ${data.error.message}`);
    return data.result;
  }

  // -------------------------------
  // 🔔 Webhooks + Event Subscriptions
  // -------------------------------

  /**
   * Create a webhook subscription
   */
  async createWebhook(config: WebhookConfig) {
    const url = `https://api.helius.xyz/v0/webhooks?api-key=${this.apiKey}`;
    const body = {
      webhookURL: config.webhookURL,
      accountAddresses: config.accountAddresses || [],
      transactionTypes: config.transactionTypes || [],
      webhookType: config.webhookType || 'enhanced',
      authHeader: config.authHeader || '',
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error(`Failed to create webhook: ${res.statusText}`);
    return res.json();
  }

  /**
   * Get all webhooks
   */
  async listWebhooks() {
    const url = `https://api.helius.xyz/v0/webhooks?api-key=${this.apiKey}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to list webhooks: ${res.statusText}`);
    return res.json();
  }

  /**
   * Update an existing webhook
   */
  async updateWebhook(webhookId: string, config: Partial<WebhookConfig>) {
    const url = `https://api.helius.xyz/v0/webhooks/${webhookId}?api-key=${this.apiKey}`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    });
    if (!res.ok) throw new Error(`Failed to update webhook: ${res.statusText}`);
    return res.json();
  }

  /**
   * Delete a webhook
   */
  async deleteWebhook(webhookId: string) {
    const url = `https://api.helius.xyz/v0/webhooks/${webhookId}?api-key=${this.apiKey}`;
    const res = await fetch(url, { method: 'DELETE' });
    if (!res.ok) throw new Error(`Failed to delete webhook: ${res.statusText}`);
    return res.json();
  }

  /**
   * Web3.js connection passthrough
   */
  getConnection(): Connection {
    return this.connection;
  }
}
