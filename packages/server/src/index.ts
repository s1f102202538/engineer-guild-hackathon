import 'reflect-metadata';
import express from 'express';
import { useExpressServer } from 'routing-controllers';
import bodyParser from 'body-parser';
import UserController from './controllers/UserController';
import DailyPatienceCalorieController from './controllers/DailyPatienceCalorieController';
import morganMiddleware from './middleware/morgon';
import logger from './config/logger';
import ChatController from './controllers/ChatController';
import { useContainer } from 'routing-controllers';
import { containers } from './config/inversify.config';

const app = express();

// Express middlewareの設定
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morganMiddleware);

useContainer(containers);

useExpressServer(app, {
  cors: true,
  controllers: [UserController, DailyPatienceCalorieController, ChatController],
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
