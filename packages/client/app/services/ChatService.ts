import axios from 'axios';

import { UserClientIdRequest } from 'app/types/UserClientIdRequest';

export type ChatLog = {
  message: string;
  isAI: boolean;
};

type GetChatLogResponse = {
  chatLogs: ChatLog[];
};

export default class ChatService {
  private static readonly baseUrl = `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/chat`;

  public static async GetUserChatLog(clientId: string, maxtake: number = 50): Promise<ChatLog[]> {
    const url = `${this.baseUrl}/get-chat-log/${maxtake}`;
    const body = { clientId } as UserClientIdRequest;
    const response = await axios.post<GetChatLogResponse>(url, body);

    if (response.status !== 200) {
      throw new Error('ChatService:GetUserChatLog: status is not 200');
    }

    return response.data.chatLogs;
  }

  public static async SendPersuadeAI(clientId: string, message: string): Promise<string> {
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
