export class CalorieDataStatistics {
  periodCalorieData!: PeriodCalorieData[];

  averageCalories!: number;
}

export class PeriodCalorieData {
  totalCalories!: number;

  startDate!: Date;
}
