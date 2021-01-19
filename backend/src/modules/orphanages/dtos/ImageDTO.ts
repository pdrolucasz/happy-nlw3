import Orphanage from "../infra/typeorm/entities/Orphanage";

export default interface ImageDTO {
    path: string
    orphanage: Orphanage
}