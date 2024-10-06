// pages/shop.js
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import MintNFT from '../components/MintNFT';

const Shop = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [purchasedCars, setPurchasedCars] = useState([]);
  const [userId, setUserId] = useState(1);  // Assuming user ID is 1 for this example
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/getCars')
      .then(response => response.json())
      .then(data => {
        setCars(data);
        setSelectedCar(data.find(car => car.available));
      })
      .catch(error => console.error('Error fetching car data:', error));

    fetch(`/api/getUser?id=${userId}`)
      .then(response => response.json())
      .then(data => setPurchasedCars(data.purchasedCars))
      .catch(error => console.error('Error fetching user data:', error));
  }, [userId]);

  const handlePurchase = async () => {
    if (!selectedCar) {
      alert('No car selected.');
      return;
    }

    const response = await fetch('/api/updatePurchase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ carId: selectedCar.id, userId }),
    });

    if (response.ok) {
      const data = await response.json();
      setPurchasedCars(data.purchasedCars);

      // Deduct the car price from the user's balance
      await updateBalance(-selectedCar.price);


      // Mint NFT for the user
      const userAddress = localStorage.getItem('zkLoginUserAddress');
      if (userAddress) {
        await MintNFT(userAddress, setStatus, setIsLoading);
      } else {
        console.error('No zkLogin user address found.');
      }

      router.reload();  // Reload the page to update the car list
    } else {
      const result = await response.json();
      alert(`Purchase failed: ${result.error}`);
    }
  };

  const updateBalance = async (amount) => {
    try {
      const response = await fetch('/api/updateCoinBalanceForWithdrawal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deductedCoins: Math.abs(amount) }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Failed to update balance: ${error.message}`);
      }
    } catch (error) {
      console.error('Error updating balance:', error);
    }
  };

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&family=Sedan+SC&display=swap" rel="stylesheet" />
      </Head>
      <style jsx>{`
        .shop-container {
          display: flex;
          background-color: #daa520;
          padding: 20px;
          border-radius: 10px;
          justify-content: center;
          align-items: center;
          font-family: 'Pixelify Sans', sans-serif;
          height: 90vh;
          position: relative;
        }

        .car-image-container {
          width: 45%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
        }

        .car-image {
          width: 80%;
          height: 200px;
          object-fit: cover;
          border-radius: 10px;
        }

        .purchase-button {
          display: block;
          width: 54%;
          padding: 10px;
          margin-top: 10px;
          background-color: #2e8b57;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 24px;
          font-family: 'Pixelify Sans', sans-serif;
        }

        .purchase-button:hover {
          background-color: #379B63;
        }

        .message {
          background-color: white;
          color: black;
          padding: 10px;
          border-radius: 15px;
          margin-top: 60px;
          text-align: center;
          font-family: 'Pixelify Sans', sans-serif;
          font-size: 30px;
          height: 120px;
          margin-right: 20px;
        }

        .car-list {
          width: 30%;
          background-color: brown;
          padding: 24px;
          height: 70%;
          overflow-y: auto;
          border-radius: 10px;
          scrollbar-width: none;
        }

        .car-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #ffffe0;
          padding: 10px;
          cursor: pointer;
          font-size: 30px;
          border-radius: 5px;
          margin-bottom: 5px;
        }

        .car-item:nth-child(even) {
          background-color: brown;
          color: #ffffe0;
        }

        .car-item:hover {
          background-color: #f0e68c; /* Light Khaki for hover effect */
        }

        .car-item:nth-child(even):hover {
          background-color: #6C2819;
        }

        .car-item-name {
          flex: 1;
          text-align: left;
          padding-right: 10px;
        }

        .car-item-price {
          flex: 0 0 auto;
          text-align: right;
          white-space: nowrap;
        }

        .sold-out {
          text-decoration: line-through;
          cursor: not-allowed;
          color: red;
        }
      `}</style>
      <div className="shop-container">
        <div className="car-image-container">
          {selectedCar ? (
            <>
              <img
                src={selectedCar.imageUrl}
                alt={selectedCar.name}
                className="car-image"
              />
              <button className="purchase-button" onClick={handlePurchase}>Purchase</button>
              <div className="message">
                Make your favourite car in your collection...
              </div>
            </>
          ) : (
            <div>No car available for purchase</div>
          )}
        </div>
        <div className="car-list">
          {cars.map((car, index) => (
            <div
              key={index}
              className={`car-item ${!car.available ? 'sold-out' : ''}`}
              onClick={() => car.available && setSelectedCar(car)}
            >
              <div className="car-item-name">
                {index + 1}. {car.name}
              </div>
              <div className="car-item-price">
                ${car.price}
              </div>
            </div>
          ))}
        </div>
      </div>
      {status && <p>{status}</p>}
    </>
  );
};

export default Shop;
