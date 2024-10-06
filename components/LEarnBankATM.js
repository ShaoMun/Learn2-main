'use react'

import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';



const LEarnBankATM = () => {
  const router = useRouter();

  const handleButtonClick = (path) => {
    router.push(path);
  };

  return (
    <div className="container">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&family=Sedan+SC&display=swap" rel="stylesheet" />
      </Head>
      <div className="atm">
      
        <div className="header">LEarn Bank</div>
        <div className="main">
          <div className="side-panel">
            <button className="side-button" onClick={() => handleButtonClick('/withdraw')}></button>
            <button className="side-button" onClick={() => handleButtonClick('/topup')}></button>
            <button className="side-button"></button>
          </div>
          <div className="options">
            <div className="option withdraw" >Withdrawal</div>
            <div className="option topup" >Top Up</div>
            <div className="option cancel">Cancel</div>
          </div>
          <div className="side-panel">
            <button className="side-button"></button>
            <button className="side-button"></button>
            <button className="side-button" onClick={() => router.back()}></button>
          </div>
        </div>
      </div>
      <div className="footer-container">
        <div className="footer">
            <p>Welcome to LEarn Bank</p>
            <p>Please click button to select an option...</p>          
        </div>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background-color: #a9a9a9;
          color: #000;
          font-family: 'Pixelify Sans', 'Courier New', Courier, monospace;
          gap:12px;
        }

        .atm {
          width: 900px;
          height: 390px;
          background-color: #d3d3d3;
          text-align: center;
          position: relative;
          padding-bottom: 20px;
        }

        .header {
          font-size: 42px;
          font-weight: bold;
          margin-bottom: 20px;
          background-color: #4a90e2;
          color: white;
          padding: 10px;
          width: 65%;
          margin-left: 16.5%;
          margin-top: 3%;
        }

        .main {
          display: flex;
          justify-content: center;
          background-color: #d3d3d3;
          gap: 30px;
          height:270px;
        }

        .side-panel {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 10px;
        }

        .side-button {
          width: 33px;
          height: 33px;
          background-color: #555;
          border: none;
          border-radius: 3px;
          cursor: pointer;
          margin: 10px 0;
        }

        .options {
          flex: 0.8;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: flex-start;
          background-color: #f0f0f0;
          padding: 20px;
        }

        .option {
          font-size: 30px;
          margin: 20px 0;
          cursor: pointer;
        }

        .option.withdraw {
          margin-top: 3px;
          cursor: default;
        }

        .option.topup{
            cursor: default;
        }

        .option.cancel {
          align-self: flex-end;
          margin-bottom: 3px;
         cursor: default;
        }

        .footer-container {
          width: 90%;
          background-color: white;
          border-radius: 10px;
          padding-left: 24px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
          text-align: left;
          margin-top: 10px;
        }

        .footer {
          color: black;
          font-size: 30px;
          line-height: 1.4;
          font-family: 'Pixelify Sans', 'Courier New', Courier, monospace;
        }
      `}</style>
    </div>
  );
};

export default LEarnBankATM;