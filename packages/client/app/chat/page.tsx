'use client';

import ChatMessages from './_components/ChatMessages';
import { ChatInput } from './_components/ChatInput';
import { useAuth } from '@clerk/nextjs';
import Navbar from 'app/components/Navbar';
import Header from 'app/components/Header';
import { useEffect, useState } from 'react';

import ChatService, { ChatLog } from 'app/services/ChatService';

const ChatPage = () => {
  const { userId } = useAuth();

  const examples = ['お菓子を食べたい', 'お腹すいた', '夜食食べようか迷う'];

  const [chatLogs, setChatLogs] = useState<ChatLog[]>([]);
  const [inputText, setInputText] = useState<string>('');

  // 最初にこれまでチャットログを取得
  useEffect(() => {
    const fetchChatlogData = async () => {
      try {
        // usrIdがnullの場合はエラーを出力
        if (userId == null) {
          throw new Error('userId is null');
        }

        const chatLogs = await ChatService.GetUserChatLog(userId);
        if (chatLogs == null) {
          throw new Error('chatLogs is null');
        }

        setChatLogs(chatLogs);
      } catch (error) {
        console.error('ChatPage:fetchChatlogData: ', error);
      }
    };

    fetchChatlogData();
  }, [userId]);

  const handleSubmit = async () => {
    try {
      if (userId == null) {
        throw new Error('userId is null');
      }

      const responseMessage = await ChatService.sendPersuadeAI(userId, inputText);
      if (responseMessage == null) {
        throw new Error('responseMessage is null');
      }

      // chatLogsに新しいログを追加
      const newChatLogs = [...chatLogs, { message: inputText, isAI: false }, { message: responseMessage, isAI: true }];
      setChatLogs(newChatLogs);

      // 入力欄をクリア
      setInputText('');
    } catch (error) {
      console.error('ChatPage:handleSubmit: ', error);
    }
  };

  const handleExampleClick = (example: string) => {
    setInputText(example);
  };

  return (
    <div>
      <Header title={'チャット'} />
      <div className="flex flex-col h-screen bg-beige-100">
        <ChatMessages chatLogs={chatLogs} />

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
