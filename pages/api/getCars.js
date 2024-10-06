import { promises as fs } from 'fs';
import path from 'path';

export default async (req, res) => {
  const filePath = path.join(process.cwd(), 'data', 'cars.json');
  const jsonData = await fs.readFile(filePath);
  const cars = JSON.parse(jsonData);
  res.status(200).json(cars);
};
