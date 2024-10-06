import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import FloatingBalance from '../components/FloatingBalance';
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useWallet } from './WalletContext';

const TopUp = () => {
  const [coinValue, setCoinValue] = useState(0);
  const [solValue, setSolValue] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const conversionRate = 30000000; // 1 SOL = 30,000,000 in-game coins
  const burnAddress = new PublicKey('62KxdkaQxddMKwrML2AQka13jgZ6ieVTTWpRWS3itch8'); // Replace with your actual burn address

  const { walletAddress, balance, fetchBalance } = useWallet();

  useEffect(() => {
    if (walletAddress) {
      fetchBalance(walletAddress);
    }
  }, [walletAddress]);

  const handleSolValueChange = (e) => {
    const value = e.target.value;
    setSolValue(value);
    setCoinValue(Math.floor(value * conversionRate));
  };

  const handleTopUp = async () => {
    if (!walletAddress) {
      console.error('Wallet not connected');
      alert('Please connect your wallet first.');
      return;
    }

    const solAmount = parseFloat(solValue);
    console.log("SOL amount for top-up:", solAmount);
    console.log("Current Wallet Balance (SOL):", balance);

    if (solAmount > balance) {
      console.error('Insufficient balance');
      alert('Insufficient balance in wallet. Please try again with a lower amount.');
      return;
    }

    try {
      setLoading(true);
      console.log('Starting top-up process...');

      const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
      console.log('Connected to Solana network');

      // Create a new transaction
      let transaction = new Transaction();

      // Create an instruction to transfer SOL to the burn address
      const burnInstruction = SystemProgram.transfer({
        fromPubkey: new PublicKey(walletAddress),
        toPubkey: burnAddress,
        lamports: Math.floor(solAmount * LAMPORTS_PER_SOL),
      });

      transaction.add(burnInstruction);

      // Get a recent blockhash
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = new PublicKey(walletAddress);

      console.log('Transaction created with recent blockhash');

      // Sign and send the transaction
      console.log('Requesting wallet to sign and send transaction...');
      const { signature } = await window.solana.signAndSendTransaction(transaction);
      console.log('Transaction signed and sent. Signature:', signature);

      console.log('Confirming transaction...');
      await connection.confirmTransaction(signature, 'confirmed');
      console.log('Transaction confirmed');

      console.log('Updating coin balance...');
      const response = await fetch('/api/updateCoinBalance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ additionalCoins: coinValue }),
      });

      if (response.ok) {
        console.log('Coin balance updated successfully');
        alert('Top-up successful! Coins added to your account.');
        await fetchBalance(walletAddress);  // Refresh balance after top-up
        console.log('Wallet balance refreshed');
        router.reload();
      } else {
        console.error('Failed to update coin balance. Server response:', await response.text());
        alert('Top-up failed. Please try again.');
      }
    } catch (error) {
      console.error('Top-up error:', error);
      if (error.message) {
        console.error('Error message:', error.message);
      }
      if (error.stack) {
        console.error('Error stack:', error.stack);
      }
      alert(`Error during top-up process: ${error.message}. Please try again.`);
    } finally {
      setLoading(false);
      console.log('Top-up process completed');
    }
  };

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&family=Sedan+SC&display=swap" rel="stylesheet" />
      </Head>
      <div className="container">
        <FloatingBalance />
        <div className="exchangeContainer">
          <div className="field sol">
            <img
              src="/solanaLogo.png"
              alt="Sol"
              className="icon"
            />
            <input
              type="number"
              value={solValue}
              onChange={handleSolValueChange}
              className="solInput"
              placeholder="0"
            />
          </div>
          <span className="arrow">→</span>
          <div className="field">
            <img
              src="/coin.png"
              alt="Coin"
              className="icon"
            />
            <input
              type="number"
              value={coinValue}
              readOnly
              className="input"
            />
          </div>
        </div>
        <div className="rateAndButtons">
          <div className="rateContainer">
            <div className="rate">Today's Rate<br />1 SOL : 30,000,000</div>
            <div className="buttons">
              <button className="confirmButton" onClick={handleTopUp} disabled={loading}>
                {loading ? 'Processing...' : 'Top Up'}
              </button>
              <button className="cancelButton" onClick={() => router.back()}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          background-image: url('/background2.jpg');
          background-color: brown;
          background-size: cover;
          background-position: center;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 30px;
          padding: 20px;
          font-family: 'Pixelify Sans', 'Courier New', Courier, monospace;
        }
        .exchangeContainer {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
        }
        .field {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 10px;
          width: 420px;
          height: 420px;
          background-color: #FFFFED;
          border-radius: 6px;
        }
        .icon {
          width: 300px;
          height: 300px;
          margin-right: 10px;
          margin-top: 20px;
          margin-bottom: 20px;
        }
        .input {
          width: 205px;
          padding: 3px 10px;
          font-size: 30px;
          text-align: center;
        }
        .solInput {
          width: 205px;
          padding: 5px;
          font-size: 30px;
          text-align: center;
          border: none;
          background: transparent;
        }
        .arrow {
          font-size: 200px;
          color: white;
          margin: 0 30px;
        }
        .rateAndButtons {
          display: flex;
          justify-content: center;
          width: 100%;
        }
        .rateContainer {
          background-color: white;
          padding: 21px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          border-radius: 5px;
        }
        .rate {
          color: black;
          flex: 1;
          text-align: left;
          font-size: 30px;
        }
        .buttons {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .confirmButton, .cancelButton {
          padding: 10px;
          font-size: 21px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          width: 210px;
          font-family: 'Pixelify Sans', 'Sedan SC', 'Courier New', Courier, monospace;
        }
        .confirmButton {
          background-color: green;
          color: white;
        }
        .cancelButton {
          background-color: red;
          color: white;
        }
      `}</style>
    </>
  );
};

export default TopUp;