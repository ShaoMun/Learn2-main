import React from 'react';
import Withdrawal from '../components/Withdraw';
import FloatingLoginButton from '../components/FloatingLoginButton';
import FloatingBalance from '../components/FloatingBalance';

const BankPage = () => {
  return (
    <div>
      <FloatingLoginButton />
      <FloatingBalance />
      <Withdrawal />
    </div>
  );
};

export default BankPage;