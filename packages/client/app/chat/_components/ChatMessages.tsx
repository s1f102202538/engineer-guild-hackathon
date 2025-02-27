import { ChatLog } from 'app/services/ChatService';

interface ChatMessagesProps {
  chatLogs: ChatLog[];
}

const ChatMessages = (props: ChatMessagesProps) => {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-4">
      {props.chatLogs.map((chatLog, i) => (
        <div key={i} className={`mb-4 ${!chatLog.isAI ? 'text-right' : ''}`}>
          <div className={`inline-block p-3 rounded-xl ${!chatLog.isAI ? 'bg-[#4a665e] text-white' : 'bg-gray-100'}`}>
            {chatLog.message}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
