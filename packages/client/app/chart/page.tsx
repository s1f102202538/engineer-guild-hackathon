import React from 'react';
import TotalCalorieCard from './components/TotalCalorieCard';
import WeeklyCalorieCard from './components/WeeklyCalorieCard';
import ReportSection from './components/ReportSection';
import Navbar from '../components/Navbar';
import Header from '../components/Header';

const HomePage: React.FC = () => {
  // 例としてのダミーデータ
  const totalCaloriesData = 2000;
  const weeklyCaloriesData = [300, 200, 400, 150, 350, 100, 200];
  const weeklyTotal = 1000; // 週間合計カロリーの例

  return (
    <div>
      <Header title={'レポート'} />
      <div className="min-h-screen bg-beige-100 py-2">
        <div className="max-w-md mx-auto space-y-4">
          {/* 合計我慢カロリーカード */}
          <TotalCalorieCard totalCalories={totalCaloriesData} />
          {/* 週間減量カロリーカード */}
          <WeeklyCalorieCard weeklyCalories={weeklyCaloriesData} weeklyTotal={weeklyTotal} />

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
