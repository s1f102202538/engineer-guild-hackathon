import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import UserRepository from '../repositories/UserRepository';
import { TYPES } from '../config/types';
import { User } from '@prisma/client';

@injectable()
export default class UserService {
  private userRepository: UserRepository;

  constructor(@inject(TYPES.UserRepository) userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async GetUser(clientId: string): Promise<User> {
    return await this.userRepository.FindUserByClientId(clientId);
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
