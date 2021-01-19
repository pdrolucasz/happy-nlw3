import {Request, Response} from 'express'
import { container } from 'tsyringe'

import orphanageView from '@modules/orphanages/views/orphanages_view'

import ListAllOrphanagesService from '@modules/orphanages/services/ListAllOrphanagesService'
import DetailOrphanageApproveService from '@modules/orphanages/services/DetailOrphanageApproveService'
import ApproveOrphanageService from '@modules/orphanages/services/ApproveOrphanageService'

export default {
    async index(request: Request, response: Response) {
        const listAllOrphanagesService = container.resolve(ListAllOrphanagesService)

        const orphanages = await listAllOrphanagesService.execute(false)

        return response.json(orphanageView.renderMany(orphanages))
    },

    async show(request: Request, response: Response) {
        const { id } = request.params

        const detailOrphanageApproveService = container.resolve(DetailOrphanageApproveService)

        const orphanage = await detailOrphanageApproveService.execute(id)

        return response.json(orphanageView.render(orphanage))
    },

    async update(request: Request, response: Response) {
        const { id } = request.params
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = request.body

        const approveOrphanageService = container.resolve(ApproveOrphanageService)
        
        const requestImages = request.files as Express.Multer.File[]
        
        const images = requestImages.map((image) => {
            return { path: image.filename }
        })
        
        const data = {
            id: Number(id),
            name: String(name),
            latitude: Number(latitude),
            longitude: Number(longitude),
            about: String(about),
            instructions: String(instructions),
            opening_hours: String(opening_hours),
            open_on_weekends: open_on_weekends === 'true',
            images
        }

        const orphanage = await approveOrphanageService.execute(data)
        
        return response.status(201).json(orphanageView.render(orphanage))
    },
}