import 'reflect-metadata';
import { Container } from 'inversify';

import UserService from '../services/User/UserService';
import UserRepository from '../repositories/User/UserRepository';
import DailyPatienceCalorieService from '../services/DailyPatienceCalorie/DailyPatienceCalorieService';
import DailyPatienceCalorieRepository from '../repositories/DailyPatienceCalorie/DailyPatienceCalorieRepository';
import OpenAIService from '../services/OpenAI/OpenAIService';
import OpenAIRepository from '../repositories/OpenAI/OpenAIRepository';

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
containers.bind<OpenAIService>(TYPES.IOpenAIService).to(OpenAIService).inSingletonScope();
containers.bind<OpenAIRepository>(TYPES.IOpenAIRepository).to(OpenAIRepository).inSingletonScope();
