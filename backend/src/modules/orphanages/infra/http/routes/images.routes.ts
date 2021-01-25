import { Router } from 'express'

import ImagesController from '../controllers/ImagesController'

const routes = Router()
routes.delete('/:id', ImagesController.delete)

export default routes