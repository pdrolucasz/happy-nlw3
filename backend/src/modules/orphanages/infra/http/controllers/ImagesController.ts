import {Request, Response} from 'express'
import { container } from 'tsyringe'

import DeleteImageService from '@modules/orphanages/services/DeleteImageService'

export default {
    async delete(request: Request, response: Response) {
        const { id } = request.params

        const deleteImageService = container.resolve(DeleteImageService)

        await deleteImageService.execute(Number(id))

        return response.status(201).json()
    }
}