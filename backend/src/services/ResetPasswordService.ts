import { injectable, inject } from 'tsyringe'
import { isAfter, addHours } from 'date-fns'
import { getRepository } from 'typeorm'

import IHashProvider from '../providers/HashProvider/models/IHashProvider'

import User from '../models/User'
import UserToken from '../models/UserToken'

interface Request {
    token: string
    password: string
}

@injectable()
class ResetPasswordService {
    constructor(
        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ token, password }: Request): Promise<void> {
        const userTokenRepository = getRepository(UserToken)
        const usersRepository = getRepository(User)

        const userToken = await userTokenRepository.findOne({
            where: { token }
        })

        if (!userToken) {
            throw new Error('User token does not exists')
        }

        const user = await usersRepository.findOne(userToken.user_id)

        if (!user) {
            throw new Error('User does not exists')
        }

        const tokenCreatedAt = userToken.created_at
        const compareDate = addHours(tokenCreatedAt, 2)

        if (isAfter(Date.now(), compareDate)) {
            throw new Error('Token expired')
        }

        user.password = await this.hashProvider.generateHash(password)

        await usersRepository.save(user)
    }
}

export default ResetPasswordService