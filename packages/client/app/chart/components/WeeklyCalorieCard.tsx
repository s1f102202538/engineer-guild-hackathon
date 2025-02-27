"use client";
import React, { useState, useEffect, useRef } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import './WeeklyCalorieCard.css';

interface WeeklyCalorieCardProps {
  weeklyCalories: number[]; // 日別の減量カロリー（例: [100, 200, 300, …]）
  weeklyTotal: number;      // 週間合計カロリー
}

const WeeklyCalorieCard: React.FC<WeeklyCalorieCardProps> = ({
  weeklyCalories,
  weeklyTotal,
}) => {
  const today = new Date();
  const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];

  // 選択された期間を管理する state（'week' | 'month' | 'half-year' | 'year'）
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'half-year' | 'year'>('week');

  // 横スクロールするグラフ部分の ref
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 日付ごとのラベルとカロリーを含むデータ配列を生成
  const data = weeklyCalories.map((value, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (weeklyCalories.length - 1 - index));
    return {
      day: daysOfWeek[date.getDay()],
      calorie: value,
    };
  });

  // y 軸の domain 用に最大値を算出
  const maxCalorie = weeklyCalories.length > 0 ? Math.max(...weeklyCalories) : 0;

  // 選択期間に応じた合計カロリーとラベルを計算
  let displayedTotal: number;
  let periodLabel: string;
  if (selectedPeriod === 'week') {
    displayedTotal = weeklyTotal;
    periodLabel = "週間合計約";
  } else if (selectedPeriod === 'month') {
    displayedTotal = weeklyTotal * 4; // 例：1か月は約4週間分
    periodLabel = "月間合計約";
  } else if (selectedPeriod === 'half-year') {
    displayedTotal = weeklyTotal * 26; // 例：半年は約26週間分
    periodLabel = "半年合計約";
  } else {
    displayedTotal = weeklyTotal * 52; // 例：1年は約52週間分
    periodLabel = "年間合計約";
  }

  // 1データあたり12%の横幅になるよう、全体の幅を計算
  const computedChartWidth = `${data.length * 14.75}%`;

  // 8件以上の場合、初期スクロール位置を右端に設定（最新データを表示）
  useEffect(() => {
    if (weeklyCalories.length >= 8 && scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
    }
  }, [weeklyCalories]);

  return (
    <div className="w-full">
      {/* 期間選択ボタン */}
      <div className="flex space-x-6 mb-4">
        <button
          onClick={() => setSelectedPeriod('week')}
          className={`py-1 px-3 rounded-full transition-colors duration-200 ${
            selectedPeriod === 'week' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          1週間
        </button>
        <button
          onClick={() => setSelectedPeriod('month')}
          className={`py-1 px-3 rounded-full transition-colors duration-200 ${
            selectedPeriod === 'month' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          1か月
        </button>
        <button
          onClick={() => setSelectedPeriod('half-year')}
          className={`py-1 px-3 rounded-full transition-colors duration-200 ${
            selectedPeriod === 'half-year' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          半年
        </button>
        <button
          onClick={() => setSelectedPeriod('year')}
          className={`py-1 px-3 rounded-full transition-colors duration-200 ${
            selectedPeriod === 'year' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          1年
        </button>
      </div>
      <h2 className="card-title text-xl font-bold mb-2">我慢したカロリー</h2>
      <p className="card-subtitle mb-4">
        {periodLabel}{displayedTotal}kcal
      </p>

      {/* グラフと y 軸を横並びにする */}
      <div className="flex">
        {/* 横スクロール可能なグラフ部分 */}
        <div
          className="flex-1 overflow-x-auto"
          ref={scrollContainerRef}
        >
          <div style={{ width: computedChartWidth }}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={data}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <Tooltip />
                <Bar dataKey="calorie" fill="#48bb78" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* 数字の表示コンテナ（y 軸部分）の幅を横幅の15%に設定 */}
        <div style={{ width: "13%" }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{ top: 30, right: 0, bottom: 30, left: 0 }}
            >
              <YAxis
                orientation="right"
                tickLine={false}
                axisLine={false}
                domain={[0, maxCalorie]}
                tick={{ fill: '#000' }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default WeeklyCalorieCard;
