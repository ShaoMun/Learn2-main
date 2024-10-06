import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import FloatingLoginButton from '../components/FloatingLoginButton';
import FloatingBalance from '../components/FloatingBalance';

export default function Simulation() {
  const router = useRouter();

  useEffect(() => {
    const handleKeyPress = async (event) => {
      if (event.key === 'L' || event.key === 'l') {
        alert("Congratulations! You've earned 500 coins in this trade.");
        await updateBalance(500);
        router.push('/game'); // Reload the page to update the balance
      } else if (event.key === 'R' || event.key === 'r') {
        alert("Oops! You've lost 500 coins in this trade.");
        await updateBalance(-500);
        router.push('/game'); // Reload the page to update the balance
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [router]);

  const updateBalance = async (amount) => {
    try {
      const response = await fetch('/api/updateCoinBalance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ additionalCoins: amount }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('New balance:', data.balance); // Optional: for debugging
      } else {
        const error = await response.json();
        alert(`Failed to update balance: ${error.message}`);
      }
    } catch (error) {
      console.error('Error updating balance:', error);
    }
  };

  return (
    <div className="container">
      <FloatingBalance />
      <FloatingLoginButton />
      <Head>
        <title>Trade Decision</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&family=Sedan+SC&display=swap" rel="stylesheet" />
      </Head>

      <div className="header">
        You have 5000 coins to invest in the stocks below. Check out the trends from the previous week and decide which stock to invest in. Choose wisely!
      </div>

      <div className="box-container">
        <div className="box">
          <img src="/bull.png" alt="Green Box Image" />
        </div>
        <div className="box">
          <img src="/bear.png" alt="Red Box Image" />
        </div>
      </div>

      <div className="footer">
        <p>Press [L] to choose left path</p>
        <p>Press [R] to choose right path</p>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-family: 'Pixelify Sans', sans-serif;
          align-items: center;
          height: 97vh;
          background-image: url('/road.png');
          background-size: cover;   
          background-position: center;
        }
        .header, .footer {
          background-color: lightgray;
          border: 1px solid gray;
          box-sizing: border-box;
        }
        .header {
          margin-top: 20px;
          font-size: 25px;
          text-align: center;
          padding: 30px 0px 30px 0px;
          max-width: 70%;
        }
        .footer {
          font-size: 25px;
          text-align: left;
          width: 80%;
          padding-left: 16px;
        }
        .box-container {
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 55%;
          padding: 20px 0;
          box-sizing: border-box;
        }
        .box {
          width: 200px;
          height: 200px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid #ccc;
        }
        img {
          max-width: 100%;
          max-height: 100%;
          border: 10px solid #ccc;
        }
      `}</style>
    </div>
  );
}
