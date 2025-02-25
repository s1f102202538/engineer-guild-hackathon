import 'reflect-metadata';
import { Container } from 'inversify';

import UserService from '../services/UserService';
import UserRepository from '../repositories/UserRepository';
import UserController from '../controllers/UserController';
import DailyPatienceCalorieService from '../services/DailyPatienceCalorieService';
import DailyPatienceCalorieRepository from '../repositories/DailyPatienceCalorieRepository';

import { TYPES } from './types';

const containers = new Container();

containers.bind<UserService>(TYPES.UserService).to(UserService).inSingletonScope();
containers.bind<UserRepository>(TYPES.UserRepository).to(UserRepository).inSingletonScope();
containers.bind<UserController>(TYPES.UserController).to(UserController).inSingletonScope();
containers
  .bind<DailyPatienceCalorieService>(TYPES.DailyPatienceCalorieService)
  .to(DailyPatienceCalorieService)
  .inSingletonScope();
containers
  .bind<DailyPatienceCalorieRepository>(TYPES.DailyPatienceCalorieRepository)
  .to(DailyPatienceCalorieRepository)
  .inSingletonScope();
