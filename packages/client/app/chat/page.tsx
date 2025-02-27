'use client';

import ChatMessages from './_components/ChatMessages';
import { ChatInput } from './_components/ChatInput';
import { useUser, useAuth } from '@clerk/nextjs';
import Navbar from 'app/components/Navbar';
import { useChat } from 'app/hooks/useChat';
import Header from 'app/components/Header';
import { useEffect } from 'react';
import axios from 'axios';

const ChatPage = () => {
  const { user } = useUser();
  const { userId } = useAuth();
  console.log('user', user);
  console.log('userId確認します', userId);
  const { messages, inputText, setInputText, handleSubmit } = useChat(userId || '');
  const examples = ['お菓子を食べたい', 'お腹すいた', '夜食食べようか迷う'];

  console.log('userId', userId);
  console.log('user', user);

  // test
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/chat/api-test`);
        console.log('確認確認確認', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
