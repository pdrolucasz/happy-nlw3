import { Router } from 'express';

import AuthenticateController from '../controllers/AuthenticateController';

const usersRouter = Router();
const usersController = new AuthenticateController();

usersRouter.post('/', usersController.create);

export default usersRouter;