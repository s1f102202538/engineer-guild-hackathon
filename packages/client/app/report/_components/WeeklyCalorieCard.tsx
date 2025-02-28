'use client';
import React, { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './WeeklyCalorieCard.css';
import useClientId from 'app/hooks/useClientId';
import DailyPatienceCalorieService, { TimeUnit, CalorieDataStatistics } from 'app/services/DailyPatienceCalorieService';

const formatDate = (date: Date): string => {
  const mm = (date.getMonth() + 1).toString().padStart(2, '0');
  const dd = date.getDate().toString().padStart(2, '0');
  return `${mm}/${dd}`;
};

const WeeklyCalorieCard: React.FC = () => {
  const clientId = useClientId();
  const day_time_unit: TimeUnit = 'day';
  const [calorieData, setCalorieData] = useState<CalorieDataStatistics | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'half-year' | 'year'>('week');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const today = new Date();

  // clientId が取得できたときに API からデータを取得する
  useEffect(() => {
    if (!clientId) return; // clientId がまだ取得されていない場合は何もしない

    console.log('userId', clientId);
    const fetchData = async () => {
      try {
        const calorieLogs = await DailyPatienceCalorieService.GetCalorieDataStatistics(clientId, day_time_unit);
        setCalorieData(calorieLogs);
        console.log('calorieLogs', calorieLogs);
      } catch (error) {
        console.error('APIからのデータ取得に失敗しました', error);
      }
    };
    fetchData();
  }, [clientId]); // clientId を依存配列に追加

  if (!calorieData) {
    return <div>Loading...</div>;
  }

  let data: { day: string; calorie: number }[] = [];
  if (selectedPeriod === 'week') {
    data = calorieData.dailyCalories.map((value, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (calorieData.dailyCalories.length - 1 - index));
      return { day: formatDate(date), calorie: value };
    });
  } else if (selectedPeriod === 'month') {
    data = calorieData.dailyCalories.map((value, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (calorieData.dailyCalories.length - 1 - index));
      return { day: formatDate(date), calorie: value };
    });
  } else if (selectedPeriod === 'half-year') {
    data = calorieData.weeklyCalories.map((value, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (calorieData.weeklyCalories.length - 1 - index) * 7);
      return { day: formatDate(date), calorie: value };
    });
  } else if (selectedPeriod === 'year') {
    data = calorieData.monthlyCalories.map((value, index) => {
      const date = new Date(today);
      date.setMonth(today.getMonth() - (calorieData.monthlyCalories.length - 1 - index));
      return { day: formatDate(date), calorie: value };
    });
  }

  let displayedTotal = 0;
  if (selectedPeriod === 'week') {
    const weekData = data.slice(-7);
    displayedTotal = weekData.reduce((sum, item) => sum + item.calorie, 0);
  } else {
    displayedTotal = data.reduce((sum, item) => sum + item.calorie, 0);
  }

  let periodLabel = '';
  if (selectedPeriod === 'week') {
    periodLabel = '週間合計約';
  } else if (selectedPeriod === 'month') {
    periodLabel = '月間合計約';
  } else if (selectedPeriod === 'half-year') {
    periodLabel = '半年合計約';
  } else {
    periodLabel = '年間合計約';
  }

  const maxCalorie = data.length > 0 ? Math.max(...data.map((item) => item.calorie)) : 0;
  const widthFactorMap: Record<typeof selectedPeriod, number> = {
    week: 100 / 7,
    month: 100 / data.length,
    'half-year': 100 / data.length,
    year: 100 / 12,
  };
  const chartWidthNumber = data.length * widthFactorMap[selectedPeriod];
  const computedChartWidth = chartWidthNumber < 100 ? '100%' : `${chartWidthNumber}%`;

  const chartContainerStyle = {
    minWidth: '100%',
    width: computedChartWidth,
    display: chartWidthNumber < 100 ? 'flex' : 'block',
    justifyContent: chartWidthNumber < 100 ? 'flex-end' : undefined,
  };

  useEffect(() => {
    if (data.length >= 8 && scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
    }
  }, [data]);

  const tickFormatter = (value: string, index: number): string => {
    if (selectedPeriod === 'month') {
      if ((index + 1) % 7 === 0 || index === data.length - 1) {
        return value;
      }
      return '';
    } else if (selectedPeriod === 'half-year') {
      if ((index + 1) % 4 === 0 || index === data.length - 1) {
        return value;
      }
      return '';
    }
    return value;
  };

  return (
    <div className="w-full">
      <div className="flex space-x-6 mb-4">
        <button
          onClick={() => setSelectedPeriod('week')}
          className={`py-1 px-3 rounded-full transition-colors duration-200 ${selectedPeriod === 'week' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          1週間
        </button>
        <button
          onClick={() => setSelectedPeriod('month')}
          className={`py-1 px-3 rounded-full transition-colors duration-200 ${selectedPeriod === 'month' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          1か月
        </button>
        <button
          onClick={() => setSelectedPeriod('half-year')}
          className={`py-1 px-3 rounded-full transition-colors duration-200 ${selectedPeriod === 'half-year' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          半年
        </button>
        <button
          onClick={() => setSelectedPeriod('year')}
          className={`py-1 px-3 rounded-full transition-colors duration-200 ${selectedPeriod === 'year' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          1年
        </button>
      </div>
      <h2 className="card-title text-xl font-bold mb-2">我慢したカロリー</h2>
      <p className="card-subtitle mb-4">
        {periodLabel}
        {displayedTotal}kcal
      </p>
      <div className="flex">
        <div className="flex-1 overflow-x-auto" ref={scrollContainerRef}>
          <div style={chartContainerStyle}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data} margin={{ top: 20, right: 0, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" tickFormatter={tickFormatter} />
                <Tooltip />
                <Bar dataKey="calorie" fill="#48bb78" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div style={{ width: '5%' }} className="flex text-right">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 30, right: 0, bottom: 30, left: 0 }}>
              <YAxis
                orientation="right"
                tickLine={false}
                axisLine={false}
                domain={[0, maxCalorie]}
                tick={{ fill: '#000', textAnchor: 'end' }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default WeeklyCalorieCard;
