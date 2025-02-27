// packages/client/app/hooks/useUserInfo.ts
import { useEffect, useState } from 'react';
import axios from 'axios';

export type UserInfo = {
  name: string;
  weight: number;
};

const useUserInfo = (userId: string) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.post<{ userData: UserInfo }>(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/user/get`,
          { clientId: userId }
        );
        setUserInfo(response.data.userData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error('Unknown error occurred'));
        }
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserInfo();
    }
  }, [userId]);

  return { userInfo, loading, error };
};

export default useUserInfo;
