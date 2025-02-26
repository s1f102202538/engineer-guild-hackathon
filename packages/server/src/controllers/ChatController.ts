import { Response } from 'express';
import { injectable, inject } from 'inversify';
import { Body, Controller, Post, QueryParam, Res } from 'routing-controllers';

import IOpenAIService from '../services/OpenAI/IOpenAIService';
import IUserService from '../services/User/IUserService';
import ChatLogModel from '../models/ChatLogModel';
import { UserClientIdRequest } from '../models/commonRequest';
import { TYPES } from '../config/types';
import { IsNotEmpty, IsString } from 'class-validator';

class PersuadeRequest {
  @IsString()
  @IsNotEmpty()
  clientId!: string;

  @IsString()
  @IsNotEmpty()
  message!: string;
}

class PersuadeResponse {
  message!: string;
}

class GetChatLogResponse {
  chatLogs!: ChatLogModel[];
}

@injectable()
@Controller('/chat')
export default class ChatController {
  private openAIService: IOpenAIService;
  private userService: IUserService;

  constructor(
    @inject(TYPES.OpenAIService) openAI: IOpenAIService,
    @inject(TYPES.IOpenAIService) userService: IUserService
  ) {
    this.openAIService = openAI;
    this.userService = userService;
  }

  @Post('/persuade-user')
  async persuadeUser(@Body() persuadeRequest: PersuadeRequest, @Res() response: Response<PersuadeResponse>) {
    try {
      const { clientId, message } = persuadeRequest;

      const user = await this.userService.GetUser(clientId);

      // Userの入力したログを保存
      await this.openAIService.SaveChatLog(user.id, message, false);

      const responseMessage = await this.openAIService.AdviseAgainstEating(message);

      // AIの出力したログを保存
      await this.openAIService.SaveChatLog(user.id, responseMessage, true);

      response.status(200).send({ message: responseMessage });
    } catch (error) {
      console.error('ChatController:persuadeUser: ', error);
      response.status(500);
    }
  }

  @Post('/get-chat-log/:maxTake')
  async getChatLog(
    @QueryParam('maxTake') maxTake: number,
    @Body() userClientIdRequest: UserClientIdRequest,
    @Res() response: Response<GetChatLogResponse>
  ) {
    try {
      const { clientId } = userClientIdRequest;
      const user = await this.userService.GetUser(clientId);

      const chatLogs = await this.openAIService.GetChatLog(user.id, maxTake);
      response.status(200).send({ chatLogs });
    } catch (error) {
      console.error('ChatController:getChatLog: ', error);
      response.status(500);
    }
  }
}
