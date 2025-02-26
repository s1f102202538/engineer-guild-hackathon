import { useEffect, useState } from 'react';
import axios from 'axios';

type UserInfo = {
  name: string;
};

const useUserInfo = (userId: string) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // user/get
    const fetchUserInfo = async () => {
      try {
        const response = await axios.post<{ name: string }>('user/get', { clientId: userId });
        setUserInfo(response.data);
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
