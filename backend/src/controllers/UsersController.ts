import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { getRepository } from 'typeorm'
import { hash } from 'bcryptjs'

import User from '../models/User'

export default class UsersController {
    async create(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;

        const usersRepository = getRepository(User)

        const checkUserExists = await usersRepository.findOne({
            where: { email }
        });

        if (checkUserExists) {
            throw new Error('Email address already used.');
        }

        const hashedPassword = await hash(password, 8)

        const data = {
            name,
            email,
            password: hashedPassword,
        }

        const user = usersRepository.create(data)

        await usersRepository.save(user)

        return response.json(classToClass(user));
    }
}