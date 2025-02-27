import axios from 'axios';

import { UserClientIdRequest } from 'app/types/UserClientIdRequest';

export type TimeUnit = 'day' | 'week' | 'month' | 'year';

export type DailyPatienceCalorie = {
  date: Date;
  calories: number;
};

export type CalorieDataStatistics = {
  periodCalorieData: PeriodCalorieData[];
  averageCalories: number;
};

export type PeriodCalorieData = {
  totalCalories: number;
  startDate: Date;
};

type uploadFoodResponse = {
  calories: number | null;
  message: string;
};

export default class DailyPatienceCalorieService {
  private static readonly baseUrl = `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/daily-patience-calorie`;

  public static async GetTodayCalorieData(clientId: string): Promise<DailyPatienceCalorie> {
    const url = `${this.baseUrl}/get-today-calorie-data`;
    const body = { clientId } as UserClientIdRequest;
    const response = await axios.post<DailyPatienceCalorie>(url, body);

    if (response.status !== 200) {
      throw new Error('DailyPatienceCalorieService:getTodayCalorieData: status is not 200');
    }

    const todayCalorieData = {
      date: response.data.date,
      calories: response.data.calories,
    } as DailyPatienceCalorie;

    return todayCalorieData;
  }

  public static async GetCalorieDataStatistics(clientId: string, timeUnit: TimeUnit): Promise<CalorieDataStatistics> {
    const url = `${this.baseUrl}/get-calorie-data-statistics:${timeUnit}`;
    const body = { clientId, timeUnit } as UserClientIdRequest;
    const response = await axios.post<CalorieDataStatistics>(url, body);

    if (response.status !== 200) {
      throw new Error('DailyPatienceCalorieService:getCalorieDataStatistics: status is not 200');
    }

    const calorieDataStatistics = {
      periodCalorieData: response.data.periodCalorieData,
      averageCalories: response.data.averageCalories,
    } as CalorieDataStatistics;

    return calorieDataStatistics;
  }

  public static async UploadFood(clientId: string, food: string): Promise<{ calories: number; message: string }> {
    const url = `${this.baseUrl}/upload-food`;
    const body = { clientId, food } as UserClientIdRequest;
    const response = await axios.post<uploadFoodResponse>(url, body);

    if (response.status !== 200) {
      throw new Error('DailyPatienceCalorieService:uploadFood: status is not 200');
    }

    if (response.data.calories == null) {
      throw new Error('DailyPatienceCalorieService:uploadFood: calories is null');
    }

    const uploadFoodResponse = {
      calories: response.data.calories,
      message: response.data.message,
    };

    return uploadFoodResponse;
  }
}
