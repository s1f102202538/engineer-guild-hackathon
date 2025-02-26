import { DailyPatienceCalorie } from '@prisma/client';

export default interface IDailyPatienceCalorieService {
  UpdateCalorie(userId: string, updateCalorie: number): Promise<void>;

  GetTodayCalorieData(userId: string): Promise<DailyPatienceCalorie>;

  GetAllCalorieData(userId: string): Promise<DailyPatienceCalorie[]>;
}
