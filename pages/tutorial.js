// pages/school-tutorial.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import FloatingLoginButton from '../components/FloatingLoginButton';
import FloatingBalance from '../components/FloatingBalance';

const SchoolTutorial = () => {
  const router = useRouter();
  const [text, setText] = useState('');
  const fullText = 'To save money, set clear goals, create a budget, and cut unnecessary expenses. Automate savings, build an emergency fund, shop smartly, and pay off high-interest debt. Regularly review and adjust your budget to stay on track.';
  const typingSpeed = 10;

  useEffect(() => {
    let currentIndex = 0;

    const type = () => {
      if (currentIndex < fullText.length) {
        setText((prevText) => prevText + fullText.charAt(currentIndex));
        currentIndex++;
        setTimeout(type, typingSpeed);
      }
    };

    type();
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      router.push('/quiz'); // Redirect to the quiz page
    }
  };

  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, []);

  const fetchLearningContent = async () => {
    try {
      const res = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'generateLearningContent' }),
      });

      const data = await res.json();
      if (res.ok) {
        const messageData = JSON.parse(data.message);
        console.log('Generated Content:', messageData);
      } else {
        alert('Failed to load learning content');
      }
    } catch (error) {
      console.error('Error fetching learning content:', error);
    }
  };

  useEffect(() => {
    fetchLearningContent();
  }, []);

  return (
    <div className="container">
      <FloatingLoginButton />
      <FloatingBalance />
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&family=Sedan+SC&display=swap" rel="stylesheet" />
      </Head>
      <div className="blackboard">
        <p className="typed-text">{text}</p>
      </div>
      <div className="footer-container">
        <div className="footer">
          <p>Study the material</p>
          <p>There will be a quiz following...</p>
        </div>
      </div>

      <style jsx>{`
        .container {
          background-image: url('/background1.png');
          background-size: cover;
          background-position: center;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0 20px;
        }
        .blackboard {
          background-image: url('/blackboard.png');
          background-size: fit;
          background-position: center;
          width: 50%;
          height: 400px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-family: 'Pixelify Sans', 'Courier New', Courier, monospace;
          font-size: 27px;
          padding: 20px;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
          margin-bottom: 20px;
          text-align: center;
          border-radius: 10px;
          border: 2px solid #444;
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
        .typed-text {
          width: 100%;
          word-break: break-word;
        }
      `}</style>
    </div>
  );
};

export default SchoolTutorial;
