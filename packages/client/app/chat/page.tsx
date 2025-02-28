'use client';

import ChatMessages from './_components/ChatMessages';
import InputForm from 'app/components/InputForm';
import Navbar from 'app/components/Navbar';
import Header from 'app/components/Header';
import { useEffect, useState, useRef } from 'react';
import useClientId from 'app/hooks/useClientId';

import ChatService, { ChatLog } from 'app/services/ChatService';

const ChatPage = () => {
  const examples = ['お菓子を食べたい', 'お腹すいた', '夜食食べようか迷う'];
  const userId = useClientId();
  const [chatLogs, setChatLogs] = useState<ChatLog[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  // メッセージが更新されたらスクロール
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLogs, loading]);

  const handleSubmit = async () => {
    try {
      // ユーザーのメッセージを追加し、ローディング状態に設定
      const newChatLogs = [...chatLogs, { message: inputText, isAI: false }];
      setChatLogs(newChatLogs);
      setLoading(true);

      const responseMessage = await ChatService.SendPersuadeAI(userId, inputText);

      // AIの応答を追加し、ローディング状態を解除
      setChatLogs([...newChatLogs, { message: responseMessage, isAI: true }]);
      setLoading(false);

      // 入力欄をクリア
      setInputText('');
    } catch (error) {
      console.error('ChatPage:handleSubmit: ', error);
      setLoading(false);
    }
  };

  const handleExampleClick = (example: string) => {
    setInputText(example);
  };

  return (
    <div className="bg-grey-500">
      <Header title={'チャット'} />
      <div className="flex flex-col h-screen">
        <div className="flex-1 overflow-y-auto px-4 py-4 pb-40">
          <ChatMessages chatLogs={chatLogs} />
          {loading && (
            <div className="flex justify-center items-center">
              <div className="loader">Loading...</div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="fixed bottom-16 left-0 right-0 z-10 bg-beige-100">
          <InputForm
            inputText={inputText}
            onInputChange={setInputText}
            onSubmit={handleSubmit}
            examples={examples}
            onExampleClick={handleExampleClick}
          />
        </div>
        <div className="fixed bottom-0 left-0 right-0 z-20 bg-beige-100">
          <Navbar />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
