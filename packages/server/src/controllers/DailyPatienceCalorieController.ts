import { Response } from 'express';
import { Controller, Res, Post, Body, Param } from 'routing-controllers';
import { injectable, inject } from 'inversify';

import IDailyPatienceCalorieService from '../services/DailyPatienceCalorie/IDailyPatienceCalorieService';
import IOpenAIService from '../services/OpenAI/IOpenAIService';

import { TYPES } from '../config/types';
import { UserClientIdRequest } from '../models/commonRequest';
import { IsString, IsNotEmpty } from 'class-validator';

import DailyPatienceCalorieModel from '../models/DailyPatienceCalorieModel';
import { CalorieDataStatistics } from '../models/CalorieDataStatistics';
import { TimeUnit } from '../repositories/DailyPatienceCalorie/DailyPatienceCalorieRepository';
import logger from '../config/logger';

class TodayCalorieDataResponse {
  todayCalorieData!: DailyPatienceCalorieModel;
}

class CalorieDataStatisticsResponse {
  calorieDataStatistics!: CalorieDataStatistics;
}

class UploadFoodRequest {
  @IsString()
  @IsNotEmpty()
  food!: string;

  @IsString()
  @IsNotEmpty()
  userId!: string;
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

  constructor(
    @inject(TYPES.IDailyPatienceCalorieService) dailyPatienceCalorieService: IDailyPatienceCalorieService,
    @inject(TYPES.IOpenAIService) openAI: IOpenAIService
  ) {
    this.dailyPatienceCalorieService = dailyPatienceCalorieService;
    this.openAIService = openAI;
  }

  @Post('/get-today-calorie-data')
  async getDailyCalorieData(
    @Body() userClientIdRequest: UserClientIdRequest,
    @Res() response: Response<TodayCalorieDataResponse>
  ) {
    try {
      const { clientId } = userClientIdRequest;
      const data = await this.dailyPatienceCalorieService.GetTodayCalorieData(clientId);

      const todayCalorieData = {
        date: data.date,
        calories: data.calories,
      } as DailyPatienceCalorieModel;

      return response.status(200).send({ todayCalorieData });
    } catch (error) {
      logger.error('DailyPatienceCalorieController:getDailyCalorieData: ', error);
      return response.status(500);
    }
  }

  @Post('/upload-food')
  async uploadFood(@Body() uploadFoodRequest: UploadFoodRequest, @Res() response: Response<UploadFoodResponse>) {
    try {
      const { food, userId } = uploadFoodRequest;
      const calories = await this.openAIService.ConvertFoodToCalories(food);

      let message = '';
      if (calories !== null) {
        // カロリーを更新
        await this.dailyPatienceCalorieService.UpdateCalorie(userId, calories);
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
      const data = await this.dailyPatienceCalorieService.GetCalorieDataStatistics(clientId, timeUnit);

      return response.status(200).send({ calorieDataStatistics: data });
    } catch (error) {
      logger.error('DailyPatienceCalorieController:getDailyStatistics: ', error);
      return response.status(500);
    }
  }
}
