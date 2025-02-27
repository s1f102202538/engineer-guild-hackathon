import { User } from '@prisma/client';

export default interface IUserService {
  GetUser(clientId: string): Promise<User>;

  CreateUser(clientId: string, name: string, weight: number, weightGoal: number): Promise<void>;

  DeleteUser(clientId: string): Promise<void>;

  UpdateUserWeightGoal(clientId: string, weightGoal: number): Promise<void>;

  UpdateUserWeight(clientId: string, weight: number): Promise<void>;
}
