import React, { useEffect, useState } from 'react';
import Head from 'next/head';

const FloatingBalance = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    // Fetch the coin balance from the API
    fetch('/api/getCoinBalance')
      .then((response) => response.json())
      .then((data) => setBalance(data.balance))
      .catch((error) => console.error('Error fetching coin balance:', error));
  }, []);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&family=Sedan+SC&display=swap" rel="stylesheet" />
      </Head>
      <div className="balanceContainer">
        <img src="/coin.png" alt="Coin" className="balanceIcon" />
        <span className="balanceText">{balance}</span>
        <style jsx>{`
          .balanceContainer {
            position: absolute;
            top: 20px;
            right: 20px;
            display: flex;
            align-items: center;
            background-color: rgba(255, 255, 255, 0.8);
            padding: 10px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            z-index: 1000;
          }
          .balanceIcon {
            width: 50px;
            height: 50px;
            margin-right: 10px;
          }
          .balanceText {
            font-size: 24px;
            font-weight: bold;
            font-family: 'Pixelify Sans', 'Courier New', Courier, monospace; /* Same font as TopUp */
          }
        `}</style>
      </div>
    </>
  );
};

export default FloatingBalance;
