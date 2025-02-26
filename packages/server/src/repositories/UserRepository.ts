import { injectable } from 'inversify';
import prisma from '../prisma/client';
import { User, CaloriesGoal } from '@prisma/client';
import IUserRepository from '../interfaces/IUserRepository';

@injectable()
export default class UserRepository implements IUserRepository {
  public async FindUserByClientId(clientId: string): Promise<User> {
    const user = await prisma.user.findUnique({ where: { clientId } });

    if (user == null) {
      throw new Error('UserRepository:FindUserByClientId: User not found');
    }

    return user;
  }

  public async CreateUser(clientId: string, name: string, weight: number): Promise<void> {
    // user が既に存在しているか確認
    const user = await this.FindUserByClientId(clientId);
    if (user != null) {
      throw new Error('UserRepository:CreateUser: User already exists');
    }

    await prisma.user.create({ data: { clientId, name, weight } });
  }

  public async DeleteUser(clientId: string): Promise<void> {
    try {
      await prisma.user.delete({
        where: { clientId },
      });
    } catch {
      throw new Error('UserRepository:DeleteUser: User not found or could not be deleted');
    }
  }

  public async FindUserCalorieGoal(clientId: string): Promise<CaloriesGoal> {
    const user = await this.FindUserByClientId(clientId);
    const calorieGoal = await prisma.caloriesGoal.findFirst({
      where: { userId: user.id },
    });

    if (calorieGoal == null) {
      throw new Error('UserRepository:FindUserCalorieGoal: CalorieGoal not found');
    }

    return calorieGoal;
  }

  public async CreateUserCalorieGoal(clientId: string, calorieGoal: number, deadline: Date): Promise<void> {
    const calorieGoalData = await this.FindUserCalorieGoal(clientId);

    if (calorieGoalData != null) {
      throw new Error('UserRepository:CreateUserCalorieGoal: CalorieGoal already exists');
    }

    const user = await this.FindUserByClientId(clientId);
    await prisma.caloriesGoal.create({
      data: {
        userId: user.id,
        calorieGoal,
        deadline,
      },
    });
  }

  public async UpdateUserCalorieGoal(id: number, calorieGoal: number, deadline: Date): Promise<void> {
    await prisma.caloriesGoal.update({
      where: { id },
      data: { calorieGoal, deadline },
    });
  }
}
