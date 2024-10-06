import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'coins.txt');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Failed to read the coin balance' });
      return;
    }
    res.status(200).json({ balance: parseInt(data, 10) });
  });
}
