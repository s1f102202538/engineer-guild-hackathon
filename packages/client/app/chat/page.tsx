'use client';

import ChatMessages from './_components/ChatMessages';
import { ChatInput } from './_components/ChatInput';
import { useUser, useAuth } from '@clerk/nextjs';
import Navbar from 'app/components/Navbar';
import { useChat } from 'app/hooks/useChat';

const ChatPage = () => {
  const { user } = useUser();
  const { userId } = useAuth();
  const { messages, inputText, setInputText, handleSubmit } = useChat(userId || '');
  const examples = ['お菓子を食べたい', 'お腹すいた', '夜食食べようか迷う'];
  console.log('userId', userId);
  console.log('user', user);

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
