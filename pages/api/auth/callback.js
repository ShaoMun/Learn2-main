import { jwtDecode } from 'jwt-decode';
import { generateRandomness, getExtendedEphemeralPublicKey, jwtToAddress } from '@mysten/zklogin';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';

// This should be replaced with a database in a production environment
const userSalts = new Map();

export default async function handler(req, res) {
  const { id_token } = req.query;

  if (!id_token) {
    return res.status(400).json({ error: 'Missing id_token' });
  }

  try {
    const decodedJwt = jwtDecode(id_token);
    const userKey = decodedJwt.sub; // or use email if preferred

    let userSalt = userSalts.get(userKey);
    if (!userSalt) {
      userSalt = generateRandomness().toString();
      userSalts.set(userKey, userSalt);
    }

    const zkLoginUserAddress = jwtToAddress(id_token, userSalt);

    const ephemeralKeyPair = new Ed25519Keypair();
    const extendedEphemeralPublicKey = getExtendedEphemeralPublicKey(ephemeralKeyPair.getPublicKey());

    res.status(200).json({ 
      address: zkLoginUserAddress,
      ephemeralPublicKey: ephemeralKeyPair.getPublicKey().toBase64(),
    });
  } catch (error) {
    console.error('Error processing zkLogin:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}