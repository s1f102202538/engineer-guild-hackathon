import { Response } from 'express';
import { injectable, inject } from 'inversify';
import { Body, Controller, Param, Post, Res } from 'routing-controllers';

import IOpenAIService from '../services/OpenAI/IOpenAIService';
import IUserService from '../services/User/IUserService';
import ChatLogModel from '../models/ChatLogModel';
import { UserClientIdRequest } from '../models/commonRequest';
import { TYPES } from '../config/types';
import { IsNotEmpty, IsString } from 'class-validator';
import logger from '../config/logger';

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
    @inject(TYPES.IOpenAIService) openAIService: IOpenAIService,
    @inject(TYPES.IUserService) userService: IUserService
  ) {
    this.openAIService = openAIService;
    this.userService = userService;
  }

  @Post('/persuade-user')
  async persuadeUser(@Body() persuadeRequest: PersuadeRequest, @Res() response: Response<PersuadeResponse>) {
    try {
      const { clientId, message } = persuadeRequest;

      logger.info('clientId: ' + clientId);
      logger.info('message: ' + message);

      const user = await this.userService.GetUser(clientId);

      // Userの入力したログを保存
      await this.openAIService.SaveChatLog(user.id, message, false);

      const responseMessage = await this.openAIService.AdviseAgainstEating(user.id, message);

      // AIの出力したログを保存
      await this.openAIService.SaveChatLog(user.id, responseMessage, true);

      return response.status(200).send({ message: responseMessage });
    } catch (error) {
      logger.error('ChatController:persuadeUser: ', error);
      return response.status(500);
    }
  }

  @Post('/get-chat-log/:maxTake')
  async getChatLog(
    @Param('maxTake') maxTake: number,
    @Body() userClientIdRequest: UserClientIdRequest,
    @Res() response: Response<GetChatLogResponse>
  ) {
    try {
      const { clientId } = userClientIdRequest;
      const user = await this.userService.GetUser(clientId);

      const chatLogs = await this.openAIService.GetChatLog(user.id, maxTake);
      return response.status(200).send({ chatLogs });
    } catch (error) {
      logger.error('ChatController:getChatLog: ', error);
      return response.status(500);
    }
  }
}
