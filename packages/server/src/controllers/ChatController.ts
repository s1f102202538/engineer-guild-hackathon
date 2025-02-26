import { Response } from 'express';
import { injectable, inject } from 'inversify';
import { Body, Controller, Post, Res } from 'routing-controllers';

import IOpenAIService from '../interfaces/IOpenAIService';
import IUserService from '../interfaces/IUserService';
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
}
