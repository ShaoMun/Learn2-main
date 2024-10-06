import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

const Withdrawal = () => {
  const [coinValue, setCoinValue] = useState(3000);
  const [solValue, setSolValue] = useState(3000 / 30000000);
  const [walletAddress, setWalletAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [coinBalance, setCoinBalance] = useState(0);
  const [gameWalletAddress, setGameWalletAddress] = useState(null);
  const router = useRouter();

  const conversionRate = 30000000; // 1 SOL = 30,000,000 in-game coins

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.solana && window.solana.isPhantom) {
        try {
          const response = await window.solana.connect({ onlyIfTrusted: true });
          setWalletAddress(response.publicKey.toString());
          fetchCoinBalance();
        } catch (error) {
          console.error("Wallet auto-connect error:", error);
        }
      }
    };

    checkWalletConnection();
  }, []);

  const fetchCoinBalance = async () => {
    try {
      const response = await fetch('/api/getCoinBalance');
      if (response.ok) {
        const data = await response.json();
        setCoinBalance(data.balance);
      } else {
        console.error('Failed to fetch coin balance');
      }
    } catch (error) {
      console.error('Error fetching coin balance:', error);
    }
  };

  const handleCoinValueChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setCoinValue(value);
    setSolValue(value / conversionRate);
  };

  const handleLogin = async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        const response = await window.solana.connect();
        setWalletAddress(response.publicKey.toString());
        fetchCoinBalance();
      } catch (error) {
        console.error("Wallet connection error:", error);
      }
    } else {
      alert("Phantom wallet is not installed!");
    }
  };

  const handleWithdrawal = async () => {
    if (!walletAddress) {
      alert("Please connect your Phantom wallet first.");
      return;
    }

    if (coinValue > coinBalance) {
      alert("Insufficient coin balance for withdrawal.");
      return;
    }

    setLoading(true);
    try {
      console.log('Initiating withdrawal process...');
      const response = await fetch('/api/processWithdrawal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          walletAddress, 
          coinAmount: coinValue, 
          solAmount: solValue 
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Withdrawal failed');
      }

      // Update the coin balance
      setCoinBalance(result.newCoinBalance);

      setGameWalletAddress(result.gameWalletAddress);

      alert(`Withdrawal successful! ${solValue} SOL has been sent to your wallet. Transaction signature: ${result.transactionSignature}`);
      console.log(`Transaction URL: https://explorer.solana.com/tx/${result.transactionSignature}?cluster=devnet`);
      console.log(`Game wallet address: ${result.gameWalletAddress}`);

      // Refresh the SOL balance in the wallet
      if (window.solana && window.solana.isPhantom) {
        const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
        const publicKey = new PublicKey(walletAddress);
        const newBalance = await connection.getBalance(publicKey);
        console.log(`Updated wallet balance: ${newBalance / LAMPORTS_PER_SOL} SOL`);
        router.reload();
      }

    } catch (error) {
      console.error('Withdrawal error:', error);
      alert(`Withdrawal failed: ${error.message}. Please check the console for more details.`);
    } finally {
      setLoading(false);
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
        <div className="exchangeContainer">
          <div className="field">
            <img src="/coin.png" alt="Coin" className="icon" />
            <input
              type="range"
              min="3000"
              max={coinBalance}
              step="1000"
              value={coinValue}
              onChange={handleCoinValueChange}
              className="slider"
            />
            <input
              type="number"
              value={coinValue}
              onChange={handleCoinValueChange}
              className="input"
              placeholder="0"
              min="3000"
              max={coinBalance}
            />
          </div>
          <span className="arrow">→</span>
          <div className="field sol">
            <img src="/solanaLogo.png" alt="SOL" className="icon" />
            <input
              type="number"
              value={solValue.toFixed(9)}
              readOnly
              className="solInput"
            />
          </div>
        </div>
        <div className="rateAndButtons">
          <div className="rateContainer">
            <div className="rate">Today's Rate<br />30,000,000 : 1 SOL</div>
            <div className="buttons">
              <button className="confirmButton" onClick={handleWithdrawal} disabled={loading}>
                {loading ? 'Processing...' : 'Withdraw'}
              </button>
              <button className="cancelButton" onClick={() => router.back()}>Cancel</button>
            </div>
          </div>
        </div>
        {gameWalletAddress && (
          <div className="gameWalletInfo">
            <p>Game Wallet Address: {gameWalletAddress}</p>
          </div>
        )}
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
        .slider {
          width: 300px;
          margin: 10px 0;
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
        .gameWalletInfo {
          background-color: rgba(255, 255, 255, 0.8);
          padding: 10px;
          border-radius: 5px;
          margin-top: 20px;
        }
      `}</style>
    </>
  );
}

export default Withdrawal;