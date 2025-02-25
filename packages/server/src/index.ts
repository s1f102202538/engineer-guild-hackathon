import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { json } from 'body-parser';
import UserController from './controllers/UserController';
import DailyPatienceCalorieController from './controllers/DailyPatienceCalorieController';
import { Request, Response } from 'express';
import { NextFunction } from 'express-serve-static-core';

const server = createExpressServer({
  cors: true,
  controllers: [UserController, DailyPatienceCalorieController],
  validation: {
    whitelist: true,
    forbidNonWhitelisted: true,
  },
});

server.use(json());

// グローバルエラーハンドラー
// eslint-disable-next-line @typescript-eslint/no-unused-vars
server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Global error handler:', err);

  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
