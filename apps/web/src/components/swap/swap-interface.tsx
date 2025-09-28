'use client';

import { FC, useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction } from '@solana/web3.js';

interface SwapProps {}

const Swap: FC<SwapProps> = () => {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const [fromToken, setFromToken] = useState('');
  const [toToken, setToToken] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState<string>('');

  const handleSwap = async () => {
    if (!publicKey) {
      setStatus('Please connect your wallet.');
      return;
    }

    try {
      setStatus('Fetching quote...');
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

      if (!data.success) {
        setStatus(`Error: ${data.error}`);
        return;
      }

      const swapTx = data.swap.transaction; // Base64 transaction from API
      const tx = Transaction.from(Buffer.from(swapTx, 'base64'));

      setStatus('Sending transaction...');
      const txId = await sendTransaction(tx, connection);
      setStatus(`Transaction sent: ${txId}`);
      await connection.confirmTransaction(txId, 'confirmed');
      setStatus(`Swap confirmed! Tx: ${txId}`);
    } catch (error: any) {
      console.error(error);
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg space-y-4 w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold">Token Swap</h2>
      <input
        className="w-full p-2 rounded bg-gray-800"
        placeholder="From Token Mint"
        value={fromToken}
        onChange={(e) => setFromToken(e.target.value)}
      />
      <input
        className="w-full p-2 rounded bg-gray-800"
        placeholder="To Token Mint"
        value={toToken}
        onChange={(e) => setToToken(e.target.value)}
      />
      <input
        className="w-full p-2 rounded bg-gray-800"
        placeholder="Amount (in smallest unit)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        className="w-full p-2 bg-sand text-black font-bold rounded hover:bg-yellow-500"
        onClick={handleSwap}
      >
        Swap
      </button>
      {status && <p className="mt-2">{status}</p>}
    </div>
  );
};

export default Swap;
