import { DailyPatienceCalorie } from '@prisma/client';
import { TimeUnit } from './DailyPatienceCalorieRepository';
import { CalorieDataStatistics } from '../../models/CalorieDataStatistics';

export default interface IDailyPatienceCalorieRepository {
  FindTodayData(userId: string): Promise<DailyPatienceCalorie | null>;

  CreateData(userId: string, InitCalorie: number): Promise<DailyPatienceCalorie>;

  UpdateData(id: number, UpdateCalories: number): Promise<void>;

  AggregateCalorieData(userId: string, timeUnit: TimeUnit): Promise<CalorieDataStatistics>;
}
