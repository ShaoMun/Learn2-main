// File: /pages/api/processWithdrawal.js

import fs from 'fs/promises';
import path from 'path';
import { 
  Connection, 
  PublicKey, 
  Transaction, 
  SystemProgram, 
  Keypair, 
  sendAndConfirmTransaction,
  LAMPORTS_PER_SOL 
} from '@solana/web3.js';

// Generate a new keypair for the game wallet (this will be different each time the server restarts)
const gameWallet = Keypair.generate();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { walletAddress, coinAmount, solAmount } = req.body;

      // Validate input
      if (!walletAddress || !coinAmount || !solAmount) {
        return res.status(400).json({ error: 'Missing required parameters' });
      }

      const filePath = path.join(process.cwd(), 'coins.txt');

      // Read current balance
      let currentBalance = parseInt(await fs.readFile(filePath, 'utf8'), 10);

      // Check if user has enough balance
      if (currentBalance < coinAmount) {
        return res.status(400).json({ error: 'Insufficient coin balance' });
      }

      // Deduct coins from user's balance
      const newBalance = currentBalance - coinAmount;

      // Write new balance back to file
      await fs.writeFile(filePath, newBalance.toString(), 'utf8');

      // Connect to Solana devnet
      const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

      // Fund the game wallet with devnet SOL
      const airdropSignature = await connection.requestAirdrop(
        gameWallet.publicKey,
        5 * LAMPORTS_PER_SOL // Request 2 SOL
      );
      await connection.confirmTransaction(airdropSignature);

      console.log(`Game wallet funded. Address: ${gameWallet.publicKey.toString()}`);

      // Create a new transaction
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: gameWallet.publicKey,
          toPubkey: new PublicKey(walletAddress),
          lamports: Math.floor(solAmount * LAMPORTS_PER_SOL),
        })
      );

      // Sign and send the transaction
      const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [gameWallet] // Signers
      );

      console.log(`Transaction sent: https://explorer.solana.com/tx/${signature}?cluster=devnet`);

      res.status(200).json({ 
        message: 'Withdrawal processed successfully', 
        newCoinBalance: newBalance,
        solTransferred: solAmount,
        transactionSignature: signature
      });
    } catch (error) {
      console.error('Withdrawal processing error:', error);
      res.status(500).json({ error: 'Failed to process withdrawal' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}