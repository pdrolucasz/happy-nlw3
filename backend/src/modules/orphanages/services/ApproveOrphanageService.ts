import { injectable, inject } from 'tsyringe'

import IStorageProvider from '@shared/container/providers/StorageProviders/models/IStorageProvider'
import Orphanage from '../infra/typeorm/entities/Orphanage'

import IOrphanagesRepository from '../repositories/IOrphanagesRepository'
import IImagesRepository from '../repositories/IImagesRepository'

import IOrphanageDTO from '../dtos/IOrphanageDTO'

@injectable()
class ApproveOrphanageService {
    constructor(
        @inject('OrphanagesRepository')
        private orphanageRepository: IOrphanagesRepository,

        @inject('ImagesRepository')
        private imagesRepository: IImagesRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    public async execute(data: IOrphanageDTO): Promise<Orphanage> {
        const orphanage = await this.orphanageRepository.findById(data.id)

        if(!orphanage) {
            throw new Error('Orphanage not found')
        }

        if(orphanage.available) {
            throw new Error('Orphanage already available')
        }

        orphanage.images.map(image => {
            this.storageProvider.deleteFile(image.path)
        })
        
        const images = data.images.map(image => ({
            path: image.path,
            orphanage
        }))

        this.imagesRepository.updateImage(images)

        orphanage.about = data.about
        orphanage.available = true
        orphanage.instructions = data.instructions
        orphanage.latitude = data.latitude
        orphanage.longitude = data.longitude
        orphanage.name = data.name
        orphanage.open_on_weekends = data.open_on_weekends
        orphanage.opening_hours = data.opening_hours

        return this.orphanageRepository.save(orphanage)
    }
}

export default ApproveOrphanageService