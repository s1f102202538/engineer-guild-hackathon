'use client';

import { useState } from 'react';
import ChatMessages from './_components/ChatMessages';
import { ChatInput } from './_components/ChatInput';
import Navbar from 'app/components/Navbar';

type Message = {
  text: string;
  isUser: boolean;
};

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');

  const examples = ['お菓子を食べたい', 'お腹すいた', '夜食食べようか迷う'];

  // バックエンドとの処理を金融
  const handleSubmit = () => {
    if (!inputText.trim()) return;

    setMessages([...messages, { text: inputText, isUser: true }]);
    setMessages((prev) => [
      ...prev,
      {
        text: '220KCAL分だからすごいワン!!\n〇〇さんの努力ボクが見てるワン!!',
        isUser: false,
      },
    ]);
    setInputText('');
  };

  const handleExampleClick = (example: string) => {
    setInputText(example);
  };

  return (
    <div className="flex flex-col h-screen bg-[#f5f1eb]">
      <header className="bg-[#4a665e] text-white p-4">
        <h1 className="text-xl font-bold text-center">チャット</h1>
      </header>

      <ChatMessages messages={messages} />

      <ChatInput
        inputText={inputText}
        onInputChange={setInputText}
        onSubmit={handleSubmit}
        examples={examples}
        onExampleClick={handleExampleClick}
      />

      <Navbar />
    </div>
  );
};

export default ChatPage;
