import React from 'react';
import Image from 'next/image';

const ReportSection: React.FC = () => {
  return (
    <div className="bg-white rounded-md shadow-md p-4 mb-4 h-[30vh] w-full">
      <p>今週は頑張りましたね！</p>
      <p>火曜日は300kcalも控えることができて素晴らしいです！</p>
      <Image src="/images/dog.png" alt="dog" width={60} height={60} className="mr-2 cursor-pointer" />
    </div>
  );
};

export default ReportSection;
