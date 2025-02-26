import { Response } from 'express';
import { Controller, Res, Post, Body } from 'routing-controllers';
import { injectable, inject } from 'inversify';
import IDailyPatienceCalorieService from '../interfaces/IDailyPatienceCalorieService';

import { TYPES } from '../config/types';
import { UserClientIdRequest } from '../models/commonRequest';
import DailyPatienceCalorie from '../models/DailyPatienceCalorieModel';

class GetAllCalorieDataResponse {
  allCalorieData!: DailyPatienceCalorie[];
}

@injectable()
@Controller('/daily-patience-calorie')
export default class DailyPatienceCalorieController {
  private dailyPatienceCalorieService: IDailyPatienceCalorieService;

  constructor(@inject(TYPES.IDailyPatienceCalorieService) dailyPatienceCalorieService: IDailyPatienceCalorieService) {
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
