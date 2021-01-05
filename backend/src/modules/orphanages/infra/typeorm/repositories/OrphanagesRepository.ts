import { getRepository, Repository } from 'typeorm'

import IOrphanagesRepository from '@modules/orphanages/repositories/IOrphanagesRepository'

import ICreateOrphanageDTO from '@modules/orphanages/dtos/ICreateOrphanageDTO'

import Orphanage from '../entities/Orphanage'

class OrphanagesRepository implements IOrphanagesRepository {
    private ormRepository: Repository<Orphanage>

    constructor() {
        this.ormRepository = getRepository(Orphanage)
    }

    public async findById(id: number): Promise<Orphanage | undefined> {
        const orphanage = await this.ormRepository.findOneOrFail(id, {
            relations: ['images']
        })

        return orphanage
    }

    public async findAllOrphanages(): Promise<Orphanage[] | undefined> {
        const orphanages = await this.ormRepository.find({
            relations: ['images']
        })

        return orphanages
    }

    public async create(data: ICreateOrphanageDTO): Promise<Orphanage> {
        const orphanage = this.ormRepository.create(data)

        await this.ormRepository.save(orphanage)

        return orphanage
    }

    public async approve(id: number): Promise<Orphanage> {
        const orphanage = await this.ormRepository.findOneOrFail(id, {
            relations: ['images']
        })

        orphanage.available = true

        // orphanage will be updated to true
        await this.ormRepository.save(orphanage)

        return orphanage
    }
}

export default OrphanagesRepository