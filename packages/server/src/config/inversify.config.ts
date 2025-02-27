import 'reflect-metadata';
import { Container } from 'inversify';

import ChatController from '../controllers/ChatController';
import UserController from '../controllers/UserController';
import DailyPatienceCalorieController from '../controllers/DailyPatienceCalorieController';

import UserService from '../services/User/UserService';
import IUserService from '../services/User/IUserService';
import UserRepository from '../repositories/User/UserRepository';
import IUserRepository from '../repositories/User/IUserRepository';
import DailyPatienceCalorieService from '../services/DailyPatienceCalorie/DailyPatienceCalorieService';
import IDailyPatienceCalorieService from '../services/DailyPatienceCalorie/IDailyPatienceCalorieService';
import DailyPatienceCalorieRepository from '../repositories/DailyPatienceCalorie/DailyPatienceCalorieRepository';
import IDailyPatienceCalorieRepository from '../repositories/DailyPatienceCalorie/IDailyPatienceCalorieRepository';
import OpenAIService from '../services/OpenAI/OpenAIService';
import IOpenAIService from '../services/OpenAI/IOpenAIService';
import OpenAIRepository from '../repositories/OpenAI/OpenAIRepository';
import IOpenAIRepository from '../repositories/OpenAI/IOpenAIRepository';

import { TYPES } from './types';

export const containers = new Container();

// controllerの登録
containers.bind(ChatController).toSelf().inSingletonScope();
containers.bind(UserController).toSelf().inSingletonScope();
containers.bind(DailyPatienceCalorieController).toSelf().inSingletonScope();

// User関連
containers.bind<IUserService>(TYPES.IUserService).to(UserService).inSingletonScope();
containers.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository).inSingletonScope();

// 我慢カロリー関連
containers
  .bind<IDailyPatienceCalorieService>(TYPES.IDailyPatienceCalorieService)
  .to(DailyPatienceCalorieService)
  .inSingletonScope();
containers
  .bind<IDailyPatienceCalorieRepository>(TYPES.IDailyPatienceCalorieRepository)
  .to(DailyPatienceCalorieRepository)
  .inSingletonScope();

// OpenAI関連
containers.bind<IOpenAIService>(TYPES.IOpenAIService).to(OpenAIService).inSingletonScope();
containers.bind<IOpenAIRepository>(TYPES.IOpenAIRepository).to(OpenAIRepository).inSingletonScope();
