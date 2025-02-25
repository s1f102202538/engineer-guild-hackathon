import 'reflect-metadata';
import { Response } from 'express';
import { Controller, Res, Post, Body } from 'routing-controllers';
import { injectable, inject } from 'inversify';
import UserService from '../services/UserService';

import { TYPES } from '../config/types';
import { IsAlpha } from 'class-validator';
import { UserClientIdRequest } from '../models/commonRequest';

class CreateUserRequest {
  @IsAlpha()
  clientId!: string;

  @IsAlpha()
  name!: string;
}

@injectable()
@Controller('/user')
export default class UserController {
  private userService: UserService;

  constructor(@inject(TYPES.UserService) userService: UserService) {
    this.userService = userService;
  }

  @Post('/get')
  async getUserName(@Body() userClientIdRequest: UserClientIdRequest, @Res() response: Response) {
    try {
      const { clientId } = userClientIdRequest;
      const user = await this.userService.GetUser(clientId);

      return response.status(200).send({ name: user.name });
    } catch (error) {
      console.error('UserController:getUser: ', error);
      return response.status(500);
    }
  }

  @Post('/create')
  async createUser(@Body() createUserRequest: CreateUserRequest, @Res() response: Response) {
    try {
      const { clientId, name } = createUserRequest;

      await this.userService.CreateUser(clientId, name);

      return response.status(200).send('User created');
    } catch (error) {
      console.error('UserController:createUser: ', error);
      return response.status(500);
    }
  }

  @Post('/delete')
  async deleteUser(@Body() userClientIdRequest: UserClientIdRequest, @Res() response: Response) {
    try {
      const { clientId } = userClientIdRequest;

      await this.userService.DeleteUser(clientId);

      return response.status(200).send('User deleted');
    } catch (error) {
      console.error('UserController:deleteUser: ', error);
      return response.status(500);
    }
  }
}
