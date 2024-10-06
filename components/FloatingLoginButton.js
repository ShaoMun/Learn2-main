import { useWallet } from './WalletContext';
import Head from 'next/head';

export default function FloatingLoginButton({ onLogin }) {
  const { walletAddress, balance, connectWallet, handleLogout } = useWallet();

  return (
    <div>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&family=Sedan+SC&display=swap" rel="stylesheet" />
      </Head>
      {!walletAddress && (
        <button onClick={connectWallet} className="play-button">
          Log In
        </button>
      )}
      {walletAddress && (
        <div className="float-button">
          <img src="/solanaWordMark.png" alt="Logout" />
          <div>
            <p>Wallet Address: {walletAddress}</p>
            <p>Balance: {balance !== null ? `${balance.toFixed(4)} SOL` : 'Loading...'}</p>
          </div>
          <button onClick={handleLogout} className="logout-button">Log Out</button>
        </div>
      )}

<style jsx>{`
        .float-button {
          width: 129px;
          height: 50px;
          border-radius: 12px;
          background: linear-gradient(90deg, #9945FF 0%, #14F195 100%);
          position: fixed;
          top: 20px;
          left: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          padding: 10px;
          transition: all 0.3s ease;
          color: transparent;
          z-index: 1000;
        }
        
        .float-button img {
          margin-top: 85px;
          margin-left: 0px;
        }

        .logout-button{
          background-color: transparent;
          color: transparent;
          border: none;
        }

        .float-button:hover {
          background-color: #87CEEB;
          width: 550px;
          height: auto;
          padding: 20px;
          color: white;
        }

        .float-button p {
          margin: 0;
        }

        .float-button:hover .logout-button {
          background-color: #FF6347;
          color: black;
          font-weight: bold;
          border: none;
          border-radius: 8px;
          padding: 5px 10px;
          cursor: pointer;
          margin-top: 10px;
        }

        .float-button:hover img{
        display: none;
        }

        .logout-button:hover {
          background-color: #FF4500;
        }
      `}</style>
    </div>
  );
}