import {Request, Response} from 'express'
import { container } from 'tsyringe'

import orphanageView from '@modules/orphanages/views/orphanages_view'

import ListAllOrphanagesService from '@modules/orphanages/services/ListAllOrphanagesService'
import DetailOrphanageService from '@modules/orphanages/services/DetailOrphanageService'
import CreateOrphanageService from '@modules/orphanages/services/CreateOrphanageService'

export default {
    async index(request: Request, response: Response) {
        const listAllOrphanagesService = container.resolve(ListAllOrphanagesService)

        const orphanages = await listAllOrphanagesService.execute(true)

        return response.json(orphanageView.renderMany(orphanages))
    },

    async show(request: Request, response: Response) {
        const { id } = request.params

        const detailOrphanageService = container.resolve(DetailOrphanageService)

        const orphanage = await detailOrphanageService.execute(Number(id))

        return response.json(orphanageView.render(orphanage))
    },

    async create(request: Request, response: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = request.body

        const createOrphanageService = container.resolve(CreateOrphanageService)
    
        const requestImages = request.files as Express.Multer.File[]
        
        const images = requestImages.map((image) => {
            return { path: image.filename };
        })

        const data = {
            name: String(name),
            latitude: Number(latitude),
            longitude: Number(longitude),
            about: String(about),
            instructions: String(instructions),
            opening_hours: String(opening_hours),
            open_on_weekends: open_on_weekends === 'true',
            images
        }

        const orphanage = await createOrphanageService.execute(data)
        
        return response.status(201).json(orphanageView.render(orphanage))
    }
}