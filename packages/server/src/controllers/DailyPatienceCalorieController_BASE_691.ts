import 'reflect-metadata';
import { Response } from 'express';
import { Controller, Res, Post, Body } from 'routing-controllers';
import { injectable, inject } from 'inversify';
import DailyPatienceCalorieService from '../services/DailyPatienceCalorieService';

import { TYPES } from '../config/types';
import { UserClientIdRequest } from '../models/commonRequest';
import DailyPatienceCalorie from '../models/DailyPatienceCalorie';

class GetAllCalorieDataResponse {
  allCalorieData!: DailyPatienceCalorie[];
}

@injectable()
@Controller('/daily-patience-calorie')
export default class DailyPatienceCalorieController {
  private dailyPatienceCalorieService: DailyPatienceCalorieService;

  constructor(@inject(TYPES.DailyPatienceCalorieService) dailyPatienceCalorieService: DailyPatienceCalorieService) {
    this.dailyPatienceCalorieService = dailyPatienceCalorieService;
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
}
