import { Router } from 'express'
import OrphanagesApproveController from '../controllers/OrphanagesApproveController'

const routes = Router()

routes.get('/', OrphanagesApproveController.index)
routes.get('/:id', OrphanagesApproveController.show)
routes.patch('/', OrphanagesApproveController.update)

export default routes