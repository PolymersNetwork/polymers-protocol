'use client';

import { FC, useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { FaUserCircle, FaCog } from 'react-icons/fa'; // Green/dark green icons
import clsx from 'clsx';

const DashboardTabs: FC = () => {
  const { publicKey } = useWallet();
  const [activeTab, setActiveTab] = useState<'profile' | 'settings'>('profile');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    // TODO: Fetch profile & settings from API
    setUsername('SparkyUser');
    setBio('Blockchain enthusiast and NFT collector.');
    setDisplayName('SparkyUser');
    setEmail('sparky@example.com');
  }, []);

  const handleProfileUpdate = async () => {
    try {
      // TODO: Call API to update profile
      setStatus('Profile updated!');
    } catch (err: any) {
      console.error(err);
      setStatus(`Error: ${err.message}`);
    }
  };

  const handleSettingsSave = async () => {
    try {
      // TODO: Call API to save settings
      setStatus('Settings saved!');
    } catch (err: any) {
      console.error(err);
      setStatus(`Error: ${err.message}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 text-white rounded-lg">
      {/* Tabs */}
      <div className="flex border-b border-gray-700 mb-6">
        <button
          onClick={() => setActiveTab('profile')}
          className={clsx(
            'flex items-center px-4 py-2 -mb-px font-semibold border-b-2 transition-colors',
            activeTab === 'profile'
              ? 'border-green-500 text-green-500'
              : 'border-transparent text-gray-400 hover:text-green-400'
          )}
        >
          <FaUserCircle className="mr-2" /> Profile
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={clsx(
            'flex items-center px-4 py-2 -mb-px font-semibold border-b-2 transition-colors',
            activeTab === 'settings'
              ? 'border-green-500 text-green-500'
              : 'border-transparent text-gray-400 hover:text-green-400'
          )}
        >
          <FaCog className="mr-2" /> Settings
        </button>
      </div>

      {/* Tab content */}
      {activeTab === 'profile' && (
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 rounded bg-gray-800"
            />
          </div>

          <div>
            <label className="block mb-1">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-2 rounded bg-gray-800"
            />
          </div>

          <div>
            <label className="block mb-1">Wallet</label>
            {publicKey ? (
              <p className="bg-gray-800 p-2 rounded">{publicKey.toBase58()}</p>
            ) : (
              <WalletMultiButton />
            )}
          </div>

          <button
            onClick={handleProfileUpdate}
            className="w-full p-2 bg-green-700 text-white font-bold rounded hover:bg-green-600"
          >
            Update Profile
          </button>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full p-2 rounded bg-gray-800"
            />
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded bg-gray-800"
            />
          </div>

          <div>
            <label className="block mb-1">Wallet</label>
            {publicKey ? (
              <p className="bg-gray-800 p-2 rounded">{publicKey.toBase58()}</p>
            ) : (
              <WalletMultiButton />
            )}
          </div>

          <button
            onClick={handleSettingsSave}
            className="w-full p-2 bg-green-700 text-white font-bold rounded hover:bg-green-600"
          >
            Save Settings
          </button>
        </div>
      )}

      {status && <p className="mt-4 text-green-400">{status}</p>}
    </div>
  );
};

export default DashboardTabs;
