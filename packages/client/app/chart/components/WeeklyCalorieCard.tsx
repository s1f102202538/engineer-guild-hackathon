'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  // YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import './WeeklyCalorieCard.css';
import { Tabs, TabsList, TabsTrigger } from 'app/components/ui/tabs';

interface WeeklyCalorieCardProps {
  // 1日ごとのカロリー我慢量（1週間・1か月表示用：例として週は7日、月は30日分のデータ）
  dailyCalories: number[];
  // 1週間ごとのカロリー我慢量（半年表示用：例として26週間分の集計データ）
  weeklyCalories: number[];
  // 1か月ごとのカロリー我慢量（年間表示用：例として12ヶ月分の集計データ）
  monthlyCalories: number[];
}

const formatDate = (date: Date): string => {
  const mm = (date.getMonth() + 1).toString().padStart(2, '0');
  const dd = date.getDate().toString().padStart(2, '0');
  return `${mm}/${dd}`;
};

const WeeklyCalorieCard: React.FC<WeeklyCalorieCardProps> = ({ dailyCalories, weeklyCalories, monthlyCalories }) => {
  // 選択された期間：'week'（1週間）、'month'（1か月）、'half-year'（半年）、'year'（1年）
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'half-year' | 'year'>('week');

  // 棒グラフ横スクロール用の ref
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 各期間ごとにデータ（ラベルは全件「MM/DD」形式）を作成
  const data = React.useMemo(() => {
    const today = new Date();
    let result: { day: string; calorie: number }[] = [];
    if (selectedPeriod === 'week') {
      result = dailyCalories.map((value, index) => {
        // 配列は過去から現在の順と仮定し、最新が today
        const date = new Date(today);
        date.setDate(today.getDate() - (dailyCalories.length - 1 - index));
        return { day: formatDate(date), calorie: value };
      });
    } else if (selectedPeriod === 'month') {
      result = dailyCalories.map((value, index) => {
        const date = new Date(today);
        date.setDate(today.getDate() - (dailyCalories.length - 1 - index));
        return { day: formatDate(date), calorie: value };
      });
    } else if (selectedPeriod === 'half-year') {
      result = weeklyCalories.map((value, index) => {
        const date = new Date(today);
        // 各週データ：最新の週を today とし、1 週＝7 日として算出
        date.setDate(today.getDate() - (weeklyCalories.length - 1 - index) * 7);
        return { day: formatDate(date), calorie: value };
      });
    } else if (selectedPeriod === 'year') {
      result = monthlyCalories.map((value, index) => {
        const date = new Date(today);
        // 最新の月を today の月として、過去の月は月単位でずらす
        date.setMonth(today.getMonth() - (monthlyCalories.length - 1 - index));
        return { day: formatDate(date), calorie: value };
      });
    }
    return result;
  }, [selectedPeriod, dailyCalories, weeklyCalories, monthlyCalories]);

  // 表示合計値の算出（週間表示の場合は最新の7件のみを合算）
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

  // y 軸の上限値
  // const maxCalorie = data.length > 0 ? Math.max(...data.map(item => item.calorie)) : 0;

  // グラフ横幅を、データ件数に合わせて調整
  const widthFactorMap: Record<typeof selectedPeriod, number> = {
    week: 100 / 7,
    month: 100 / data.length, // データ件数は 30 日分など
    'half-year': 100 / data.length, // 例：26件の場合
    year: 100 / 12,
  };
  const chartWidthNumber = data.length * widthFactorMap[selectedPeriod];
  const computedChartWidth = chartWidthNumber < 100 ? '100%' : `${chartWidthNumber}%`;

  // データ件数が少ない場合は右寄せのためのスタイル設定
  const chartContainerStyle = {
    minWidth: '100%',
    width: computedChartWidth,
    display: chartWidthNumber < 100 ? 'flex' : 'block',
    justifyContent: chartWidthNumber < 100 ? 'flex-end' : undefined,
  };

  // データ件数が8件以上の場合、初期スクロール位置を右端に設定
  useEffect(() => {
    if (data.length >= 8 && scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
    }
  }, [data]);

  // X軸の tick 表示を条件分岐で制御する関数
  const tickFormatter = (value: string, index: number): string => {
    if (selectedPeriod === 'month') {
      // 1か月表示は、データ件数が例として 30 件の場合、7日ごとに 1 つ表示
      if ((index + 1) % 7 === 0 || index === data.length - 1) {
        return value;
      }
      return '';
    } else if (selectedPeriod === 'half-year') {
      // 半年表示：weeklyCalories のデータ件数が例として26件の場合、約4週ごとに 1 つ表示
      if ((index + 1) % 4 === 0 || index === data.length - 1) {
        return value;
      }
      return '';
    }
    // week, year はすべて表示
    return value;
  };

  return (
    <div className="w-auto mx-2">
      <h2 className="card-title text-xl font-bold mb-2">我慢したカロリー</h2>
      <p className="card-subtitle mb-4">
        {periodLabel}
        {displayedTotal}kcal
      </p>
      {/* 期間選択タブ */}
      <Tabs
        defaultValue="week"
        onValueChange={(value: 'week' | 'month' | 'half-year' | 'year') => setSelectedPeriod(value)}
      >
        <TabsList className="flex space-x-6 my-4 justify-center">
          <TabsTrigger value="week">1週間</TabsTrigger>
          <TabsTrigger value="month">1か月</TabsTrigger>
          <TabsTrigger value="half-year">半年</TabsTrigger>
          <TabsTrigger value="year">1年</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* グラフと Y 軸を横並びに */}
      <div className="flex ml-2 h-30 w-30">
        {/* 横スクロール可能なグラフ部分 */}
        <div className="flex-1 overflow-x-auto" ref={scrollContainerRef}>
          <div style={chartContainerStyle}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" tickFormatter={tickFormatter} />
                <Tooltip />
                <Bar dataKey="calorie" fill="#48bb78" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Y 軸部分（横幅約13%） */}
        <div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 30, right: 0, bottom: 30, left: 0 }}></BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default WeeklyCalorieCard;
