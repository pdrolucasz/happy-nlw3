import Orphanage from '../infra/typeorm/entities/Orphanage'
import ICreateOrphanageDTO from '../dtos/ICreateOrphanageDTO'

export default interface IOrphanagesRepository {
    findById(id: number): Promise<Orphanage | undefined>
    findAllOrphanages(): Promise<Orphanage[] | undefined>
    create(data: ICreateOrphanageDTO): Promise<Orphanage>
    approve(id: number): Promise<Orphanage>
}