'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const useClientId = () => {
  const { userId } = useAuth();
  const router = useRouter();
  const [clientId, setClientId] = useState<string>('');

  useEffect(() => {
    if (userId == null) {
      router.push('/sign-in');
      return;
    }

    setClientId(userId);
  }, [userId, router]);

  return clientId;
};

export default useClientId;
