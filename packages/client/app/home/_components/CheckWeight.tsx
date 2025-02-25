import React from 'react';

const CheckWeight = () => {
  return (
    // todo 体重を動的に表示できるようにする。
    <div>
      <div className="bg-white rounded-[24px] shadow-lg p-4 flex items-center justify-between">
        <div>
          <span className="text-sm">体重</span>
          <span className="ml-2 text-xl font-bold">100kg</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">目標体重</span>
          <span className="text-xl font-bold">85.5kg</span>
        </div>
      </div>
    </div>
  );
};

export default CheckWeight;
