// import Image from 'next/image';
import { ChatLog } from 'app/services/ChatService';
import { Avatar, AvatarFallback, AvatarImage } from 'app/components/ui/avatar';

interface ChatMessagesProps {
  chatLogs: ChatLog[];
}

const ChatMessages = (props: ChatMessagesProps) => {
  return (
    <div className="flex-1 overflow-y-auto px-2 pl-0 py-4 pt-16">
      {props.chatLogs.map((chatLog, i) => (
        <div key={i} className={`mb-4 flex ${!chatLog.isAI ? 'justify-end' : ''}`}>
          {chatLog.isAI && (
            <div className="mr-2 flex-shrink-0 shadow-">
              <Avatar>
                <AvatarImage src="/images/icon2.png" alt="@shadcn" />
                <AvatarFallback>Icon</AvatarFallback>
              </Avatar>
            </div>
          )}
          <div className={`inline-block p-3 rounded-xl ${!chatLog.isAI ? 'bg-[#4a665e] text-white' : 'bg-gray-100'}`}>
            {chatLog.message}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
