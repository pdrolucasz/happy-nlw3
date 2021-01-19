import { Router } from 'express'
import multer from 'multer'

import OrphanagesApproveController from '../controllers/OrphanagesApproveController'
import uploadConfig from '@config/upload'

const routes = Router()
const upload = multer(uploadConfig)

routes.get('/', OrphanagesApproveController.index)
routes.get('/:id', OrphanagesApproveController.show)
routes.put('/:id', upload.array('images'), OrphanagesApproveController.update)

export default routes