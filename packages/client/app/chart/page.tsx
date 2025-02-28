import React from 'react';
import TotalCalorieCard from './components/TotalCalorieCard';
import WeeklyCalorieCard from './components/WeeklyCalorieCard';
import ReportSection from './components/ReportSection';
import Navbar from '../components/Navbar';
import Header from '../components/Header';

const HomePage: React.FC = () => {
  // 合計我慢カロリー
  const totalCaloriesData = 2000;
  // 1週間分の日別カロリー（例：7日分）
  const dailyCaloriesData = [
    100, 150, 200, 250, 300, 350, 400, 150, 200, 250, 300, 350, 400, 150, 200, 250, 300, 150, 200, 250, 300, 350, 300,
    150, 200, 250, 300, 350, 400, 350, 400, 300, 150, 200, 250, 300, 350,
  ];
  // 半年分の週間ごとのカロリー（例：26週分）
  const weeklyCaloriesData = [
    100, 150, 200, 250, 300, 350, 400, 150, 200, 250, 300, 350, 400, 150, 200, 250, 300, 150, 200, 250, 300, 350, 300,
    150, 200, 250, 300, 350, 400, 350, 400, 300, 150, 200,
  ];
  // 1年分の月ごとのカロリー（例：12ヶ月分）
  const monthlyCaloriesData = [400, 350, 300, 450, 500, 480, 420, 460, 390, 410, 430, 470];

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
