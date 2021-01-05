import { injectable, inject } from 'tsyringe'
import * as Yup from 'yup'

import Orphanage from '../infra/typeorm/entities/Orphanage'

import IOrphanagesRepository from '../repositories/IOrphanagesRepository'

import ICreateOrphanageDTO from '../dtos/ICreateOrphanageDTO'

@injectable()
class CreateOrphanageService {
    constructor(
        @inject('OrphanagesRepository')
        private orphanageRepository: IOrphanagesRepository
    ) {}

    public async execute(data: ICreateOrphanageDTO): Promise<Orphanage> {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        })

        await schema.validate(data, {
            abortEarly: false,
        })

        // orphanage will be created with false available by default
        const orphanage = this.orphanageRepository.create(data)

        return orphanage
    }
}

export default CreateOrphanageService