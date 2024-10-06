import React, { createContext, useState, useContext, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';

const WalletContext = createContext();

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const provider = window.solana;
    const storedWalletAddress = localStorage.getItem('walletAddress');
    const storedBalance = localStorage.getItem('walletBalance');

    if (storedWalletAddress) {
      setWalletAddress(storedWalletAddress);
      setBalance(storedBalance ? parseFloat(storedBalance) : null);
      fetchBalance(storedWalletAddress);
    }

    if (provider && provider.isPhantom) {
      setProvider(provider);

      provider.on('connect', (publicKey) => {
        const address = publicKey.toString();
        setWalletAddress(address);
        localStorage.setItem('walletAddress', address);
        fetchBalance(publicKey);
      });

      provider.on('disconnect', () => {
        handleLogout();
      });
    }
  }, []);

  const fetchBalance = async (publicKey) => {
    try {
      const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
      const balance = await connection.getBalance(new PublicKey(publicKey));
      const balanceInSol = balance / 1000000000; // Convert lamports to SOL
      setBalance(balanceInSol);
      localStorage.setItem('walletBalance', balanceInSol.toString());
      console.log('Fetched balance:', balanceInSol);
    } catch (error) {
      console.error('Error fetching balance:', error);
      setBalance(null);
      localStorage.removeItem('walletBalance');
    }
  };

  const handleLogout = () => {
    if (provider) {
      provider.disconnect();
    }
    setWalletAddress(null);
    setBalance(null);
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('walletBalance');
  };

  const connectWallet = async () => {
    if (provider) {
      try {
        await provider.connect();
      } catch (err) {
        console.error('Failed to connect to Phantom wallet:', err);
      }
    } else {
      console.error('Solana wallet provider not found');
    }
  };

  return (
    <WalletContext.Provider value={{ walletAddress, balance, connectWallet, handleLogout, fetchBalance }}>
      {children}
    </WalletContext.Provider>
  );
};