import { getRepository } from 'typeorm'
import { sign } from 'jsonwebtoken'

import { injectable, inject } from 'tsyringe'

import IUsersRepository from '../repositories/IUsersRepository'

import IHashProvider from '../providers/HashProvider/models/IHashProvider'

import User from '../infra/typeorm/entities/User'

import authConfig from '@config/auth'

interface Request {
    email: string
    password: string
}

@injectable()
class AuthenticateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    async execute({ email, password }: Request): Promise<{ user: User; token: string }> {
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new Error('Incorrect email/password combination')
        }

        const passwordCompared = await this.hashProvider.compareHash(
            password,
            user.password,
        )

        if (!passwordCompared) {
            throw new Error('Incorrect email/password combination')
        }

        const { secret, expiresIn } = authConfig.jwt

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        })

        return {
            user,
            token,
        }
    }
}

export default AuthenticateUserService