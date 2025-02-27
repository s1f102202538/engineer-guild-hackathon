'use client';

import React from 'react';
import { UserData } from 'app/services/UserService';
import UserService from 'app/services/UserService';
import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useClientId from 'app/hooks/useClientId';
import EndureCalories from './_components/EndureCalories';
import CheckWeight from './_components/CheckWeight';
import Navbar from '../components/Navbar';
import Comment from './_components/Comment';
import AddEndureCalories from './_components/AddEndureCalories';
import Header from '../components/Header';

export const UserDataContext = createContext<UserData | null>(null);

const Page = () => {
  const clientId = useClientId();
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  // ユーザーデータを取得
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await UserService.GetUserData(clientId);

        if (userData == null) {
          // ユーザーデーがない場合は作成ページにリダイレクト
          router.push('/register');
        }

        setUserData(userData);
      } catch (error) {
        console.error('Page:fetchUserData: ', error);
      }
    };

    fetchUserData();
  });

  return (
    <div>
      <UserDataContext.Provider value={userData}>
        <Header title="home" />
        <div className="w-full mx-auto h-screen bg-beige-100 flex flex-col relative text-black">
          <main className="flex-1 px-4 pt-4 pb-16 space-y-4 overflow-hidden">
            <CheckWeight />
            <EndureCalories />
            <Comment />
            <AddEndureCalories />
          </main>
          <Navbar />
        </div>
      </UserDataContext.Provider>
    </div>
  );
};

export default Page;
