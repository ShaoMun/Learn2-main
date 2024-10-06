import Head from 'next/head';
import FloatingLoginButton from '../components/FloatingLoginButton'; // Import the FloatingLoginButton component
import StartGameButton from '../components/StartGame'; // Import the StartGameButton component
import Image from 'next/image';

const LandingPage = () => {
  return (
    <div className="container">
      <Head>
        <title>Landing Page</title>
        <meta name="description" content="Landing page for the LEarn game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <div className="buttons">
          <FloatingLoginButton />
          <StartGameButton /> 
        </div>
        <div className="logo-container">
          <Image src="/LEarn.png" alt="LEarn Logo" layout="fill" objectFit="cover" className="logo" />
          <Image src="/csy.gif" alt="Additional Image" width={400} height={400} className="additional-image" />
        </div>
      </main>
      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
          height: 100%;
          overflow: hidden;
        }
        .container {
          width: 100vw;
          height: 100vh;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: center;
          background-image: url('/LEarn.png'); /* Updated to use PNG background */
          background-size: 100% 100vh;
          background-position: center;
          background-repeat: no-repeat;
        }
        .main {
          width: 100%;
          padding: 2rem 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .buttons {
          margin-bottom: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .play-button {
          position: fixed;
          bottom: 20%;
          left: 300px;
          width: 300px;
          height: 90px;
          border-radius: 12px;
          background-color: #4CA2FF;
          display: flex;
          flex-direction: column;
          justify-content: center;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          padding: 10px;
          transition: all 0.3s ease;
          color: white;
          z-index: 1000;
          font-family: 'Pixelify Sans', 'Courier New', Courier, monospace;
          font-size: 45px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .button-text {
          font-weight: 700;
        }
        .play-button:hover {
          background-color: #0059c1;
        }
        .logo-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .logo {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .additional-image {
          position: absolute;
          right: -550px; /* Adjust this value as needed */
          top: -250px;
          transform: translateY(-50%);
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
