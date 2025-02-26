import 'reflect-metadata';
import { Response } from 'express';
import { Controller, Res, Post, Body, Delete } from 'routing-controllers';
import { injectable, inject } from 'inversify';
import UserService from '../services/UserService';

import { TYPES } from '../config/types';
import { IsAlpha, IsDate, IsNumber } from 'class-validator';
import { UserClientIdRequest } from '../models/commonRequest';
import UserData from '../models/UserData';

class CreateUserRequest {
  @IsAlpha()
  clientId!: string;

  @IsAlpha()
  name!: string;

  @IsNumber()
  weight!: number;
}

class UpdateCalorieGoalRequest {
  @IsAlpha()
  clientId!: string;

  @IsNumber()
  calorieGoal!: number;

  @IsDate()
  deadline!: Date;
}

class UserCalorieGoalResponse {
  calorieGoal!: number;

  deadline!: Date;
}

class GetUserDataResponse {
  userData!: UserData | null;
}

@injectable()
@Controller('/user')
export default class UserController {
  private userService: UserService;

  constructor(@inject(TYPES.UserService) userService: UserService) {
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

  @Post('/get-calorie-goal')
  async getUserCalorieGoal(
    @Body() userClientIdRequest: UserClientIdRequest,
    @Res() response: Response<UserCalorieGoalResponse>
  ) {
    try {
      const { clientId } = userClientIdRequest;
      const calorieGoal = await this.userService.GetUserCalorieGoal(clientId);

      return response.status(200).send({ calorieGoal } as UserCalorieGoalResponse);
    } catch (error) {
      console.error('UserController:getUserCalorieGoal: ', error);
      return response.status(500);
    }
  }

  @Post('/update-calorie-goal')
  async updateUserCalorieGoal(@Body() updateCalorieGoalRequest: UpdateCalorieGoalRequest, @Res() response: Response) {
    try {
      const { clientId, calorieGoal, deadline } = updateCalorieGoalRequest;

      await this.userService.UpdateUserCalorieGoal(clientId, calorieGoal, deadline);

      return response.status(200).send('User calorie goal updated');
    } catch (error) {
      console.error('UserController:updateUserCalorieGoal: ', error);
      return response.status(500);
    }
  }
}
