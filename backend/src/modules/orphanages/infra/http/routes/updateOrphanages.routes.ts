import { Router } from 'express'
import multer from 'multer'

import UpdateOrphanageController from '../controllers/UpdateOrphanageController'
import uploadConfig from '@config/upload'

const routes = Router()
const upload = multer(uploadConfig)

routes.put('/:id', upload.array('images'), UpdateOrphanageController.update)

export default routes