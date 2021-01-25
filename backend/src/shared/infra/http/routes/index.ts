import { Router } from 'express'

import usersRouter from '@modules/users/infra/http/routes/users.routes'
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes'
import passwordRouter from '@modules/users/infra/http/routes/password.routes'
import approveOrphanagesRouter from '@modules/orphanages/infra/http/routes/approveOrphanages.routes'
import orphanagesRouter from '@modules/orphanages/infra/http/routes/orphanages.routes'
import updateOrphanagesRouter from '@modules/orphanages/infra/http/routes/updateOrphanages.routes'
import imagesRouter from '@modules/orphanages/infra/http/routes/images.routes'

const routes = Router()

routes.use('/orphanages', orphanagesRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/users', usersRouter)
routes.use('/password', passwordRouter)
routes.use('/approveOrphanages', approveOrphanagesRouter)
routes.use('/updateOrphanage', updateOrphanagesRouter)
routes.use('/images', imagesRouter)

export default routes