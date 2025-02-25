import React from 'react';
import EndureCalories from './_components/EndureCalories';
import CheckWeight from './_components/CheckWeight';
import Chat from './_components/Chat';
import Navbar from '../components/Navbar';

const page = () => {
  return (
    <div className="w-full mx-auto h-screen bg-beige-100 flex flex-col relative text-black">
      <main className="flex-1 px-4 pt-4 pb-16 space-y-4 overflow-hidden">
        <CheckWeight />
        <EndureCalories />
        <Chat />
      </main>
      <Navbar />
    </div>
  );
};

export default page;
