import Image from '../infra/typeorm/entities/Image'
import ImageDTO from '../dtos/ImageDTO'

export default interface IOrphanagesRepository {
    updateImage(data: ImageDTO[]): Promise<Image[]>
}