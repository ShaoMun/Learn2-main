import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { deductedCoins } = req.body;
    const filePath = path.join(process.cwd(), 'coins.txt');

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Failed to read the coin balance:', err);
        res.status(500).json({ error: 'Failed to read the coin balance' });
        return;
      }
      const currentBalance = parseInt(data, 10);
      if (currentBalance < deductedCoins) {
        res.status(400).json({ error: 'Insufficient balance' });
        return;
      }
      const newBalance = currentBalance - deductedCoins;

      fs.writeFile(filePath, newBalance.toString(), (err) => {
        if (err) {
          console.error('Failed to update the coin balance:', err);
          res.status(500).json({ error: 'Failed to update the coin balance' });
          return;
        }
        res.status(200).json({ balance: newBalance });
      });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
