'use client';
import React, { useState } from 'react';
import { NotebookPen, CheckCircle } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from 'app/components/ui/drawer';
import InputForm from 'app/components/InputForm';

interface AddEndureCaloriesProps {
  onSubmit: (food: string) => Promise<void>;
}

const AddEndureCalories = (props: AddEndureCaloriesProps) => {
  const [open, setOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const examples = ['カップラーメン', 'ポテトチップス', 'コーラ'];

  const handleSubmit = async () => {
    if (!inputText.trim() || isSubmitting) return;

    try {
      // Drawer を閉じる
      setOpen(false);
      setIsSubmitting(true);
      // ローディングトースト表示
      const loadingToast = toast.loading('送信中...', {
        duration: Number.POSITIVE_INFINITY,
      });

      // 親コンポーネントに入力を渡す
      await props.onSubmit(inputText);

      // ローディングトーストを閉じ、成功トースト表示
      toast.dismiss(loadingToast);
      toast.success('送信が完了しました！', {
        style: {
          background: '#ecfdf5',
          border: '1px solid #6ee7b7',
          color: '#065f46',
        },
        icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      });

      // Drawer を閉じる
      setOpen(false);
      setInputText('');
    } catch (error) {
      toast.error('エラーが発生しました。もう一度お試しください。');
      console.error('Failed to submit:', error);
    } finally {
      setIsSubmitting(false);
    }

    // 入力を空にする
    setInputText('');
  };

  const handleExampleClick = (example: string) => {
    setInputText(example);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {/* トップにToast*/}
      <Toaster position="top-center" />
      {/* トリガー */}
      <DrawerTrigger asChild>
        <button
          className="fixed bottom-20 right-4 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
          aria-label="Add new item"
        >
          <NotebookPen className="h-6 w-6" />
        </button>
      </DrawerTrigger>
      <DrawerContent className="pb-20">
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
