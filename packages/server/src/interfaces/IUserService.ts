import { User } from '@prisma/client';

export default interface IUserService {
  GetUser(clientId: string): Promise<User | null>;

  CreateUser(clientId: string, name: string, weight: number): Promise<void>;

  DeleteUser(clientId: string): Promise<void>;

  GetUserCalorieGoal(clientId: string): Promise<number>;

  UpdateUserCalorieGoal(clientId: string, calorieGoal: number, deadline: Date): Promise<void>;
}
