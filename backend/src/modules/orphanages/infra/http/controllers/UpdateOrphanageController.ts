import {Request, Response} from 'express'
import { container } from 'tsyringe'

import orphanageView from '@modules/orphanages/views/orphanages_view'

import UpdateOrphanageService from '@modules/orphanages/services/UpdateOrphanageService'

export default {
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

        const updateOrphanageService = container.resolve(UpdateOrphanageService)
        
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

        const orphanage = await updateOrphanageService.execute(data)
        
        return response.status(201).json()
    },
}