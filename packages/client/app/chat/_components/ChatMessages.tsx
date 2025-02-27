interface Message {
  text: string;
  isUser: boolean;
}

interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-4">
      {messages.map((msg, i) => (
        <div key={i} className={`mb-4 ${msg.isUser ? 'text-right' : ''}`}>
          <div className={`inline-block p-3 rounded-xl ${msg.isUser ? 'bg-[#4a665e] text-white' : 'bg-gray-100'}`}>
            {msg.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
