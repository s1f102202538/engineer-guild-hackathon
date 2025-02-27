import React from 'react';

interface TotalCalorieCardProps {
  totalCalories: number; // 合計摂取カロリーのデータ(例: 数値)
}

const TotalCalorieCard: React.FC<TotalCalorieCardProps> = ({ totalCalories }) => {
  return (
    <div className="bg-white rounded-md shadow-md p-4 h-[20vh] w-full">
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">これまでの摂取カロリー</h2>
      <div className="flex items-center justify-center">
        <span className="text-lg font-medium">{totalCalories} kcal</span>
      </div>
    </div>
  );
};

export default TotalCalorieCard;
