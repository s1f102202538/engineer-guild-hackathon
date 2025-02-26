import { Response } from 'express';
import { injectable, inject } from 'inversify';
import { Body, Controller, Post, Res } from 'routing-controllers';

import OpenAIService from '../services/OpenAIService';
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
  private openAIService: OpenAIService;

  constructor(@inject(TYPES.OpenAIService) openAI: OpenAIService) {
    this.openAIService = openAI;
  }

  @Post('persuade-user')
  async persuadeUser(@Body() persuadeRequest: PersuadeRequest, @Res() response: Response<PersuadeResponse>) {
    try {
      const { message } = persuadeRequest;

      const responseMessage = await this.openAIService.AdviseAgainstEating(message);

      response.status(200).send({ message: responseMessage });
    } catch (error) {
      console.error('ChatController:persuadeUser: ', error);
      response.status(500);
    }
  }
}
