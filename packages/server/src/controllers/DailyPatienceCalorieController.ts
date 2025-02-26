import { Response } from 'express';
import { Controller, Res, Post, Body } from 'routing-controllers';
import { injectable, inject } from 'inversify';

import IDailyPatienceCalorieService from '../interfaces/IDailyPatienceCalorieService';
import OpenAIService from '../services/OpenAIService';

import { TYPES } from '../config/types';
import { UserClientIdRequest } from '../models/commonRequest';
import { IsString, IsNotEmpty } from 'class-validator';

import DailyPatienceCalorieModel from '../models/DailyPatienceCalorieModel';

class TodayCalorieDataResponse {
  todayCalorieData!: DailyPatienceCalorieModel;
}

// class CalorieDataStatisticsResponse {
//   totalCalories!: number;

//   averageCalories!: number;

//   startDate!: Date;
// }

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
}

@injectable()
@Controller('/daily-patience-calorie')
export default class DailyPatienceCalorieController {
  private dailyPatienceCalorieService: IDailyPatienceCalorieService;
  private openAIService: OpenAIService;

  constructor(
    @inject(TYPES.IDailyPatienceCalorieService) dailyPatienceCalorieService: IDailyPatienceCalorieService,
    @inject(TYPES.OpenAIService) openAI: OpenAIService
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
      console.error('DailyPatienceCalorieController:getDailyCalorieData: ', error);
      return response.status(500);
    }
  }

  @Post('/upload-food')
  async uploadFood(@Body() uploadFoodRequest: UploadFoodRequest, @Res() response: Response<UploadFoodResponse>) {
    try {
      const { food, userId } = uploadFoodRequest;
      const calories = await this.openAIService.ConvertFoodToCalories(food);

      if (calories !== null) {
        // カロリーを更新
        await this.dailyPatienceCalorieService.UpdateCalorie(userId, calories);
      }

      return response.status(200).send({ calories });
    } catch (error) {
      console.error('DailyPatienceCalorieController:convertFoodToCalories: ', error);
      return response.status(500);
    }
  }

  /*
  @Post('/get-daily-statistics')
  async getDailyStatistics(
    @Body() userClientIdRequest: UserClientIdRequest,
    @Res() response: Response<CalorieDataStatisticsResponse>
  ) {
    try {
    } catch (error) {
      console.error('DailyPatienceCalorieController:getDailyStatistics: ', error);
      return response.status(500);
    }
  }

  @Post('/get-weekly-statistics')
  async getWeeklyStatistics(
    @Body() userClientIdRequest: UserClientIdRequest,
    @Res() response: Response<CalorieDataStatisticsResponse>
  ) {
    try {
    } catch (error) {
      console.error('DailyPatienceCalorieController:getDailyStatistics: ', error);
      return response.status(500);
    }
  }

  @Post('/get-monthly-statistics')
  async getMonthlyStatistics(
    @Body() userClientIdRequest: UserClientIdRequest,
    @Res() response: Response<CalorieDataStatisticsResponse>
  ) {
    try {
    } catch (error) {
      console.error('DailyPatienceCalorieController:getDailyStatistics: ', error);
      return response.status(500);
    }
  }

  @Post('/get-yearly-statistics')
  async getYearlyStatistics(
    @Body() userClientIdRequest: UserClientIdRequest,
    @Res() response: Response<CalorieDataStatisticsResponse>
  ) {
    try {
    } catch (error) {
      console.error('DailyPatienceCalorieController:getDailyStatistics: ', error);
      return response.status(500);
    }
  }
  */
}
