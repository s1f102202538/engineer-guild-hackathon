import { User } from '@prisma/client';

export default interface IUserRepository {
  FindUserByClientId(clientId: string): Promise<User | null>;

  CreateUser(clientId: string, name: string, weight: number, weightGoal: number): Promise<void>;

  DeleteUser(clientId: string): Promise<void>;

  UpdateUserTotalPatienceCalories(id: string, updateCalories: number): Promise<void>;

  UpdateUserWeightGoal(id: string, weightGoal: number): Promise<void>;

  UpdateUserWeight(id: string, weight: number): Promise<void>;
}
