'use client';

import ChatMessages from './_components/ChatMessages';
import InputForm from 'app/components/InputForm';
import Navbar from 'app/components/Navbar';
import Header from 'app/components/Header';
import { useEffect, useState } from 'react';
import useClientId from 'app/hooks/useClientId';

import ChatService, { ChatLog } from 'app/services/ChatService';

const ChatPage = () => {
  const examples = ['お菓子を食べたい', 'お腹すいた', '夜食食べようか迷う'];
  const userId = useClientId();
  const [chatLogs, setChatLogs] = useState<ChatLog[]>([]);
  const [inputText, setInputText] = useState<string>('');

  // 最初にこれまでチャットログを取得
  useEffect(() => {
    const fetchChatlogData = async () => {
      try {
        const chatLogs = await ChatService.GetUserChatLog(userId);

        setChatLogs(chatLogs);
      } catch (error) {
        console.error('ChatPage:fetchChatlogData: ', error);
      }
    };

    fetchChatlogData();
  }, [userId]);

  const handleSubmit = async () => {
    try {
      const responseMessage = await ChatService.SendPersuadeAI(userId, inputText);

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

        <div className="fixed bottom-16 left-0 right-0 z-10 bg-white">
          <InputForm
            inputText={inputText}
            onInputChange={setInputText}
            onSubmit={handleSubmit}
            examples={examples}
            onExampleClick={handleExampleClick}
          />
        </div>
        <div className="fixed bottom-0 left-0 right-0 z-20">
          <Navbar />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
