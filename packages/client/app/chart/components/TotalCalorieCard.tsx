import React from 'react';

interface TotalCalorieCardProps {
  totalCalories: number; // 合計摂取カロリーのデータ(例: 数値)
}

const TotalCalorieCard: React.FC<TotalCalorieCardProps> = ({ totalCalories }) => {
  // 7000kcalで1kgの換算で減量したkgを計算
  const lostKg = (totalCalories / 7000).toFixed(2);

  return (
    <div className="bg-white p-4 h-[20vh] w-full">
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">これまでの我慢したカロリー</h2>
      <div className="flex flex-col items-center justify-center">
        <span className="text-lg font-medium">{totalCalories} kcal</span>
        <span className="text-md text-gray-600 mt-2">約 {lostKg} kg 減量</span>
      </div>
    </div>
  );
};

export default TotalCalorieCard;
