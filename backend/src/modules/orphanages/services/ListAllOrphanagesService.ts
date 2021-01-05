import { injectable, inject } from 'tsyringe'

import Orphanage from '../infra/typeorm/entities/Orphanage'

import IOrphanagesRepository from '../repositories/IOrphanagesRepository'

@injectable()
class ListAllOrphanagesService {
    constructor(
        @inject('OrphanagesRepository')
        private orphanageRepository: IOrphanagesRepository
    ) {}

    public async execute(available: boolean): Promise<Orphanage[]> {
        const orphanages = await this.orphanageRepository.findAllOrphanages()

        if(!orphanages) {
            throw new Error('There are currently no registered orphanages!')
        }

        const orphanagesFiltered = orphanages.filter(orphanage => orphanage.available == available)

        return orphanagesFiltered
    }
}

export default ListAllOrphanagesService