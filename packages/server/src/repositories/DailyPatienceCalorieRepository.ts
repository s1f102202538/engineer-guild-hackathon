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
        date: today,
      },
    });

    return data;
  }

  public async CreateData(userId: string, InitCalorie: number): Promise<DailyPatienceCalorie> {
    const date = new Date();
    // 日付のみを保存
    date.setHours(0, 0, 0, 0);

    const newData = await prisma.dailyPatienceCalorie.create({
      data: {
        userId,
        date,
        calories: InitCalorie,
      },
    });

    return newData;
  }

  public async UpdateData(id: number, UpdateCalories: number): Promise<void> {
    await prisma.dailyPatienceCalorie.update({ where: { id }, data: { calories: UpdateCalories } });
  }
}
