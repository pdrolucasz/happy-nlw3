import { injectable, inject } from 'tsyringe'

import Orphanage from '../infra/typeorm/entities/Orphanage'

import IOrphanagesRepository from '../repositories/IOrphanagesRepository'

@injectable()
class DetailOrphanageApproveService {
    constructor(
        @inject('OrphanagesRepository')
        private orphanageRepository: IOrphanagesRepository
    ) {}

    public async execute(id: string): Promise<Orphanage> {
        const idToNumber = Number(id)
        const orphanage = await this.orphanageRepository.findById(idToNumber)

        if(!orphanage) {
            throw new Error('Orphanage not registered!')
        }

        if(orphanage.available) {
            throw new Error('Orphanage already approved!')
        }

        return orphanage
    }
}

export default DetailOrphanageApproveService