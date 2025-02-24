import 'reflect-metadata';
import { injectable } from 'inversify';
import prisma from '../prisma/client';
import { User } from '@prisma/client';

@injectable()
export default class UserRepository {
  public async FindUserByClientId(clientId: string): Promise<User> {
    const user = await prisma.user.findUnique({ where: { clientId } });
    // 存在しているかチェック
    if (user == null) {
      throw new Error('UserRepository: User not found');
    }

    return user;
  }

  public async CreateUser(clientId: string, name: string): Promise<void> {
    // user が既に存在しているか確認
    const user = await prisma.user.findUnique({ where: { clientId } });
    // 存在しているかチェック
    if (user != null) {
      throw new Error('UserRepository: User already exists');
    }

    await prisma.user.create({ data: { clientId, name } });
  }

  public async DeleteUser(clientId: string): Promise<void> {
    await prisma.user.delete({
      where: { clientId },
    });
  }
}
