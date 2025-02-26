import { useState } from 'react';

type Message = {
  text: string;
  isUser: boolean;
};

export const useChat = (userId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');

  const handleSubmit = async () => {
    if (!inputText.trim()) return;

    const clientId = userId;

    setMessages([...messages, { text: inputText, isUser: true }]);

    try {
      // process.env.API_ENDPOINT_URL を使用
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/chat/persuade-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clientId, message: inputText }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [...prev, { text: data.message, isUser: false }]);
      } else {
        const errorText = await response.text(); // レスポンスをテキストとして取得
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
