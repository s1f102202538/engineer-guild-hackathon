'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Tabs, TabsList, TabsTrigger } from 'app/components/ui/tabs';

interface WeeklyCalorieCardProps {
  // 1日ごとのカロリー我慢量（例：週は7日、月は30日分のデータ）
  dailyCalories: number[];
  // 1週間ごとのカロリー我慢量（例：半年は26週間分の集計データ）
  weeklyCalories: number[];
  // 1か月ごとのカロリー我慢量（例：年間は12ヶ月分の集計データ）
  monthlyCalories: number[];
}

// 日付をMM/DD形式に変換する関数
const formatDate = (date: Date): string => {
  const mm = (date.getMonth() + 1).toString().padStart(2, '0');
  const dd = date.getDate().toString().padStart(2, '0');
  return `${mm}/${dd}`;
};

const WeeklyCalorieCard: React.FC<WeeklyCalorieCardProps> = ({ dailyCalories, weeklyCalories, monthlyCalories }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'half-year' | 'year'>('week');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 選択した期間に合わせたデータ作成
  const data = useMemo(() => {
    const today = new Date();
    let result: { day: string; calorie: number }[] = [];

    if (selectedPeriod === 'week' || selectedPeriod === 'month') {
      // 日毎データを利用（週・月ともdailyCaloriesを利用）
      result = dailyCalories.map((value, index) => {
        const date = new Date(today);
        date.setDate(today.getDate() - (dailyCalories.length - 1 - index));
        return { day: formatDate(date), calorie: value };
      });
    } else if (selectedPeriod === 'half-year') {
      // 週毎データ
      result = weeklyCalories.map((value, index) => {
        const date = new Date(today);
        date.setDate(today.getDate() - (weeklyCalories.length - 1 - index) * 7);
        return { day: formatDate(date), calorie: value };
      });
    } else if (selectedPeriod === 'year') {
      // 月毎データ
      result = monthlyCalories.map((value, index) => {
        const date = new Date(today);
        date.setMonth(today.getMonth() - (monthlyCalories.length - 1 - index));
        return { day: formatDate(date), calorie: value };
      });
    }

    return result;
  }, [selectedPeriod, dailyCalories, weeklyCalories, monthlyCalories]);

  // 表示合計値の算出（週の場合は最新7件のみ）
  const displayedTotal = useMemo(() => {
    if (selectedPeriod === 'week') {
      const weekData = data.slice(-7);
      return weekData.reduce((sum, item) => sum + item.calorie, 0);
    }
    return data.reduce((sum, item) => sum + item.calorie, 0);
  }, [selectedPeriod, data]);

  // 期間に応じたラベル設定
  const periodLabel = useMemo(() => {
    switch (selectedPeriod) {
      case 'week':
        return '週間合計';
      case 'month':
        return '月間合計';
      case 'half-year':
        return '半年合計';
      case 'year':
        return '年間合計';
      default:
        return '';
    }
  }, [selectedPeriod]);

  // y軸の上限値の算出
  const maxCalorie = data.length > 0 ? Math.max(...data.map((item) => item.calorie)) : 0;

  // グラフ横幅をデータ件数に合わせて調整
  const widthFactorMap: Record<typeof selectedPeriod, number> = {
    week: 100 / 7,
    month: 100 / 30,
    'half-year': 100 / 24,
    year: 100 / 12,
  };
  const chartWidthNumber = data.length * widthFactorMap[selectedPeriod];
  const computedChartWidth = chartWidthNumber < 100 ? '100%' : `${chartWidthNumber}%`;

  // 右寄せのためのスタイル設定
  const chartContainerStyle = {
    minWidth: '100%',
    width: computedChartWidth,
    display: 'flex',
    justifyContent: 'flex-end',
  };

  // データ件数が8件以上の場合、初期スクロール位置を右端に設定
  useEffect(() => {
    if (data.length >= 8 && scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
    }
  }, [data]);

  // X軸のtick表示の制御
  const tickFormatter = (value: string, index: number): string => {
    if (selectedPeriod === 'month') {
      return (index + 1) % 7 === 0 || index === data.length - 1 ? value : '';
    } else if (selectedPeriod === 'half-year') {
      return (index + 1) % 4 === 0 || index === data.length - 1 ? value : '';
    }
    return value;
  };

  return (
    <div className="mx-4">
      <p className="text-center text-xl">我慢カロリー</p>

      {/* 期間選択タブ */}
      <Tabs
        defaultValue="week"
        onValueChange={(value: 'week' | 'month' | 'half-year' | 'year') => setSelectedPeriod(value)}
      >
        <TabsList className="flex space-x-6 my-2 justify-center">
          <TabsTrigger value="week">1週間</TabsTrigger>
          <TabsTrigger value="month">1か月</TabsTrigger>
          <TabsTrigger value="half-year">半年</TabsTrigger>
          <TabsTrigger value="year">1年</TabsTrigger>
        </TabsList>
      </Tabs>

      <p className="text-sm text-gray-600">{periodLabel}</p>
      <p className="text-3xl">{displayedTotal}kcal</p>

      {/* グラフ全体のコンテナ */}
      <div className="relative">
        {/* 横スクロール可能なグラフ部分 */}
        <div className="overflow-x-auto" ref={scrollContainerRef}>
          <div style={chartContainerStyle}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" tickFormatter={tickFormatter} tick={{ fill: '#aaa' }} />
                <Tooltip />
                <Bar dataKey="calorie" fill="#48bb78" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 絶対配置のY軸（グラフにオーバーレイ） */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            height: 300,
            width: 70,
            pointerEvents: 'none',
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: -60, bottom: 45, left: 30 }}>
              <YAxis
                orientation="right"
                tickLine={false}
                axisLine={false}
                domain={[0, maxCalorie]}
                ticks={[0, maxCalorie * 0.25, maxCalorie * 0.5, maxCalorie * 0.75, maxCalorie]}
                tick={{ fill: '#333333', textAnchor: 'end' }}
                dx={-10}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default WeeklyCalorieCard;
