'use client';

import { Eye, EyeClosed } from 'lucide-react';
import React, { useState } from 'react';

const CheckWeight = () => {
  const [isCheckWeight, setIsCheckWeight] = useState<boolean>(true);

  return (
    <div className="bg-white rounded-[24px] shadow-lg p-4 max-w-md mx-auto flex items-center">
      {/* 左側のスペーサー */}
      <div className="flex-1" />

      {/* 中央：体重情報部分を横並びにする */}
      <div className="flex items-center space-x-4">
        {/* 現在の体重と値（縦並び） */}
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500">現在の体重</span>
          <span className="text-xl font-bold">{isCheckWeight ? '100kg' : '--.-kg'}</span>
        </div>

        {/* 矢印 */}
        <span className="text-gray-400">→</span>

        {/* 目標の体重と値（縦並び） */}
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500">目標の体重</span>
          <span className="text-xl font-bold">{isCheckWeight ? '85.5kg' : '--.-kg'}</span>
        </div>
      </div>

      {/* 右側：アイコン */}
      <div className="flex-1 flex justify-end">
        {isCheckWeight ? (
          <Eye className="cursor-pointer" onClick={() => setIsCheckWeight((prev) => !prev)} />
        ) : (
          <EyeClosed className="cursor-pointer" onClick={() => setIsCheckWeight((prev) => !prev)} />
        )}
      </div>
    </div>
  );
};

export default CheckWeight;
