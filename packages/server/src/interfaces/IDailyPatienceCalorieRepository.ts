import { DailyPatienceCalorie } from '@prisma/client';

export default interface IDailyPatienceCalorieRepository {
  FindTodayData(userId: string): Promise<DailyPatienceCalorie | null>;

  FindAllData(userId: string): Promise<DailyPatienceCalorie[]>;

  CreateData(userId: string, InitCalorie: number): Promise<DailyPatienceCalorie>;

  UpdateData(userId: string, UpdateCalories: number): Promise<void>;
}
