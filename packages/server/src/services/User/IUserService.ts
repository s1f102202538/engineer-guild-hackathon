import { User } from '@prisma/client';
import UserData from '../../models/UserData';

export default interface IUserService {
  GetUser(clientId: string): Promise<User>;

  GetUserData(clientId: string): Promise<UserData | null>;

  CreateUser(clientId: string, name: string, weight: number, weightGoal: number): Promise<void>;

  DeleteUser(clientId: string): Promise<void>;

  GetUserTotalPatienceCalories(clientId: string): Promise<number>;

  UpdateUserTotalPatienceCalories(clientId: string, updateCalories: number): Promise<void>;

  UpdateUserWeightGoal(clientId: string, weightGoal: number): Promise<void>;

  UpdateUserWeight(clientId: string, weight: number): Promise<void>;
}
