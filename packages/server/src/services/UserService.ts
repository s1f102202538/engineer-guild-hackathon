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

  public async CreateUser(clientId: string, name: string): Promise<void> {
    await this.userRepository.CreateUser(clientId, name);
  }

  public async DeleteUser(clientId: string): Promise<void> {
    await this.userRepository.DeleteUser(clientId);
  }
}
