'use client';

import { FC, useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { Transaction, PublicKey } from '@solana/web3.js';

interface SwapInterfaceProps {}

const SwapInterface: FC<SwapInterfaceProps> = () => {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const [fromToken, setFromToken] = useState('');
  const [toToken, setToToken] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState<string>('');
  const [estimatedOut, setEstimatedOut] = useState<string>('');

  // Fetch quote from API
  const fetchQuote = async () => {
    if (!fromToken || !toToken || !amount) return;

    try {
      const res = await fetch('/api/wallet/swap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromToken,
          toToken,
          amount,
          userPublicKey: publicKey?.toBase58(),
        }),
      });

      const data = await res.json();
      if (data.success && data.swap) {
        setEstimatedOut(data.swap.outAmount || '');
      } else {
        setEstimatedOut('');
      }
    } catch (err) {
      console.error(err);
      setEstimatedOut('');
    }
  };

  // Handle swap transaction
  const handleSwap = async () => {
    if (!publicKey) {
      setStatus('Connect your wallet first.');
      return;
    }

    try {
      setStatus('Fetching swap transaction...');
      const res = await fetch('/api/wallet/swap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromToken,
          toToken,
          amount,
          userPublicKey: publicKey.toBase58(),
        }),
      });

      const data = await res.json();
      if (!data.success || !data.swap) {
        setStatus(`Error: ${data.error || 'No swap data returned'}`);
        return;
      }

      // Decode Base64 transaction from API
      const tx = Transaction.from(Buffer.from(data.swap.transaction, 'base64'));

      setStatus('Sending transaction...');
      const txId = await sendTransaction(tx, connection);

      setStatus(`Transaction sent: ${txId}`);
      await connection.confirmTransaction(txId, 'confirmed');
      setStatus(`Swap confirmed! Tx: ${txId}`);
    } catch (err: any) {
      console.error(err);
      setStatus(`Error: ${err.message}`);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold">Token Swap</h2>

      <input
        type="text"
        placeholder="From Token Mint"
        value={fromToken}
        onChange={(e) => setFromToken(e.target.value)}
        className="w-full p-2 rounded bg-gray-800"
      />

      <input
        type="text"
        placeholder="To Token Mint"
        value={toToken}
        onChange={(e) => setToToken(e.target.value)}
        className="w-full p-2 rounded bg-gray-800"
      />

      <input
        type="text"
        placeholder="Amount (smallest unit)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 rounded bg-gray-800"
      />

      <button
        onClick={() => {
          fetchQuote();
          handleSwap();
        }}
        className="w-full p-2 bg-sand text-black font-bold rounded hover:bg-yellow-500"
      >
        Swap
      </button>

      {estimatedOut && (
        <p>Estimated Output: <strong>{estimatedOut}</strong></p>
      )}

      {status && <p>Status: {status}</p>}
    </div>
  );
};

export default SwapInterface;
