import { DailyPatienceCalorie } from '@prisma/client';

export default interface IDailyPatienceCalorieService {
  UpdateCalorie(userId: string, updateCalorie: number): Promise<void>;

  GetAllCalorieData(userId: string): Promise<DailyPatienceCalorie[]>;
}
