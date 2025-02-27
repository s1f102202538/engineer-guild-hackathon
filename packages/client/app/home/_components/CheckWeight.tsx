'use client';

import { Eye, EyeClosed } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { UserDataContext } from 'app/home/page';

const CheckWeight = () => {
  const [isCheckWeight, setIsCheckWeight] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isloading, setIsLoading] = useState<boolean>(false);
  const userData = useContext(UserDataContext);

  // 表示する体重
  const displayWeight = isCheckWeight && userData ? `${userData.weight}kg` : '--.-kg';

  return (
    <div className="bg-white rounded-[24px] shadow-lg p-4 max-w-md mx-auto flex items-center">
      {/* 左側のスペーサー */}
      <div className="flex-1" />

      {/* 中央：体重情報（現在の体重と目標の体重を横並び） */}
      <div className="flex items-center space-x-4">
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500">現在の体重</span>
          <span className="text-xl font-bold">{displayWeight}</span>
        </div>
        <span className="text-gray-400">→</span>
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500">目標の体重</span>
          <span className="text-xl font-bold">{displayWeight}</span>
        </div>
      </div>

      {/* 右側：表示／非表示の切替アイコン */}
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
