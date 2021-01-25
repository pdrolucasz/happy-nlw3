import Image from '../infra/typeorm/entities/Image'
import ImageDTO from '../dtos/ImageDTO'

export default interface IOrphanagesRepository {
    findById(id: number): Promise<Image>
    updateImages(data: ImageDTO[]): Promise<Image[]>
    deleteImage(image: Image): Promise<void>
}