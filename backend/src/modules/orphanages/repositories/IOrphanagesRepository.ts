import Orphanage from '../infra/typeorm/entities/Orphanage'
import ICreateOrphanageDTO from '../dtos/ICreateOrphanageDTO'
import IOrphanageDTO from '../dtos/IOrphanageDTO'

export default interface IOrphanagesRepository {
    findById(id: number): Promise<Orphanage | undefined>
    findAllOrphanages(): Promise<Orphanage[] | undefined>
    create(data: ICreateOrphanageDTO): Promise<Orphanage>
    save(orphanage: IOrphanageDTO): Promise<Orphanage>
    delete(orphanage: Orphanage): Promise<void>
}