import { container } from 'tsyringe'

import '@modules/users/providers'
import './providers'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

import IUserTokensRepository from '@modules/users/repositories/IUsersTokensRepository'
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository'

import IOrphanagesRepository from '@modules/orphanages/repositories/IOrphanagesRepository'
import OrphanagesRepository from '@modules/orphanages/infra/typeorm/repositories/OrphanagesRepository'

import IImagesRepository from '@modules/orphanages/repositories/IImagesRepository'
import ImagesRepository from '@modules/orphanages/infra/typeorm/repositories/ImagesRepository'

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository
)

container.registerSingleton<IUserTokensRepository>(
    'UserTokensRepository',
    UserTokensRepository
)

container.registerSingleton<IOrphanagesRepository>(
    'OrphanagesRepository',
    OrphanagesRepository
)

container.registerSingleton<IImagesRepository>(
    'ImagesRepository',
    ImagesRepository
)