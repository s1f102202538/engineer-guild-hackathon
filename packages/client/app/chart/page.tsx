import React from 'react';
import TotalCalorieCard from './components/TotalCalorieCard';
import WeeklyCalorieCard from './components/WeeklyCalorieCard';
import ReportSection from './components/ReportSection';
import Navbar from '../components/Navbar';

const HomePage: React.FC = () => {
  // 例としてのダミーデータ
  const totalCaloriesData = 2000;
  const weeklyCaloriesData = [300, 200, 400, 150, 350, 100, 200];
  const weeklyTotal = 1000; // 週間合計カロリーの例

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-md mx-auto space-y-4">
        {/* 合計我慢カロリーカード */}
        <TotalCalorieCard totalCalories={totalCaloriesData} />
        {/* 週間減量カロリーカード */}
        <WeeklyCalorieCard
          weeklyCalories={weeklyCaloriesData}
          weeklyTotal={weeklyTotal}
        />

        {/* レポートセクション */}
        <ReportSection />

        {/* Navbar */}
        <Navbar />

      </div>
    </div>
  );
};

export default HomePage;
