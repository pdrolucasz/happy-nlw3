import { Router } from 'express';

import UsersController from '../controllers/UsersController';

const sessionsRouter = Router();

const sessionsControllers = new UsersController();

sessionsRouter.post('/', sessionsControllers.create,);

export default sessionsRouter;