'use client';

import React, { useState } from 'react';
import { NotebookPen } from 'lucide-react';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
  DrawerDescription,
} from 'app/components/ui/drawer';
import { Button } from 'app/components/ui/button';
import InputForm from 'app/components/InputForm';

const AddEndureCalories = () => {
  const [open, setOpen] = useState(false);
  const [inputText, setInputText] = useState('');

  // 例としてのサンプル例。必要に応じて変更してください。
  const examples = ['カップラーメン', 'ポテトチップス', 'コーラ'];

  // 送信処理(そのうちカスタムフックに移動)
  const handleSubmit = () => {
    if (!inputText.trim()) return;
    console.log('送信:', inputText);
    // ここでバックエンドへの送信処理を実装するなど
    setInputText('');
  };

  const handleExampleClick = (example: string) => {
    setInputText(example);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {/* トリガー */}
      <DrawerTrigger asChild>
        <button
          className="fixed bottom-20 right-4 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
          aria-label="Add new item"
        >
          <NotebookPen className="h-6 w-6" />
        </button>
      </DrawerTrigger>
      <DrawerContent className='pb-20'>
        <DrawerHeader>
          <DrawerTitle>我慢カロリー記入フォーム</DrawerTitle>
          <DrawerDescription>我慢できた食品を記入して下さい！</DrawerDescription>
        </DrawerHeader>

        {/* InputForm コンポーネント */}
        <InputForm
          inputText={inputText}
          onInputChange={setInputText}
          onSubmit={handleSubmit}
          examples={examples}
          onExampleClick={handleExampleClick}
        />
      </DrawerContent>
    </Drawer>
  );
};

export default AddEndureCalories;
