'use client';

import React from 'react';
import { UserData } from 'app/services/UserService';
import UserService from 'app/services/UserService';
import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useClientId from 'app/hooks/useClientId';
import EndureCalories from './_components/EndureCalories';
import CheckWeight from './_components/CheckWeight';
import Navbar from '../components/Navbar';
import Comment from './_components/Comment';
import AddEndureCalories from './_components/AddEndureCalories';
import Header from '../components/Header';

export const UserDataContext = createContext<UserData | null>(null);
export const DailyPatienceCaloriesContext = createContext<number>(0);

const Page = () => {
  const clientId = useClientId();
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [dailyPatienceCalories, setDailyPatienceCalories] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, calories] = await Promise.all([
          UserService.GetUserData(clientId),
          UserService.GetTotalPatienceCalories(clientId),
        ]);

        if (!userData) {
          router.push('/register');
          return;
        }

        setUserData(userData);
        setDailyPatienceCalories(calories);
      } catch (error) {
        console.error('Failed to get data: ', error);
      }
    };

    fetchData();
  }, [clientId, router]);

  return (
    <div>
      <UserDataContext.Provider value={userData}>
        <DailyPatienceCaloriesContext.Provider value={dailyPatienceCalories}>
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
        </DailyPatienceCaloriesContext.Provider>
      </UserDataContext.Provider>
    </div>
  );
};

export default Page;
