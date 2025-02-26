'use client';

import React from 'react';
import EndureCalories from './_components/EndureCalories';
import CheckWeight from './_components/CheckWeight';
import Navbar from '../components/Navbar';

const Page = () => {
  return (
    <div className="w-full mx-auto h-screen bg-beige-100 flex flex-col relative text-black">
      <main className="flex-1 px-4 pt-4 pb-16 space-y-4 overflow-hidden">
        <CheckWeight />
        <EndureCalories />
      </main>
      <Navbar />
    </div>
  );
};

export default Page;
