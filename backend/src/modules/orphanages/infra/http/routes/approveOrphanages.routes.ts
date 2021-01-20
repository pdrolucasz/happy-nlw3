import { Router } from 'express'
import multer from 'multer'

import ApproveOrphanagesController from '../controllers/ApproveOrphanagesController'
import uploadConfig from '@config/upload'

const routes = Router()
const upload = multer(uploadConfig)

routes.get('/', ApproveOrphanagesController.index)
routes.get('/:id', ApproveOrphanagesController.show)
routes.put('/:id', upload.array('images'), ApproveOrphanagesController.update)

export default routes