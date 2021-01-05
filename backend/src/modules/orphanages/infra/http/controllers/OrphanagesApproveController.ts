import {Request, Response} from 'express'
import { container } from 'tsyringe'

import { getRepository } from 'typeorm'
import Orphanage from '../../typeorm/entities/Orphanage'

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

        const approveOrphanageService = container.resolve(ApproveOrphanageService)

        const orphanage = await approveOrphanageService.execute(Number(id))
        
        return response.status(201).json(orphanage)
    },
}