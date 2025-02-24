import { createExpressServer } from 'routing-controllers';
import UserController from './controller/UserController';

const server = createExpressServer({
  controllers: [UserController],
});

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
