import 'reflect-metadata';
import { Container } from 'inversify';

import UserService from '../services/UserService';
import UserRepository from '../repositories/UserRepository';
import DailyPatienceCalorieService from '../services/DailyPatienceCalorieService';
import DailyPatienceCalorieRepository from '../repositories/DailyPatienceCalorieRepository';

import { TYPES } from './types';
import OpenAIService from '../services/OpenAIService';
import OpenAIRepository from '../repositories/OpenAIRepository';

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
containers.bind<OpenAIService>(TYPES.IOpenAIService).to(OpenAIService).inSingletonScope();
containers.bind<OpenAIRepository>(TYPES.IOpenAIRepository).to(OpenAIRepository).inSingletonScope();
