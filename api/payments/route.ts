import { NextRequest, NextResponse } from 'next/server';
import { Keypair, PublicKey } from '@solana/web3.js';
import dotenv from 'dotenv';
import SolanaPayClient from '../../lib/solana/solana';

dotenv.config();

const MERCHANT_WALLET = process.env.MERCHANT_WALLET;
if (!MERCHANT_WALLET) throw new Error('MERCHANT_WALLET not configured in .env');

const merchantPubkey = new PublicKey(MERCHANT_WALLET);
const payClient = new SolanaPayClient(merchantPubkey);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    /**
     * Expected request body:
     * {
     *   payments: [
     *     { amount: number, memo?: string, reference?: string, isPlyPayment?: boolean },
     *     ...
     *   ]
     * }
     */
    if (!body.payments || !Array.isArray(body.payments)) {
      return NextResponse.json({ error: 'Invalid payments array' }, { status: 400 });
    }

    const payments = body.payments.map((p: any) => ({
      amount: p.amount,
      memo: p.memo,
      reference: p.reference ? new PublicKey(p.reference) : undefined,
      isPlyPayment: !!p.isPlyPayment,
    }));

    // Generate batch QR codes
    const qrResults = await payClient.generateBatchPaymentQRs(payments);

    // Return QR code URLs and base64 images
    return NextResponse.json({ qrCodes: qrResults });
  } catch (err: any) {
    console.error('Error generating payment QR codes:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  /**
   * Optional: confirm a transaction by signature
   * ?signature=<txSig>&reference=<optionalReference>
   */
  const { searchParams } = new URL(req.url);
  const signature = searchParams.get('signature');
  const referenceParam = searchParams.get('reference');

  if (!signature) {
    return NextResponse.json({ error: 'Missing transaction signature' }, { status: 400 });
  }

  try {
    const reference = referenceParam ? new PublicKey(referenceParam) : undefined;
    const tx = await payClient.confirmPayment(signature, reference);
    if (!tx) {
      return NextResponse.json({ confirmed: false });
    }
    return NextResponse.json({ confirmed: true, transaction: tx });
  } catch (err: any) {
    console.error('Error confirming transaction:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
