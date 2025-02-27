import React from 'react';
import './WeeklyCalorieCard.css';

interface WeeklyCalorieCardProps {
  weeklyCalories: number[]; // 日別の減量カロリー（例: [100, 200, 300, …]）
  weeklyTotal: number;      // 週間合計カロリー
}

const WeeklyCalorieCard: React.FC<WeeklyCalorieCardProps> = ({
  weeklyCalories,
  weeklyTotal
}) => {
  const today = new Date();
  const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];

  // 配列の先頭が最も古い日、最後が今日となるように曜日ラベルを生成
  const daysLabels = weeklyCalories.map((_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (weeklyCalories.length - 1 - i));
    return daysOfWeek[date.getDay()];
  });

  // 最大のカロリー値を基準に比率計算を行う
  const maxCalorie = Math.max(...weeklyCalories, 1); // ゼロ除算対策
  const barMaxHeight = 134; // バーの最大高さ（ピクセル）

  return (
    <div className="card">
      <h2 className="card-title">減量カロリー</h2>
      <p className="card-subtitle">週間合計約{weeklyTotal}kcal</p>
      <div className="chart-container">
        {weeklyCalories.map((value, index) => (
          <div key={index} className="bar-container">
            {/* CSS変数 --target-height を使ってバーの高さを指定 */}
            <div
              className="bar"
              style={{ '--target-height': `${(value / maxCalorie) * barMaxHeight}px` } as React.CSSProperties}
            />
            <span className="day-label">{daysLabels[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyCalorieCard;
