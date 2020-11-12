import { Request, Response } from 'express';
import { classToClass } from 'class-transformer'
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken';

import User from '../models/User'

import authConfig from '../config/auth'

export default class UsersController {
    async create(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        const usersRepository = getRepository(User)

        const userExists = await usersRepository.findOne({
            where: { email }
        });

        if (!userExists) {
            throw new Error('Incorrect email/password combination');
        }

        const passwordCompared = await compare(
            password,
            userExists.password,
        );

        if (!passwordCompared) {
            throw new Error('Incorrect email/password combination');
        }

        const { secret, expiresIn } = authConfig.jwt;

        const tokenJWT = sign({}, secret, {
            subject: String(userExists.id),
            expiresIn,
        });

        return response.json({ user: classToClass(userExists), tokenJWT });
    }
}