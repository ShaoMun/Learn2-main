// pages/callback.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Callback = () => {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const id_token = params.get('id_token');

      if (id_token) {
        try {
          const response = await fetch(`/api/auth/callback?id_token=${id_token}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          localStorage.setItem('zkLoginUserAddress', data.address);
          router.push('/');
        } catch (error) {
          console.error('Error processing callback:', error);
          router.push('/error');
        }
      } else {
        console.error('Missing id_token');
        router.push('/error');
      }
    };

    handleCallback();
  }, [router]);

  return <div>Processing login...</div>;
};

export default Callback;