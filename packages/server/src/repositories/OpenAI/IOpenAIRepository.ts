import { ChatLog } from '@prisma/client';

export default interface IOpenAIRepository {
  CreateChatLog(userId: string, message: string, isAI: boolean): Promise<void>;

  GetChatLog(userId: string, maxTakes: number): Promise<ChatLog[]>;
}
