import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import FloatingLoginButton from '../components/FloatingLoginButton';
import FloatingBalance from '../components/FloatingBalance';

const SchoolQuiz = () => {
  const [text, setText] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const router = useRouter();
  const fullText = 'What is the first step in effectively saving money?';
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

  const handleButtonClick = (option) => {
    setSelectedOption(option);
    if (option === 'Setting clear financial goals') {
      setTimeout(() => {
        alert('You got the correct answer! Returning to home.');
        router.push('/game');
      }, 1000); // Delay for 1 second to show the button change
    }
  };

  return (
    <div className="container">
      
      <FloatingBalance />
      <FloatingLoginButton />
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&family=Sedan+SC&display=swap" rel="stylesheet" />
      </Head>
      <div className="question-box">
        <p>{text}</p>
      </div>
      <div className="options">
        <button
          onClick={() => handleButtonClick('Cutting out all discretionary spending')}
          className={selectedOption === 'Cutting out all discretionary spending' ? 'selected' : ''}
        >
          Cutting out all discretionary spending
        </button>
        <button
          onClick={() => handleButtonClick('Setting clear financial goals')}
          className={selectedOption === 'Setting clear financial goals' ? 'selected' : ''}
        >
          Setting clear financial goals
        </button>
        <button
          onClick={() => handleButtonClick('Automating savings transfers')}
          className={selectedOption === 'Automating savings transfers' ? 'selected' : ''}
        >
          Automating savings transfers
        </button>
        <button
          onClick={() => handleButtonClick('Shopping only during sales')}
          className={selectedOption === 'Shopping only during sales' ? 'selected' : ''}
        >
          Shopping only during sales
        </button>
      </div>

      <style jsx>{`
        .container {
          background-image: url('/background2.png');
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
        .question-box {
          background-color: black;
          color: white;
          padding: 30px;
          border-radius: 10px;
          border: 5px solid #fff;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
          font-size: 30px;
          width: 70%;
          height: 40%;
          text-align: center;
          margin-bottom: 20px;
        }

        .options {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          column-gap: 80px;
          row-gap: 20px;
        }
        button {
          background-color: #fff;
          border: 2px solid #333;
          width: 400px;
          height: 90px;
          padding: 10px 20px;
          font-size: 18px;
          cursor: pointer;
          border-radius: 5px;
          transition: background-color 0.3s ease;
          font-family: 'Pixelify Sans', 'Courier New', Courier, monospace;
        }
        button:hover {
          background-color: #f0f0f0;
        }
        .selected {
          background-color: green;
          color: white;
          border-color: green;
        }
        .selected:hover {
          background-color: #4F7942;
        }
      `}</style>
    </div>
  );
};

export default SchoolQuiz;
