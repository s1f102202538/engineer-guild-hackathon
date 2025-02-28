import React, { useContext } from 'react';
import { DailyPatienceCaloriesContext } from '../_contexts/HomeContext';

const EndureCalories = () => {
  const dailyPatienceCalories = useContext(DailyPatienceCaloriesContext);

  return (
    <div className="endure-calories">
      <div className="bg-green-600 rounded-[24px] drop-shadow-lg p-4 py-10">
        <h2 className="text-xl font-bold mb-2 text-white">今日の我慢カロリー</h2>
        <p className="text-6xl font-bold text-center py-2 text-white">{`${dailyPatienceCalories}`} kcal</p>
      </div>
    </div>
  );
};

export default EndureCalories;
