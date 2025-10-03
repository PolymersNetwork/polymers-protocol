import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { createTransferInstruction } from '@solana/spl-token';
import { createTransfer } from '@solana/pay';
import supabase from '../../supabaseClient';
import { fetchTokenPrice } from '../../lib/oracles/chainlink';

const SOLANA_RPC = process.env.NEXT_PUBLIC_SOLANA_RPC_URL!;
const connection = new Connection(SOLANA_RPC, 'confirmed');

const TOKEN_MINTS = {
  PLY: new PublicKey(process.env.PLY_MINT!),
  CARB: new PublicKey(process.env.CARB_MINT!),
  USDC: new PublicKey(process.env.USDC_MINT!),
  EWASTE: new PublicKey(process.env.EWASTE_MINT!),
  SOL: null, // Native SOL, no mint address
};

const REWARD_WALLET = new PublicKey(process.env.REWARD_WALLET_ADDRESS!);

export async function createSolanaPaySwap(
  userWallet: string,
  sourceToken: 'PLY' | 'CARB' | 'USDC' | 'SOL' | 'EWASTE',
  destinationToken: 'PLY' | 'CARB' | 'USDC' | 'SOL' | 'EWASTE',
  amount: number
) {
  try {
    const userPublicKey = new PublicKey(userWallet);
    let transaction: Transaction;

    // Fetch token prices from Chainlink (from Integrations.md)
    const sourcePrice = sourceToken === 'SOL' ? await fetchSolPrice() : await fetchTokenPrice(TOKEN_MINTS[sourceToken]!.toString());
    const destPrice = destinationToken === 'SOL' ? await fetchSolPrice() : await fetchTokenPrice(TOKEN_MINTS[destinationToken]!.toString());
    const amountInDest = (amount * sourcePrice) / destPrice;

    if (sourceToken === 'SOL' && destinationToken !== 'SOL') {
      // SOL to Token swap
      transaction = await createTransfer(
        connection,
        userPublicKey,
        REWARD_WALLET, // Reward wallet receives SOL
        amount * 1e9, // SOL in lamports
        { reference: new PublicKey('SWAP_REF'), memo: `Swap ${amount} SOL to ${destinationToken}` }
      );
      // Send destination token from reward wallet
      const tokenTransfer = createTransferInstruction(
        TOKEN_MINTS[destinationToken]!,
        userPublicKey,
        REWARD_WALLET,
        Math.floor(amountInDest * 1e6) // Adjust for token decimals
      );
      transaction.add(tokenTransfer);
    } else if (sourceToken !== 'SOL' && destinationToken === 'SOL') {
      // Token to SOL swap
      transaction = new Transaction().add(
        createTransferInstruction(
          TOKEN_MINTS[sourceToken]!,
          REWARD_WALLET,
          userPublicKey,
          Math.floor(amount * 1e6) // Adjust for token decimals
        )
      );
      // Send SOL from reward wallet
      transaction.add(
        await createTransfer(
          connection,
          REWARD_WALLET,
          userPublicKey,
          Math.floor(amountInDest * 1e9), // SOL in lamports
          { reference: new PublicKey('SWAP_REF'), memo: `Swap ${amount} ${sourceToken} to SOL` }
        )
      );
    } else {
      // Token to Token swap
      transaction = new Transaction().add(
        createTransferInstruction(
          TOKEN_MINTS[sourceToken]!,
          REWARD_WALLET,
          userPublicKey,
          Math.floor(amount * 1e6)
        ),
        createTransferInstruction(
          TOKEN_MINTS[destinationToken]!,
          userPublicKey,
          REWARD_WALLET,
          Math.floor(amountInDest * 1e6)
        )
      );
    }

    // Sign and send transaction
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = userPublicKey;

    // Log transaction in Supabase
    await supabase.from('token_flows').insert({
      user_wallet: userWallet,
      source_token: sourceToken,
      destination_token: destinationToken,
      amount,
      amount_destination: amountInDest,
      transaction_id: transaction.signature?.toString() || 'pending',
      timestamp: new Date(),
    });

    return { transaction, qrCode: await generateQRCode(transaction) };
  } catch (error) {
    await supabase.from('error_logs').insert({
      source: 'solana_pay',
      user_wallet: userWallet,
      error: error.message,
      timestamp: new Date(),
    });
    throw error;
  }
}

// Fetch SOL price (e.g., from Chainlink or Pyth)
async function fetchSolPrice(): Promise<number> {
  try {
    const price = await fetchTokenPrice('SOL_USD_AGGREGATOR'); // Hypothetical Chainlink aggregator
    return price;
  } catch {
    // Fallback to Pyth
    const pythPrice = await fetchPythFeed('sol_usd_feed'); // From Integrations.md
    return pythPrice;
  }
}

// Generate QR code for Solana Pay transaction
async function generateQRCode(transaction: Transaction): Promise<string> {
  const { encodeURL } = await import('@solana/pay');
  const url = encodeURL({ transaction });
  return url.toString();
}
