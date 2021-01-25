import { getRepository, Repository } from 'typeorm'

import IImagesRepository from '@modules/orphanages/repositories/IImagesRepository'

import ImageDTO from '@modules/orphanages/dtos/ImageDTO'

import Image from '../entities/Image'

class ImagesRepository implements IImagesRepository {
    private ormRepository: Repository<Image>

    constructor() {
        this.ormRepository = getRepository(Image)
    }

    public async findById(id: number): Promise<Image> {
        const image = await this.ormRepository.findOneOrFail(id)

        return image
    }

    public async updateImages(data: ImageDTO[]): Promise<Image[]> {
        const images = this.ormRepository.create(data)

        return this.ormRepository.save(images)
    }

    public async deleteImage(image: Image): Promise<void> {
        await this.ormRepository.remove(image)
    }

}

export default ImagesRepository