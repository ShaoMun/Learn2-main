import React from 'react';
import TopUp from '../components/TopUp';
import FloatingLoginButton from '../components/FloatingLoginButton';
import FloatingBalance from '../components/FloatingBalance';

const BankPage = () => {
  return (
    <div>
      <FloatingLoginButton />
      <FloatingBalance />
      <TopUp />
    </div>
  );
};

export default BankPage;