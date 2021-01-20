import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '@config/upload'
import OrphanagesController from '../controllers/OrphanagesController'

const routes = Router()
const upload = multer(uploadConfig)

routes.get('/', OrphanagesController.index)
routes.get('/:id', OrphanagesController.show)
routes.post('/', upload.array('images') , OrphanagesController.create)
routes.delete('/:id', OrphanagesController.delete)

export default routes