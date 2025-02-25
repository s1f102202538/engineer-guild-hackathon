import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import DailyPatienceCalorieRepository from '../repositories/DailyPatienceCalorieRepository';
import { TYPES } from '../config/types';
import { DailyPatienceCalorie } from '@prisma/client';

@injectable()
export default class DailyPatienceCalorieService {
  private dailyPatienceCalorieRepository: DailyPatienceCalorieRepository;

  constructor(
    @inject(TYPES.DailyPatienceCalorieRepository) dailyPatienceCalorieRepository: DailyPatienceCalorieRepository
  ) {
    this.dailyPatienceCalorieRepository = dailyPatienceCalorieRepository;
  }

  public async UpdateCalorie(userId: string, updateCalorie: number): Promise<void> {
    const todayData = await this.dailyPatienceCalorieRepository.FindTodayData(userId);

    // 今日のデータがない場合は新規作成
    if (todayData == null) {
      await this.dailyPatienceCalorieRepository.CreateData(userId, updateCalorie);
    } else {
      await this.dailyPatienceCalorieRepository.UpdateData(userId, updateCalorie);
    }
  }

  public async GetAllCalorieData(userId: string): Promise<DailyPatienceCalorie[]> {
    return await this.dailyPatienceCalorieRepository.FindAllData(userId);
  }
}
