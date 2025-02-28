'use client';

import React, { useContext, useRef } from 'react';
import CountUp from 'react-countup';
import { DailyPatienceCaloriesContext } from '../page';

// キャラクターアニメーションを開始する関数（例：実装は各自で）
const startCharacterAnimation = () => {
  console.log('キャラクターのアニメーションを開始');
  // ここでキャラクターの動きを制御する処理を記述
};

const EndureCalories = () => {
  // DailyPatienceCaloriesContext から最新のカロリー値を取得
  const dailyPatienceCalories = useContext(DailyPatienceCaloriesContext);

  // useRefで前回の表示値を保持（初回は現在の値）
  const prevCaloriesRef = useRef(dailyPatienceCalories);

  return (
    <div>
      <div className="bg-green-600 rounded-[24px] drop-shadow-lg p-4 py-10">
        <h2 className="text-xl font-bold mb-2 text-white">今日の我慢カロリー</h2>
        <p className="text-6xl font-bold text-center py-2 text-white">
          <CountUp
            start={prevCaloriesRef.current} // 前回の値から
            end={dailyPatienceCalories} // 最新の値まで
            duration={1.0} // アニメーションの秒数
            separator="," // 千位区切り
            redraw={true} // 値が更新されたときに再アニメーション
            preserveValue={true} // 前回の値からのアニメーションを維持
            onEnd={() => {
              // アニメーション終了後、前回の値を更新
              prevCaloriesRef.current = dailyPatienceCalories;
              // キャラクターアニメーションを開始（送信成功後の処理など）
              startCharacterAnimation();
            }}
          />
          kcal
        </p>
      </div>
    </div>
  );
};

export default EndureCalories;
