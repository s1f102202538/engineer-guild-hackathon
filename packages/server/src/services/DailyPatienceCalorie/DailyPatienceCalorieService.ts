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
    const todayData = await this.dailyPatienceCalorieRepository.FindTodayData(userId);

    if (todayData == null) {
      throw new Error('DailyPatienceCalorieService:UpdateCalorie: Today data not found');
    }

    // 今日のデータがない場合は新規作成
    if (todayData == null) {
      await this.dailyPatienceCalorieRepository.CreateData(userId, updateCalorie);
    } else {
      await this.dailyPatienceCalorieRepository.UpdateData(todayData.id, updateCalorie);
    }
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
