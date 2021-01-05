import { injectable, inject } from 'tsyringe'

import Orphanage from '../infra/typeorm/entities/Orphanage'

import IOrphanagesRepository from '../repositories/IOrphanagesRepository'

@injectable()
class ApproveOrphanageService {
    constructor(
        @inject('OrphanagesRepository')
        private orphanageRepository: IOrphanagesRepository
    ) {}

    public async execute(id: number): Promise<Orphanage> {
        const orphanage = await this.orphanageRepository.approve(id)

        return orphanage
    }
}

export default ApproveOrphanageService