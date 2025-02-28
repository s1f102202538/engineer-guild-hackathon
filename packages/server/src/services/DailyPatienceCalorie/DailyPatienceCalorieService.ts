import { injectable, inject } from 'inversify';
import IDailyPatienceCalorieRepository from '../../repositories/DailyPatienceCalorie/IDailyPatienceCalorieRepository';
import IDailyPatienceCalorieService from './IDailyPatienceCalorieService';

import { TYPES } from '../../config/types';
import { DailyPatienceCalorie } from '@prisma/client';
import { TimeUnit } from '../../repositories/DailyPatienceCalorie/DailyPatienceCalorieRepository';
import { CalorieDataStatistics } from '../../models/CalorieDataStatistics';

@injectable()
export default class DailyPatienceCalorieService implements IDailyPatienceCalorieService {
  private dailyPatienceCalorieRepository: IDailyPatienceCalorieRepository;

  constructor(
    @inject(TYPES.IDailyPatienceCalorieRepository) dailyPatienceCalorieRepository: IDailyPatienceCalorieRepository
  ) {
    this.dailyPatienceCalorieRepository = dailyPatienceCalorieRepository;
  }

  public async UpdateCalorie(userId: string, updateCalorie: number): Promise<void> {
    const todayData = await this.GetTodayCalorieData(userId);

    const newCalorieValue = todayData.calories + updateCalorie;
    await this.dailyPatienceCalorieRepository.UpdateData(todayData.id, newCalorieValue);
  }

  public async GetTodayCalorieData(userId: string): Promise<DailyPatienceCalorie> {
    let todayData = await this.dailyPatienceCalorieRepository.FindTodayData(userId);

    if (todayData == null) {
      todayData = await this.dailyPatienceCalorieRepository.CreateData(userId, 0);
    }

    return todayData;
  }

  public async GetCalorieDataStatistics(userId: string, timeUnit: TimeUnit): Promise<CalorieDataStatistics> {
    return this.dailyPatienceCalorieRepository.AggregateCalorieData(userId, timeUnit);
  }
}
