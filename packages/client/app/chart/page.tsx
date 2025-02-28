import React from 'react';
import TotalCalorieCard from './components/TotalCalorieCard';
import WeeklyCalorieCard from './components/WeeklyCalorieCard';
import ReportSection from './components/ReportSection';
import Navbar from '../components/Navbar';
import Header from '../components/Header';

const HomePage: React.FC = () => {
  // 合計我慢カロリー（この値は各データから算出されるので直接使用しない例）
  const totalCaloriesData = 2000;

  // 1週間分の日別カロリー（例：7日分）
  const dailyCaloriesData = [220, 180, 200, 250, 210, 190, 230];

  // 半年分の週間ごとのカロリー（例：26週分）
  const weeklyCaloriesData = [
    3000, 4500, 6000, 7500, 9000, 10500, 12000, 4500, 6000, 7500, 9000, 10500, 12000, 4500, 6000, 7500, 9000, 4500,
    6000, 7500, 9000, 10500, 9000, 4500, 6000, 7500, 9000, 10500, 12000, 10500, 12000, 9000, 4500, 6000,
  ];

  // 1年分の月ごとのカロリー（例：12ヶ月分）
  const monthlyCaloriesData = [12000, 15500, 29000, 13500, 15000, 14400, 22600, 13800, 11700, 22300, 22900, 14100];

  return (
    <div>
      <Header title={'レポート'} />
      <div className="min-h-screen">
        <div className="mx-auto">
          {/* 合計我慢カロリーカード */}
          <TotalCalorieCard totalCalories={totalCaloriesData} />
          {/* 週間減量カロリーカード */}
          <WeeklyCalorieCard
            dailyCalories={dailyCaloriesData}
            weeklyCalories={weeklyCaloriesData}
            monthlyCalories={monthlyCaloriesData}
          />

          {/* レポートセクション */}
          <ReportSection />

          {/* Navbar */}
          <Navbar />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
