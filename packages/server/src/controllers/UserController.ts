import { Response } from 'express';
import { Controller, Res, Post, Body, Delete } from 'routing-controllers';
import { injectable, inject } from 'inversify';
import IUserService from '../services/User/IUserService';

import { TYPES } from '../config/types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UserClientIdRequest } from '../models/commonRequest';
import UserData from '../models/UserData';

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
}

class UpdateWeightGoalRequest {
  @IsString()
  @IsNotEmpty()
  clientId!: string;

  @IsNumber()
  @IsNotEmpty()
  weightGoal!: number;
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
        } as UserData;
      }

      return response.status(200).send({ userData });
    } catch (error) {
      console.error('UserController:getUser: ', error);
      return response.status(500);
    }
  }

  @Post('/create')
  async createUser(@Body() createUserRequest: CreateUserRequest, @Res() response: Response) {
    try {
      const { clientId, name, weight } = createUserRequest;

      await this.userService.CreateUser(clientId, name, weight);

      return response.status(200).send('User created');
    } catch (error) {
      console.error('UserController:createUser: ', error);
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
      console.error('UserController:deleteUser: ', error);
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
      console.error('UserController:updateUserCalorieGoal: ', error);
      return response.status(500);
    }
  }
}
