// pages/bank.js
import React from 'react';
import LEarnBankATM from '../components/LEarnBankATM';
import FloatingLoginButton from '../components/FloatingLoginButton';
import FloatingBalance from '../components/FloatingBalance';

const BankPage = () => {
  return (
    <div>
      <FloatingLoginButton />
      <FloatingBalance />
      <LEarnBankATM />
    </div>
  );
};

export default BankPage;
