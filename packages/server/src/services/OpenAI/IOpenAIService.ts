import { ChatLog } from '@prisma/client';

export default interface IOpenAIService {
  ConvertFoodToCalories(food: string): Promise<number | null>;

  AdviseAgainstEating(userId: string, message: string): Promise<string>;

  SaveChatLog(userId: string, message: string, isAI: boolean): Promise<void>;

  GetChatLog(userId: string, maxTakes: number): Promise<ChatLog[]>;
}
