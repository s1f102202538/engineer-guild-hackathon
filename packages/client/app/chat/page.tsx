'use client';

import { useState } from 'react';
import ChatMessages from './_components/ChatMessages';
import { ChatInput } from './_components/ChatInput';
import Navbar from 'app/components/Navbar';
import Header from 'app/components/Header';

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
        text: '220KCAL分だからすごいワン!!\nooさんの努力ボクが見てるワン!!',
        isUser: false,
      },
    ]);
    setInputText('');
  };

  const handleExampleClick = (example: string) => {
    setInputText(example);
  };

  return (
    <div>
      <Header title={'チャット'} />
      <div className="flex flex-col h-screen bg-beige-100">
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
    </div>
  );
};

export default ChatPage;
