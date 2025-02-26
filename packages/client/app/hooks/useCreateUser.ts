'use client';

import { useEffect } from 'react';
import axios from 'axios';

const useCreateUser = (userId: string | null) => {
  useEffect(() => {
    const checkAndCreateUser = async () => {
      if (userId) {
        try {
          // ユーザーの存在確認
          const response = await axios.post("http://localhost:8000/get", { clientId: userId });
          const { user } = response.data;

          if (!user) {
            // ユーザーが存在しない場合、新規作成
            await axios.post("http://localhost:8000/create", { clientId: userId, name: '名無し', weight: 0 });
            console.log('User created');
          } else {
            console.log('User already exists');
          }
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            console.error('Axios Error:', error.message);
          } else {
            console.error('Unexpected Error:', error);
          }
        }
      }
    };

    checkAndCreateUser();
  }, [userId]);
};

export default useCreateUser;
