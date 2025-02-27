'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';

const useClientId = () => {
  const { userId } = useAuth();

  const [clientId, setClientId] = useState<string>('');

  useEffect(() => {
    try {
      if (userId == null) {
        throw new Error('userId is null');
      }

      setClientId(userId);
    } catch (error) {
      console.error('useClientId: ', error);
    }
  }, [userId]);

  return clientId;
};

export default useClientId;
