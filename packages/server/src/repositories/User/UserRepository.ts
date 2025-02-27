import { injectable } from 'inversify';
import prisma from '../../prisma/client';
import { User } from '@prisma/client';
import IUserRepository from './IUserRepository';

@injectable()
export default class UserRepository implements IUserRepository {
  public async FindUserByClientId(clientId: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { clientId } });
  }

  public async CreateUser(clientId: string, name: string, weight: number): Promise<void> {
    await prisma.user.create({ data: { clientId, name, weight } });
  }

  public async DeleteUser(clientId: string): Promise<void> {
    await prisma.user.delete({ where: { clientId } });
  }

  public async UpdateUserWeightGoal(id: string, weightGoal: number): Promise<void> {
    await prisma.user.update({ where: { id }, data: { weightGoal } });
  }

  public async UpdateUserWeight(id: string, weight: number): Promise<void> {
    await prisma.user.update({ where: { id }, data: { weight } });
  }
}
