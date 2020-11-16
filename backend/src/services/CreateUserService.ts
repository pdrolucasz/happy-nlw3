import { injectable, inject } from 'tsyringe'

import { getRepository } from 'typeorm'

import User from '../models/User'
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface Request {
    name: string
    email: string
    password: string
}

@injectable()
class CreateUserService  {
    constructor(
        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ name, email, password }: Request): Promise<User> {
        const usersRepository = getRepository(User)

        const checkUserExists = await usersRepository.findOne({
            where: { email }
        })

        if (checkUserExists) {
            throw new Error('Email address already used.')
        }

        const hashedPassword = await this.hashProvider.generateHash(password)

        const data = {
            name,
            email,
            password: hashedPassword,
        }

        const user = usersRepository.create(data)

        await usersRepository.save(user)

        return user
    }
}

export default CreateUserService