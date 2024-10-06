// components/MintNFT.js
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { SuiClient } from '@mysten/sui.js/client';

const MNEMONIC = 'wild spoon era outer apart slide maximum trouble photo observe cigar arrow';
const DERIVATION_PATH = `m/44'/784'/0'/0'/0'`;

const MintNFT = async (userAddress, setStatus, setIsLoading) => {
  setIsLoading(true);
  setStatus('Initiating minting...');

  try {
    const keypair = Ed25519Keypair.deriveKeypair(MNEMONIC, DERIVATION_PATH);
    const client = new SuiClient({ url: 'https://fullnode.testnet.sui.io:443' });

    const tx = new TransactionBlock();
    const packageId = '0x6e9fa7a6a6dabe2ba04f512b456ee198b7e1353772193a71973309392ce645f7';
    const module = 'sui_nft';
    const function_ = 'mint';
    const args = ['Porsche', 'This is a Porsche', 'https://drive.google.com/uc?export=download&id=1ptqQF6b-h9vcU_Eb20sBFOlJq3ToZ5He', userAddress];

    tx.moveCall({
      target: `${packageId}::${module}::${function_}`,
      arguments: args.map(arg => tx.pure(arg)),
      gasBudget: 1000000,
    });

    const result = await client.signAndExecuteTransactionBlock({
      signer: keypair,
      transactionBlock: tx,
    });

    setStatus(`Minting successful! Transaction digest: ${result.digest}`);
    alert(`Minting successful! Transaction digest: ${result.digest}`);
    console.log('Transaction result:', result);
    console.log('Sender address:', keypair.getPublicKey().toSuiAddress());
  } catch (error) {
    console.error('Minting error:', error);
    setStatus(`Minting failed: ${error.message}`);
    alert(`Minting failed: ${error.message}`);
  } finally {
    setIsLoading(false);
  }
};

export default MintNFT;
