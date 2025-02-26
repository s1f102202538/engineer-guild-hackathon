import { injectable, inject } from 'inversify';
import IUserRepository from '../interfaces/IUserRepository';
import IUserService from '../interfaces/IUserService';

import { TYPES } from '../config/types';
import { User } from '@prisma/client';

@injectable()
export default class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor(@inject(TYPES.IUserRepository) userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async GetUser(clientId: string): Promise<User | null> {
    try {
      return await this.userRepository.FindUserByClientId(clientId);
    } catch {
      return null;
    }
  }

  public async CreateUser(clientId: string, name: string, weight: number): Promise<void> {
    await this.userRepository.CreateUser(clientId, name, weight);
  }

  public async DeleteUser(clientId: string): Promise<void> {
    await this.userRepository.DeleteUser(clientId);
  }

  public async GetUserCalorieGoal(clientId: string): Promise<number> {
    const calorieGoal = await this.userRepository.FindUserCalorieGoal(clientId);
    return calorieGoal.calorieGoal;
  }

  public async UpdateUserCalorieGoal(clientId: string, calorieGoal: number, deadline: Date): Promise<void> {
    const calorieGoalData = await this.userRepository.FindUserCalorieGoal(clientId);

    if (calorieGoalData == null) {
      await this.userRepository.CreateUserCalorieGoal(clientId, calorieGoal, deadline);
    } else {
      await this.userRepository.UpdateUserCalorieGoal(calorieGoalData.id, calorieGoal, deadline);
    }
  }
}
