import React, { useEffect, useState } from 'react';

const Wall = ({ userId }) => {
  const [purchasedCars, setPurchasedCars] = useState([]);

  useEffect(() => {
    // Fetch the user's purchased cars from the API
    fetch(`/api/getUser?id=${userId}`)
      .then((response) => response.json())
      .then((data) => setPurchasedCars(data.purchasedCars))
      .catch((error) => console.error('Error fetching user data:', error));
  }, [userId]);

  return (
    <div className="wall-container">
      {purchasedCars.length > 0 ? (
        purchasedCars.map((car, index) => (
          <div key={index} className="car-item">
            <img src={car.imageUrl} alt={car.name} className="car-image" />
            <div className="car-name">{car.name}</div>
          </div>
        ))
      ) : (
        <div>No NFTs purchased yet.</div>
      )}

      <style jsx>{`
        .wall-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
          padding: 20px;
          background-color: rgba(255, 255, 255, 0.8);
          min-height: 10vh;
          border-radius: 15px;
        }
        .car-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: white;
          padding: 10px;
          border-radius: 10px;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
          max-width: 200px;
        }
        .car-image {
          width: 100%;
          height: auto;
          border-radius: 10px;
        }
        .car-name {
          margin-top: 10px;
          font-size: 18px;
          font-weight: bold;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default Wall;
