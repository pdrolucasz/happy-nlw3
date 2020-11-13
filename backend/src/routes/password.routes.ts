import { Router } from 'express';

import { container } from 'tsyringe';

import ForgotPasswordController from '../controllers/ForgotPasswordController';

const passwordRouter = Router();

const forgotPasswordController = container.resolve(
    ForgotPasswordController
)

passwordRouter.post(
    '/forgot',
    forgotPasswordController.create,
);

export default passwordRouter;