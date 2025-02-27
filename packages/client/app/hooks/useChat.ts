import { useState, useEffect } from 'react';
import axios from 'axios';

type Message = {
  text: string;
  isUser: boolean;
};

export const useChat = (userId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');

  console.log('userId確認します', userId);
  console.log('messages確認します', messages);
  console.log('inputText確認します', inputText);

  useEffect(() => {
    const fetchChatLog = async () => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/chat/get-chat-log/50`, {
          clientId: userId,
        });

        if (response.status === 200) {
          const data = response.data;
          setMessages(
            data.chatLogs.map((log: { message: string; isUser: boolean }) => ({
              text: log.message,
              isUser: log.isUser,
            }))
          );
        } else {
          console.error('Failed to fetch chat log');
        }
      } catch (error) {
        console.error('Error fetching chat log:', error);
      }
    };

    if (userId) {
      fetchChatLog();
    }
  }, [userId]);

  const handleSubmit = async () => {
    if (!inputText.trim()) return;

    const clientId = userId;
    console.log('clientIdデーーーーーーす', typeof clientId);
    console.log('inputTextデーーーーーーす', typeof inputText);
    setMessages([...messages, { text: inputText, isUser: true }]);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/chat/persuade-user`, {
        clientId: clientId,
        message: inputText,
      });

      if (response.status === 200) {
        const data = response.data;
        setMessages((prev) => [...prev, { text: data.message, isUser: false }]);
      } else {
        const errorText = response.statusText;
        console.error('Failed to persuade user', errorText);
        setMessages((prev) => [...prev, { text: 'エラーが発生しました。もう一度試してください。', isUser: false }]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [...prev, { text: 'エラーが発生しました。もう一度試してください。', isUser: false }]);
    }

    setInputText('');
  };

  return {
    messages,
    inputText,
    setInputText,
    handleSubmit,
  };
};
