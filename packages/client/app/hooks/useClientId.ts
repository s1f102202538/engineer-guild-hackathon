'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/router';

const useClientId = () => {
  const { userId } = useAuth();
  const router = useRouter();
  const [clientId, setClientId] = useState<string>('');

  useEffect(() => {
    try {
      if (userId == null) {
        router.push('/login');
        return;
      }

      setClientId(userId);
    } catch (error) {
      console.error('useClientId: ', error);
    }
  }, [userId, router]);

  return clientId;
};

export default useClientId;
