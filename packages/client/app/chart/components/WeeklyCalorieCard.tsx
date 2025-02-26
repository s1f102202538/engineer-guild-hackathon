import React from 'react';

interface WeeklyCalorieCardProps {
  weeklyCalories: number[]; // 週間減量カロリーのデータ（例: 日別の数値）
  weeklyTotal: number;      // 週間合計カロリー（例: 1000）
}

const WeeklyCalorieCard: React.FC<WeeklyCalorieCardProps> = ({
  weeklyCalories,
  weeklyTotal
}) => {
  const today = new Date();
  const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];

  return (
    <div className="bg-white rounded-md shadow-md p-4">
      <h2 className="text-lg sm:text-xl font-bold mb-2 text-center">週間減量カロリー</h2>
      <p className="text-gray-500 mb-4 text-center">週間合計約{weeklyTotal}kcal</p>
      <div className="flex flex-col h-48">
        <div className="flex items-end justify-between flex-1">
          {weeklyCalories.map((value, index) => {
            // 最後の要素が今日になるように計算
            const offset = weeklyCalories.length - 1 - index;
            const date = new Date(today);
            date.setDate(today.getDate() - offset);
            const dayLabel = daysOfWeek[date.getDay()];
            return (
              <div key={index} className="flex-1 mx-1 flex flex-col items-center">
                <div
                  className="bg-green-500 w-full"
                  style={{ height: `${value / 10}px` }}
                />
                <span className="mt-2 text-sm">{dayLabel}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeeklyCalorieCard;
