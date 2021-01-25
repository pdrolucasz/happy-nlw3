import { injectable, inject } from 'tsyringe'

import IStorageProvider from '@shared/container/providers/StorageProviders/models/IStorageProvider'

import IImagesRepository from '../repositories/IImagesRepository'

@injectable()
class DeleteImageService {
    constructor(
        @inject('ImagesRepository')
        private imagesRepository: IImagesRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    public async execute(id: number): Promise<void> {
        const image = await this.imagesRepository.findById(id)

        await this.storageProvider.deleteFile(image.path)

        await this.imagesRepository.deleteImage(image)
    }
}

export default DeleteImageService
