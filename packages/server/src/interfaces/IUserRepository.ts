import { User, CaloriesGoal } from '@prisma/client';

export default interface IUserRepository {
  FindUserByClientId(clientId: string): Promise<User>;

  CreateUser(clientId: string, name: string, weight: number): Promise<void>;

  DeleteUser(clientId: string): Promise<void>;

  FindUserCalorieGoal(clientId: string): Promise<CaloriesGoal>;

  CreateUserCalorieGoal(clientId: string, calorieGoal: number, deadline: Date): Promise<void>;

  UpdateUserCalorieGoal(id: number, calorieGoal: number, deadline: Date): Promise<void>;
}
