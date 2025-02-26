import { DailyPatienceCalorie } from '@prisma/client';
import { TimeUnit } from '../repositories/DailyPatienceCalorieRepository';
import { CalorieDataStatistics } from '../models/CalorieDataStatistics';

export default interface IDailyPatienceCalorieService {
  UpdateCalorie(userId: string, updateCalorie: number): Promise<void>;

  GetTodayCalorieData(userId: string): Promise<DailyPatienceCalorie>;

  GetCalorieDataStatistics(userId: string, timeUnit: TimeUnit): Promise<CalorieDataStatistics>;
}
