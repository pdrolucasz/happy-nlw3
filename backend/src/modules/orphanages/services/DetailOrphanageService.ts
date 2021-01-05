import { injectable, inject } from 'tsyringe'

import Orphanage from '../infra/typeorm/entities/Orphanage'

import IOrphanagesRepository from '../repositories/IOrphanagesRepository'

@injectable()
class DetailOrphanageService {
    constructor(
        @inject('OrphanagesRepository')
        private orphanageRepository: IOrphanagesRepository
    ) {}

    public async execute(id: number): Promise<Orphanage> {
        const orphanage = await this.orphanageRepository.findById(id)

        if(!orphanage) {
            throw new Error('Orphanage not registered!')
        }

        if(!orphanage.available) {
            throw new Error('Orphanage awaiting evaluation!')
        }

        return orphanage
    }
}

export default DetailOrphanageService