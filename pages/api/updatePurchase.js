import { promises as fs } from 'fs';
import path from 'path';

export default async (req, res) => {
  const { carId, userId } = req.body;

  // Load car data
  const carsPath = path.join(process.cwd(), 'data', 'cars.json');
  const carsData = await fs.readFile(carsPath);
  const cars = JSON.parse(carsData);

  // Load user data
  const usersPath = path.join(process.cwd(), 'data', 'users.json');
  const usersData = await fs.readFile(usersPath);
  const users = JSON.parse(usersData);

  // Find the car and user
  const car = cars.find(c => c.id === carId);
  const user = users.find(u => u.id === userId);

  if (!car || !user || !car.available) {
    return res.status(400).json({ error: 'Purchase failed' });
  }

  // Update car availability and user purchases
  car.available = false;
  user.purchasedCars.push(car);

  // Save the updated data
  await fs.writeFile(carsPath, JSON.stringify(cars, null, 2));
  await fs.writeFile(usersPath, JSON.stringify(users, null, 2));

  res.status(200).json({ purchasedCars: user.purchasedCars });
};
