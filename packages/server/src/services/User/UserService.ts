import { injectable, inject } from 'inversify';
import IUserRepository from '../../repositories/User/IUserRepository';
import IUserService from './IUserService';

import { TYPES } from '../../config/types';
import { User } from '@prisma/client';

@injectable()
export default class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor(@inject(TYPES.IUserRepository) userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async GetUser(clientId: string): Promise<User> {
    const user = await this.userRepository.FindUserByClientId(clientId);
    if (user == null) {
      throw new Error('UserRepository:FindUserByClientId: User not found');
    }

    return user;
  }

  public async CreateUser(clientId: string, name: string, weight: number): Promise<void> {
    // user が既に存在しているか確認
    const user = await this.userRepository.FindUserByClientId(clientId);
    if (user != null) {
      throw new Error('UserService:CreateUser: User already exists');
    }

    await this.userRepository.CreateUser(clientId, name, weight);
  }

  public async DeleteUser(clientId: string): Promise<void> {
    try {
      await this.userRepository.DeleteUser(clientId);
    } catch {
      throw new Error('UserService:DeleteUser: User not found or failed to delete');
    }
  }

  public async UpdateUserWeightGoal(clientId: string, weightGoal: number): Promise<void> {
    const user = await this.userRepository.FindUserByClientId(clientId);
    if (user == null) {
      throw new Error('UserService:UpdateUserWeightGoal: User not found');
    }

    await this.userRepository.UpdateUserWeightGoal(user.id, weightGoal);
  }

  public async UpdateUserWeight(clientId: string, weight: number): Promise<void> {
    const user = await this.userRepository.FindUserByClientId(clientId);
    if (user == null) {
      throw new Error('UserService:UpdateUserWeight: User not found');
    }

    await this.userRepository.UpdateUserWeight(user.id, weight);
  }
}
