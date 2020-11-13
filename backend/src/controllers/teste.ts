import { Request, Response } from 'express'
import { injectable, inject } from 'tsyringe';
import path from 'path'

import { getRepository } from 'typeorm'

import UserToken from '../models/UserToken'
import User from '../models/User'

import IMailProvider from '../providers/MailProvider/models/IMailProvider'

@injectable()
export default class ForgotPasswordController {
    constructor(
        @inject('MailProvider')
        private mailProvider: IMailProvider,
    ) {}

    public async create(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;

        const usersTokenRepository = getRepository(UserToken)
        const usersRepository = getRepository(User)

        const user = await usersRepository.findOne({
            where: {email}
        })

        if (!user) {
            throw new Error('User does not exists.')
        }

        const userToken = usersTokenRepository.create({
            user_id: user.id
        })

        await usersTokenRepository.save(userToken)

        const forgotPasswordTemplate = path.resolve(
            __dirname,
            '..',
            'views',
            'forgot_password.hbs',
        );

        await this.mailProvider.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: '[Happy] Recuperação de senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `${process.env.APP_WEB_URL}/reset-password?token=${userToken.token}`,
                },
            },
        });

        return response.status(204).json()
    }
}