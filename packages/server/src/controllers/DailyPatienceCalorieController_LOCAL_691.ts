import 'reflect-metadata';
import { Response } from 'express';
import { Controller, Res, Post, Body } from 'routing-controllers';
import { injectable, inject } from 'inversify';
import DailyPatienceCalorieService from '../services/DailyPatienceCalorieService';
import OpenAIService from '../services/OpenAIService';

import { TYPES } from '../config/types';
import { UserClientIdRequest } from '../models/commonRequest';
import { IsString, IsNotEmpty } from 'class-validator';
import DailyPatienceCalorie from '../models/DailyPatienceCalorie';

class GetAllCalorieDataResponse {
  allCalorieData!: DailyPatienceCalorie[];
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
  private dailyPatienceCalorieService: DailyPatienceCalorieService;
  private openAI: OpenAIService;

  constructor(
    @inject(TYPES.DailyPatienceCalorieService) dailyPatienceCalorieService: DailyPatienceCalorieService,
    @inject(TYPES.OpenAIService) openAI: OpenAIService
  ) {
    this.dailyPatienceCalorieService = dailyPatienceCalorieService;
    this.openAI = openAI;
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
        } as DailyPatienceCalorie;
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
