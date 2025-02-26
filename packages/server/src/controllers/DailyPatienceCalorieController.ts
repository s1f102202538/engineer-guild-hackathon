import 'reflect-metadata';
import { Response } from 'express';
import { Controller, Res, Post, Body } from 'routing-controllers';
import { injectable, inject } from 'inversify';
import DailyPatienceCalorieService from '../services/DailyPatienceCalorieService';
import OpenAI from '../services/OpenAI';

import { TYPES } from '../config/types';
import { UserClientIdRequest } from '../models/commonRequest';
import DailyPatienceCalorie from '../models/DailyPatienceCalorie';

class GetAllCalorieDataResponse {
  allCalorieData!: DailyPatienceCalorie[];
}

class ConvertFoodToCaloriesRequest {
  food!: string;
  userId!: string;
}

class ConvertFoodToCaloriesResponse {
  calories!: number;
}

@injectable()
@Controller('/daily-patience-calorie')
export default class DailyPatienceCalorieController {
  private dailyPatienceCalorieService: DailyPatienceCalorieService;
  private openAI: OpenAI;

  constructor(
    @inject(TYPES.DailyPatienceCalorieService) dailyPatienceCalorieService: DailyPatienceCalorieService,
    openAI: OpenAI
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

  @Post('/convert-food-to-calories')
  async convertFoodToCalories(
    @Body() convertFoodToCaloriesRequest: ConvertFoodToCaloriesRequest,
    @Res() response: Response<ConvertFoodToCaloriesResponse>
  ) {
    try {
      const { food, userId } = convertFoodToCaloriesRequest;
      const calories = await this.openAI.ConvertFoodToCalories(food);
      // カロリーをDBに更新
      await this.dailyPatienceCalorieService.UpdateCalorie(userId, calories);

      return response.status(200).send({ calories });
    } catch (error) {
      console.error('DailyPatienceCalorieController:convertFoodToCalories: ', error);
      return response.status(500);
    }
  }
}
