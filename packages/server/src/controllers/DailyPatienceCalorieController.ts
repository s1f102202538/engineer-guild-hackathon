import { Response } from 'express';
import { Controller, Res, Post, Body, Param } from 'routing-controllers';
import { injectable, inject } from 'inversify';

import IDailyPatienceCalorieService from '../services/DailyPatienceCalorie/IDailyPatienceCalorieService';
import IOpenAIService from '../services/OpenAI/IOpenAIService';
import IUserService from '../services/User/IUserService';

import { TYPES } from '../config/types';
import { UserClientIdRequest } from '../models/commonRequest';
import { IsString, IsNotEmpty } from 'class-validator';

import DailyPatienceCalorieModel from '../models/DailyPatienceCalorieModel';
import { CalorieDataStatistics } from '../models/CalorieDataStatistics';
import { TimeUnit } from '../repositories/DailyPatienceCalorie/DailyPatienceCalorieRepository';
import logger from '../config/logger';

class CalorieDataStatisticsResponse {
  calorieDataStatistics!: CalorieDataStatistics;
}

class UploadFoodRequest {
  @IsString()
  @IsNotEmpty()
  food!: string;

  @IsString()
  @IsNotEmpty()
  clientId!: string;
}

class UploadFoodResponse {
  calories!: number | null;
  message!: string;
}

@injectable()
@Controller('/daily-patience-calorie')
export default class DailyPatienceCalorieController {
  private dailyPatienceCalorieService: IDailyPatienceCalorieService;
  private openAIService: IOpenAIService;
  private userService: IUserService;

  constructor(
    @inject(TYPES.IDailyPatienceCalorieService) dailyPatienceCalorieService: IDailyPatienceCalorieService,
    @inject(TYPES.IOpenAIService) openAI: IOpenAIService,
    @inject(TYPES.IUserService) userService: IUserService
  ) {
    this.dailyPatienceCalorieService = dailyPatienceCalorieService;
    this.openAIService = openAI;
    this.userService = userService;
  }

  @Post('/get-today-calorie-data')
  async getDailyCalorieData(
    @Body() userClientIdRequest: UserClientIdRequest,
    @Res() response: Response<DailyPatienceCalorieModel>
  ) {
    try {
      const { clientId } = userClientIdRequest;
      const user = await this.userService.GetUser(clientId);

      const todayCalorieData = await this.dailyPatienceCalorieService.GetTodayCalorieData(user.id);

      return response.status(200).send({ date: todayCalorieData.date, calories: todayCalorieData.calories });
    } catch (error) {
      logger.error('DailyPatienceCalorieController:getDailyCalorieData: ', error);
      return response.status(500);
    }
  }

  @Post('/upload-food')
  async uploadFood(@Body() uploadFoodRequest: UploadFoodRequest, @Res() response: Response<UploadFoodResponse>) {
    try {
      const { food, clientId } = uploadFoodRequest;
      const userId = await this.userService.GetUser(clientId);
      const calories = await this.openAIService.ConvertFoodToCalories(food);

      let message = '';
      if (calories !== null) {
        // カロリーを更新
        await this.dailyPatienceCalorieService.UpdateCalorie(userId.id, calories);
        // ユーザーの総我慢カロリーを更新
        await this.userService.UpdateUserTotalPatienceCalories(clientId, calories);
        // 褒め言葉を生成
        message = await this.openAIService.PraiseCaloriePatience(calories);
      }

      return response.status(200).send({ calories, message });
    } catch (error) {
      logger.error('DailyPatienceCalorieController:convertFoodToCalories: ', error);
      return response.status(500);
    }
  }

  @Post('/get-calorie-data-statistics/:timeUnit')
  async getDailyStatistics(
    @Param('timeUnit') timeUnit: TimeUnit,
    @Body() userClientIdRequest: UserClientIdRequest,
    @Res() response: Response<CalorieDataStatisticsResponse>
  ) {
    try {
      const { clientId } = userClientIdRequest;
      const user = await this.userService.GetUser(clientId);
      const data = await this.dailyPatienceCalorieService.GetCalorieDataStatistics(user.id, timeUnit);

      return response.status(200).send({ calorieDataStatistics: data });
    } catch (error) {
      logger.error('DailyPatienceCalorieController:getDailyStatistics: ', error);
      return response.status(500);
    }
  }
}
