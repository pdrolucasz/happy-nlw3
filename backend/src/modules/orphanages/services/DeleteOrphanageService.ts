import { injectable, inject } from 'tsyringe'

import IOrphanagesRepository from '../repositories/IOrphanagesRepository'
import IStorageProvider from '@shared/container/providers/StorageProviders/models/IStorageProvider'

@injectable()
class DeleteOrphanageService {
    constructor(
        @inject('OrphanagesRepository')
        private orphanageRepository: IOrphanagesRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    public async execute(id: number): Promise<void> {
        const orphanage = await this.orphanageRepository.findById(id)

        if(!orphanage) {
            throw new Error('Orphanage not found')
        }

        orphanage.images.map(image => {
            this.storageProvider.deleteFile(image.path)
        })

        await this.orphanageRepository.delete(orphanage)
    }
}

export default DeleteOrphanageService