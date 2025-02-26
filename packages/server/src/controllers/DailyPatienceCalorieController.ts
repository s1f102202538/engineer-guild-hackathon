import { Response } from 'express';
import { Controller, Res, Post, Body } from 'routing-controllers';
import { injectable, inject } from 'inversify';

import IDailyPatienceCalorieService from '../interfaces/IDailyPatienceCalorieService';
import OpenAIService from '../services/OpenAIService';

import { TYPES } from '../config/types';
import { UserClientIdRequest } from '../models/commonRequest';
import { IsString, IsNotEmpty } from 'class-validator';

import DailyPatienceCalorieModel from '../models/DailyPatienceCalorieModel';

class DailyCalorieDataResponse {
  todayCalorieData!: DailyPatienceCalorieModel;
}

class GetAllCalorieDataResponse {
  allCalorieData!: DailyPatienceCalorieModel[];
}

class ConvertFoodToCaloriesRequest {
  @IsString()
  @IsNotEmpty()
  food!: string;

  @IsString()
  @IsNotEmpty()
  userId!: string;
}

class ConvertFoodToCaloriesResponse {
  calories?: number;
  message?: string;
}

@injectable()
@Controller('/daily-patience-calorie')
export default class DailyPatienceCalorieController {
  private dailyPatienceCalorieService: IDailyPatienceCalorieService;
  private openAI: OpenAIService;

  constructor(
    @inject(TYPES.IDailyPatienceCalorieService) dailyPatienceCalorieService: IDailyPatienceCalorieService,
    @inject(TYPES.OpenAIService) openAI: OpenAIService
  ) {
    this.dailyPatienceCalorieService = dailyPatienceCalorieService;
    this.openAI = openAI;
  }

  @Post('/get-today-calorie-data')
  async getDailyCalorieData(
    @Body() userClientIdRequest: UserClientIdRequest,
    @Res() response: Response<DailyCalorieDataResponse>
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

  @Post('/get-all-calorie-data')
  async getAllCalorieData(
    @Body() userClientIdRequest: UserClientIdRequest,
    @Res() response: Response<GetAllCalorieDataResponse>
  ) {
    try {
      const { clientId } = userClientIdRequest;
      const data = await this.dailyPatienceCalorieService.GetAllCalorieData(clientId);

      const allCalorieData = data.map((dailyCalorieData) => {
        return {
          date: dailyCalorieData.date,
          calories: dailyCalorieData.calories,
        } as DailyPatienceCalorieModel;
      });

      return response.status(200).send({ allCalorieData });
    } catch (error) {
      console.error('DailyPatienceCalorieController:getAllCalorieData: ', error);
      return response.status(500);
    }
  }

  @Post('/upload-food')
  async convertFoodToCalories(
    @Body() convertFoodToCaloriesRequest: ConvertFoodToCaloriesRequest,
    @Res() response: Response<ConvertFoodToCaloriesResponse>
  ) {
    try {
      const { food, userId } = convertFoodToCaloriesRequest;
      const calories = await this.openAI.ConvertFoodToCalories(food);

      if (calories !== null) {
        // カロリーをDBに更新
        await this.dailyPatienceCalorieService.UpdateCalorie(userId, calories);
        return response.status(200).send({ calories });
      } else {
        return response.status(400).send({ message: '正しく更新できませんでした' });
      }
    } catch (error) {
      console.error('DailyPatienceCalorieController:convertFoodToCalories: ', error);
      return response.status(500).send({ message: 'サーバーエラーが発生しました' });
    }
  }
}
