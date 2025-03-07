'use client';

import React from 'react';
import { UserData } from 'app/services/UserService';
import UserService from 'app/services/UserService';
import DailyPatienceCalorieService from 'app/services/DailyPatienceCalorieService';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useClientId from 'app/hooks/useClientId';
import EndureCalories from './_components/EndureCalories';
import CheckWeight from './_components/CheckWeight';
import Navbar from '../components/Navbar';
import Comment from './_components/Comment';
import AddEndureCalories from './_components/AddEndureCalories';
import Header from '../components/Header';
import Tutorial from 'app/components/Tutorial';
import { CommentContext, DailyPatienceCaloriesContext, UserDataContext } from './_contexts/HomeContext';

const Page = () => {
  const clientId = useClientId();
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [dailyPatienceCalories, setDailyPatienceCalories] = useState<number>(0);
  const [comment, setComment] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await UserService.GetUserData(clientId);

        if (userData == null) {
          router.push('/register');
          return;
        }

        const dailyPatienceCalorie = await DailyPatienceCalorieService.GetTodayCalorieData(clientId);

        setUserData(userData);
        setDailyPatienceCalories(dailyPatienceCalorie.calories);
      } catch (error) {
        console.error('Failed to get data: ', error);
      }
    };

    fetchData();
  }, [clientId, router]);

  const fetchTodayCalorieData = async () => {
    try {
      const dailyPatienceCalorie = await DailyPatienceCalorieService.GetTodayCalorieData(clientId);
      setDailyPatienceCalories(dailyPatienceCalorie.calories);
    } catch (error) {
      console.error('Failed to get today calorie date: ', error);
    }
  };

  const uploadEndureFood = async (food: string) => {
    const response = await DailyPatienceCalorieService.UploadFood(clientId, food);

    setComment(response.message);
  };

  const onUplodaEndureFood = async (food: string) => {
    await uploadEndureFood(food);

    // TODO: 上手く取得できない可能性あり
    // 本日の我慢カロリーを再取得
    await fetchTodayCalorieData();
  };

  return (
    <div className="w-full mx-auto h-screen bg-white flex flex-col relative text-black">
      <Tutorial />

      <UserDataContext.Provider value={userData}>
        <DailyPatienceCaloriesContext.Provider value={dailyPatienceCalories}>
          <CommentContext.Provider value={comment}>
            <Header title="ホーム" />
            <div className="w-full mx-auto h-screen bg-white flex flex-col relative text-black">
              <main className="flex-1 px-4 pt-4 pb-16 space-y-4 overflow-hidden main-content">
                <CheckWeight />
                <EndureCalories />
                <Comment />
                <AddEndureCalories onSubmit={onUplodaEndureFood} />
              </main>
              <Navbar />
            </div>
          </CommentContext.Provider>
        </DailyPatienceCaloriesContext.Provider>
      </UserDataContext.Provider>
    </div>
  );
};

export default Page;
