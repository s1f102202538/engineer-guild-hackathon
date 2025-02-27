import axios from 'axios';

import { UserClientIdRequest } from 'app/types/UserClientIdRequest';

export type ChatLog = {
  message: string;
  isAI: boolean;
};

export default class ChatService {
  private static readonly baseUrl = `${process.env.REACT_APP_API_URL}/chat`;

  public static async GetUserChatLog(clientId: string, maxtake: number = 50): Promise<ChatLog[]> {
    const url = `${this.baseUrl}/persuade-user/${maxtake}`;
    const body = { clientId } as UserClientIdRequest;
    const response = await axios.post<ChatLog[]>(url, body);

    if (response.status !== 200) {
      throw new Error('ChatService:GetUserChatLog: status is not 200');
    }

    const chatLogs = response.data.map((chatLog) => {
      return {
        message: chatLog.message,
        isAI: chatLog.isAI,
      } as ChatLog;
    });

    if (chatLogs == null || chatLogs.length === 0) {
      throw new Error('ChatService:GetUserChatLog: chatLogs is empty');
    }

    return chatLogs;
  }

  public static async sendPersuadeAI(clientId: string, message: string): Promise<string> {
    const url = `${this.baseUrl}/persuade-user`;
    const body = { clientId, message } as UserClientIdRequest;
    const response = await axios.post<{ message: string }>(url, body);

    if (response.status !== 200) {
      throw new Error('ChatService:sendPersuadeAI: status is not 200');
    }

    const responseMessage = response.data.message;
    if (responseMessage == null) {
      throw new Error('ChatService:sendPersuadeAI: message is null');
    }

    return responseMessage;
  }
}
