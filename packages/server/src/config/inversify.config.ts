import 'reflect-metadata';
import { Container } from 'inversify';

import UserService from '../services/UserService';
import UserRepository from '../repositories/UserRepository';
import UserController from '../controller/UserController';

import { TYPES } from './types';

const containers = new Container();

containers.bind<UserService>(TYPES.UserService).to(UserService).inSingletonScope();
containers.bind<UserRepository>(TYPES.UserRepository).to(UserRepository).inSingletonScope();
containers.bind<UserController>(TYPES.UserController).to(UserController).inSingletonScope();
