import { injectable } from 'inversify';
import prisma from '../prisma/client';
import { DailyPatienceCalorie } from '@prisma/client';
import IDailyPatienceCalorieRepository from '../interfaces/IDailyPatienceCalorieRepository';
import { startOfDay, subDays } from 'date-fns';
import { CalorieDataStatistics, PeriodCalorieData } from '../models/CalorieDataStatistics';

export type TimeUnit = 'day' | 'week' | 'month' | 'year';

type CalorieAggregationResult = { start_date: Date; total_calories: number };

@injectable()
export default class DailyPatienceCalorieRepository implements IDailyPatienceCalorieRepository {
  public async FindTodayData(userId: string): Promise<DailyPatienceCalorie | null> {
    const today = startOfDay(new Date());

    const data = await prisma.dailyPatienceCalorie.findFirst({
      where: {
        userId,
        date: today,
      },
    });

    return data;
  }

  public async CreateData(userId: string, initCalorie: number): Promise<DailyPatienceCalorie> {
    const today = startOfDay(new Date());

    const newData = await prisma.dailyPatienceCalorie.create({
      data: {
        userId,
        date: today,
        calories: initCalorie,
      },
    });

    return newData;
  }

  public async UpdateData(id: number, updateCalories: number): Promise<void> {
    await prisma.dailyPatienceCalorie.update({ where: { id }, data: { calories: updateCalories } });
  }

  public async AggregateCalorieData(userId: string, timeUnit: TimeUnit): Promise<CalorieDataStatistics> {
    try {
      const today = startOfDay(new Date());
      const yearAgo = subDays(today, 365);

      const aggregatedData = await prisma.$queryRaw<CalorieAggregationResult[]>`
        SELECT
          date_trunc(${timeUnit}, date) as start_date,
          SUM(calories) as total_calories
        FROM "DailyPatienceCalorie"
        WHERE "userId" = ${userId}
          AND date >= ${yearAgo}
          AND date <= ${today}
        GROUP BY date_trunc(${timeUnit}, date)
        ORDER BY start_date DESC
      `;

      const periodCalorieData = aggregatedData.map((data) => {
        return {
          totalCalories: data.total_calories,
          startDate: data.start_date,
        } as PeriodCalorieData;
      });

      const averageCalories = periodCalorieData.length
        ? periodCalorieData.reduce((acc, data) => acc + data.totalCalories, 0) / periodCalorieData.length
        : 0;

      return { periodCalorieData, averageCalories };
    } catch (error) {
      console.error('DailyPatienceCalorieRepository:AggregateCalorieData: ', error);
      throw new Error(
        `DailyPatienceCalorieRepository:AggregateCalorieData Failed to aggregate ${timeUnit} calorie data}`
      );
    }
  }
}
