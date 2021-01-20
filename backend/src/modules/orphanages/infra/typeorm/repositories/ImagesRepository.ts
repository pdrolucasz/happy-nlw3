import { getRepository, Repository } from 'typeorm'

import IImagesRepository from '@modules/orphanages/repositories/IImagesRepository'

import ImageDTO from '@modules/orphanages/dtos/ImageDTO'

import Image from '../entities/Image'

class ImagesRepository implements IImagesRepository {
    private ormRepository: Repository<Image>

    constructor() {
        this.ormRepository = getRepository(Image)
    }

    public async updateImage(data: ImageDTO[]): Promise<Image[]> {
        const oldImages = await this.ormRepository.find({
            where: { orphanage: data[0].orphanage }
        })

        await this.ormRepository.remove(oldImages)

        const images = this.ormRepository.create(data)

        return this.ormRepository.save(images)
    }

}

export default ImagesRepository