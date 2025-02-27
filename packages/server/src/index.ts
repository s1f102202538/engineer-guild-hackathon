import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { json } from 'body-parser';
import UserController from './controllers/UserController';
import DailyPatienceCalorieController from './controllers/DailyPatienceCalorieController';
import { Request, Response } from 'express';
import { NextFunction } from 'express-serve-static-core';
import morganMiddleware from './middleware/morgon';
import logger from './config/logger';
import ChatController from './controllers/ChatController';

const server = createExpressServer({
  cors: true,
  controllers: [UserController, DailyPatienceCalorieController, ChatController],
  validation: {
    whitelist: true,
    forbidNonWhitelisted: true,
  },
});

server.use(json());

server.use(morganMiddleware);

// グローバルエラーハンドラー
// eslint-disable-next-line @typescript-eslint/no-unused-vars
server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('Global error handler:', err);

  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

const port = process.env.PORT || 8000;
server.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
