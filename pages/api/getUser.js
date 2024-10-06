import { promises as fs } from 'fs';
import path from 'path';

export default async (req, res) => {
  const userId = req.query.id;

  const filePath = path.join(process.cwd(), 'data', 'users.json');
  const jsonData = await fs.readFile(filePath);
  const users = JSON.parse(jsonData);

  const user = users.find(u => u.id == userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(200).json(user);
};
