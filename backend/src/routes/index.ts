import { Router } from 'express'

import orphanagesRoutes from './orphanages.routes'
import sessionsRoutes from './sessions.routes'
import usersRoutes from './users.routes'
import passwordRoutes from './password.routes'
import OrphanagesApproveRoutes from './OrphanagesApproveController.routes'

const routes = Router()

routes.use('/orphanages', orphanagesRoutes)
routes.use('/sessions', sessionsRoutes)
routes.use('/users', usersRoutes)
routes.use('/password', passwordRoutes)
routes.use('/orphanageApprove', OrphanagesApproveRoutes)

export default routes