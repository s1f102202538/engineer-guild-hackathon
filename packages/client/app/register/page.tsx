'use client';

import type { NextPage } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import UserService from 'app/services/UserService';
import useClientId from 'app/hooks/useClientId';

const Home: NextPage = () => {
  const clientID = useClientId();
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [weightGoal, setWeightGoal] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await UserService.CreateUserData(clientID, name, Number(weight), Number(weightGoal));

      // ホーム画面に遷移
      router.push('/home');
    } catch (error) {
      console.error('User registration failed: ', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-beige-100">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-green-700 mb-6 text-center">ユーザー登録</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-green-600 font-medium mb-1">
              名前
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="例: 山田 太郎"
              required
            />
          </div>
          <div>
            <label htmlFor="weight" className="block text-green-600 font-medium mb-1">
              現在の体重 (kg)
            </label>
            <input
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="例: 70"
              required
              min="0"
              step="0.1"
            />
          </div>
          <div>
            <label htmlFor="targetWeight" className="block text-green-600 font-medium mb-1">
              目標体重 (kg)
            </label>
            <input
              type="number"
              id="targetWeight"
              value={weightGoal}
              onChange={(e) => setWeightGoal(e.target.value)}
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="例: 65"
              required
              min="0"
              step="0.1"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            登録する
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
