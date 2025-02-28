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
    1500, 1600, 1550, 1700, 1650, 1600, 1580, 1620, 1650, 1700, 1750, 1720, 1680, 1600, 1580, 1620, 1660, 1690, 1720,
    1740, 1700, 1680, 1650, 1630, 1600, 1580,
  ];

  // 1年分の月ごとのカロリー（例：12ヶ月分）
  const monthlyCaloriesData = [6000, 6200, 6100, 6300, 6400, 6500, 6300, 6200, 6100, 6000, 5900, 5800];

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
