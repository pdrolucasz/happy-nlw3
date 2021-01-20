import { injectable, inject } from 'tsyringe'

import IOrphanagesRepository from '../repositories/IOrphanagesRepository'

@injectable()
class DeleteOrphanageService {
    constructor(
        @inject('OrphanagesRepository')
        private orphanageRepository: IOrphanagesRepository,
    ) {}

    public async execute(id: number): Promise<void> {
        const orphanage = await this.orphanageRepository.findById(id)

        if(!orphanage) {
            throw new Error('Orphanage not found')
        }

        await this.orphanageRepository.delete(orphanage)
    }
}

export default DeleteOrphanageService