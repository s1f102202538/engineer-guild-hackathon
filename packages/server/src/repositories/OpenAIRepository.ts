import { injectable } from 'inversify';
import prisma from '../prisma/client';
import { ChatLog } from '@prisma/client';
import IOpenAIRepository from '../interfaces/IOpenAIRepository';

@injectable()
export default class OpenAIRepository implements IOpenAIRepository {
  public async CreateChatLog(userId: string, message: string, isAI: boolean): Promise<void> {
    await prisma.chatLog.create({ data: { userId, message, isAI } });
  }

  public async GetChatLog(userId: string, maxTakes: number): Promise<ChatLog[]> {
    return prisma.chatLog.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: maxTakes,
    });
  }
}
