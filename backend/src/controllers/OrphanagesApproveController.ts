import {Request, Response} from 'express'
import * as Yup from 'yup'

import { getRepository } from 'typeorm'
import Orphanage from '../models/Orphanage'

import orphanageView from '../views/orphanages_view'

export default {
    async index(request: Request, response: Response) {
        const orphanageRepository = getRepository(Orphanage)

        const orphanages = await orphanageRepository.find({
            relations: ['images']
        })

        const orphanagesFiltered = orphanages.filter(orphanage => orphanage.available == false) 

        return response.json(orphanageView.renderMany(orphanagesFiltered))
    },

    async show(request: Request, response: Response) {
        const { id } = request.params

        const orphanageRepository = getRepository(Orphanage)

        const orphanage = await orphanageRepository.findOneOrFail(id, {
            relations: ['images']
        })

        if(orphanage.available) {
            throw new Error('Orphanage already approved!')
        }

        return response.json(orphanageView.render(orphanage))
    },

    async update(request: Request, response: Response) {
        const { id } = request.params
        
        const orphanageRepository = getRepository(Orphanage)

        const orphanageWillBeApproved = await orphanageRepository.findOneOrFail(id, {
            relations: ['images']
        })

        orphanageWillBeApproved.available = true
            
        // orphanage will be updated to true
        await orphanageRepository.save(orphanageWillBeApproved)
        
        return response.status(201).json(orphanageWillBeApproved)
    }
}