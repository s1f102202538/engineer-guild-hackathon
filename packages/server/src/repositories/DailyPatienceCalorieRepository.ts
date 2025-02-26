import { injectable } from 'inversify';
import prisma from '../prisma/client';
import { DailyPatienceCalorie } from '@prisma/client';
import IDailyPatienceCalorieRepository from '../interfaces/IDailyPatienceCalorieRepository';

@injectable()
export default class DailyPatienceCalorieRepository implements IDailyPatienceCalorieRepository {
  public async FindTodayData(userId: string): Promise<DailyPatienceCalorie | null> {
    const today = new Date();
    // 日付のみで比較するため、時刻を 0 に設定
    today.setHours(0, 0, 0, 0);

    const data = await prisma.dailyPatienceCalorie.findFirst({
      where: {
        userId,
        createdAt: today,
      },
    });

    return data;
  }

  public async FindAllData(userId: string): Promise<DailyPatienceCalorie[]> {
    const data = await prisma.dailyPatienceCalorie.findMany({
      where: {
        userId,
      },
    });

    return data;
  }

  public async CreateData(userId: string, InitCalorie: number): Promise<void> {
    const date = new Date();
    // 日付のみを保存
    date.setHours(0, 0, 0, 0);

    await prisma.dailyPatienceCalorie.create({
      data: {
        userId,
        date,
        calories: InitCalorie,
      },
    });
  }

  public async UpdateData(userId: string, UpdateCalories: number): Promise<void> {
    const today = new Date();
    // 日付のみで比較するため、時刻を 0 に設定
    today.setHours(0, 0, 0, 0);

    const todayData = await this.FindTodayData(userId);

    if (todayData == null) {
      throw new Error('DailyPatienceCalorieRepository:UpdateData: Data not found');
    }

    await prisma.dailyPatienceCalorie.update({
      where: {
        id: todayData.id,
      },
      data: {
        calories: todayData.calories + UpdateCalories,
      },
    });
  }
}
