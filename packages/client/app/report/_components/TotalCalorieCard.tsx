import React from 'react';

interface TotalCalorieCardProps {
  totalCalories: number; // 合計摂取カロリーのデータ(例: 数値)
}

const TotalCalorieCard: React.FC<TotalCalorieCardProps> = ({ totalCalories }) => {
  // 7000kcalで1kgの換算で減量したkgを計算
  const lostKg = (totalCalories / 7000).toFixed(2);

  // 例として、チョコレートバー1個あたり約250kcalとする換算
  const chocolateBarCalories = 250;
  // 小数点以下は切り捨てで表示（例: 500kcal → 2個分）
  const chocolateBars = Math.floor(totalCalories / chocolateBarCalories);

  return (
    <div className="bg-white p-4 h-auto w-auto mx-6 my-2 rounded-2xl drop-shadow-xl border-b-2">
      <h2 className="text-xl sm:text-4xl font-bold mb-2 text-center border-b-2">これまでの我慢したカロリー</h2>
      <div className="flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-3xl">約 {totalCalories} kcal</span>
        <span className="text-md mt-2 text-blue-500">約 {lostKg} kg 減量</span>
        <span className="text-sm text-gray-600 mt-2">チョコレートバー {chocolateBars} 個分のカロリーに相当</span>
      </div>
    </div>
  );
};

export default TotalCalorieCard;
