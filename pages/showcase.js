import React from 'react';
import Head from 'next/head';
import Wall from '../components/Wall';

const Showcase = () => {
  const userId = 1;  // Assuming user ID is 1 for this example

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&family=Sedan+SC&display=swap" rel="stylesheet" />
        <title>Showcase</title>
        <meta name="description" content="Showcase your purchased NFTs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <div className="header">
          <h1>Your NFT Showcase</h1>
          <p>Explore your unique collection</p>
        </div>
        <Wall userId={userId} />
      </div>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background-image: url('bg.png');
          min-height: 90vh;
          color: white;
        }

        .header {
          text-align: center;
          margin-bottom: 20px;
          background-color: rgba(0, 0, 0, 0.8);
          padding: 20px;
          border-radius: 10px;
        }

        h1 {
          font-size: 3em;
          margin: 0;
          font-family: 'Pixelify Sans', sans-serif;
        }

        p {
          font-size: 1.2em;
          margin: 0;
          font-family: 'Pixelify Sans', sans-serif;
        }

        .wall-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
          padding: 20px;
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 15px;
        }

        .wall-item {
          width: 200px;
          height: 300px;
          background-color: #fff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .wall-item:hover {
          transform: scale(1.05);
          box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.4);
        }

        .wall-item img {
          width: 100%;
          height: auto;
        }

        .wall-item .info {
          padding: 10px;
          text-align: center;
          font-family: 'Pixelify Sans', sans-serif;
        }

        .info h2 {
          font-size: 1.2em;
          margin: 10px 0 5px 0;
        }

        .info p {
          font-size: 1em;
          margin: 0;
        }
      `}</style>
    </>
  );
};

export default Showcase;
