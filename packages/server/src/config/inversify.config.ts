import 'reflect-metadata';
import { Container } from 'inversify';

import UserService from '../services/UserService';
import UserRepository from '../repositories/UserRepository';
import DailyPatienceCalorieService from '../services/DailyPatienceCalorieService';
import DailyPatienceCalorieRepository from '../repositories/DailyPatienceCalorieRepository';

import { TYPES } from './types';

const containers = new Container();

containers.bind<UserService>(TYPES.IUserService).to(UserService).inSingletonScope();
containers.bind<UserRepository>(TYPES.IUserRepository).to(UserRepository).inSingletonScope();
containers
  .bind<DailyPatienceCalorieService>(TYPES.IDailyPatienceCalorieService)
  .to(DailyPatienceCalorieService)
  .inSingletonScope();
containers
  .bind<DailyPatienceCalorieRepository>(TYPES.IDailyPatienceCalorieRepository)
  .to(DailyPatienceCalorieRepository)
  .inSingletonScope();
