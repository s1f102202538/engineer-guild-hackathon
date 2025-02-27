import { Response } from 'express';
import { Controller, Res, Post, Body, Delete } from 'routing-controllers';
import { injectable, inject } from 'inversify';
import IUserService from '../services/User/IUserService';

import { TYPES } from '../config/types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UserClientIdRequest } from '../models/commonRequest';
import UserData from '../models/UserData';
import logger from '../config/logger';

class CreateUserRequest {
  @IsString()
  @IsNotEmpty()
  clientId!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNumber()
  @IsNotEmpty()
  weight!: number;

  @IsNumber()
  @IsNotEmpty()
  weightGoal!: number;
}

class UpdateWeightGoalRequest {
  @IsString()
  @IsNotEmpty()
  clientId!: string;

  @IsNumber()
  @IsNotEmpty()
  weightGoal!: number;
}

class UpdateWeightRequest {
  @IsString()
  @IsNotEmpty()
  clientId!: string;

  @IsNumber()
  @IsNotEmpty()
  weight!: number;
}

class GetUserDataResponse {
  userData!: UserData | null;
}

@injectable()
@Controller('/user')
export default class UserController {
  private userService: IUserService;

  constructor(@inject(TYPES.IUserService) userService: IUserService) {
    this.userService = userService;
  }

  @Post('/get')
  async getUserName(@Body() userClientIdRequest: UserClientIdRequest, @Res() response: Response<GetUserDataResponse>) {
    try {
      const { clientId } = userClientIdRequest;
      const user = await this.userService.GetUser(clientId);

      let userData: UserData | null = null;
      if (user != null) {
        userData = {
          name: user.name,
          weight: user.weight,
          weightGoal: user.weightGoal,
        } as UserData;
      }

      return response.status(200).send({ userData });
    } catch (error) {
      logger.error('UserController:getUser: ', error);
      return response.status(500);
    }
  }

  @Post('/create')
  async createUser(@Body() createUserRequest: CreateUserRequest, @Res() response: Response) {
    try {
      const { clientId, name, weight, weightGoal } = createUserRequest;

      await this.userService.CreateUser(clientId, name, weight);

      return response.status(200).send('User created');
    } catch (error) {
      logger.error('UserController:createUser: ', error);
      return response.status(500);
    }
  }

  @Delete('/delete')
  async deleteUser(@Body() userClientIdRequest: UserClientIdRequest, @Res() response: Response) {
    try {
      const { clientId } = userClientIdRequest;

      await this.userService.DeleteUser(clientId);

      return response.status(200).send('User deleted');
    } catch (error) {
      logger.error('UserController:deleteUser: ', error);
      return response.status(500);
    }
  }

  @Post('/update-weight-goal')
  async updateUserWeightGoal(@Body() updateWeightGoalRequest: UpdateWeightGoalRequest, @Res() response: Response) {
    try {
      const { clientId, weightGoal } = updateWeightGoalRequest;

      await this.userService.UpdateUserWeightGoal(clientId, weightGoal);

      return response.status(200).send('User calorie goal updated');
    } catch (error) {
      logger.error('UserController:updateUserCalorieGoal: ', error);
      return response.status(500);
    }
  }

  @Post('/update-weight')
  async updateUserWeight(@Body() updateWeightRequest: UpdateWeightRequest, @Res() response: Response) {
    try {
      const { clientId, weight } = updateWeightRequest;

      await this.userService.UpdateUserWeight(clientId, weight);

      return response.status(200).send('User weight updated');
    } catch (error) {
      logger.error('UserController:updateUserWeight: ', error);
      return response.status(500);
    }
  }
}
