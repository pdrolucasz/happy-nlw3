import { Router } from 'express'

import usersRouter from '@modules/users/infra/http/routes/users.routes'
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes'
import passwordRouter from '@modules/users/infra/http/routes/password.routes'
import orphanagesApproveRouter from '@modules/orphanages/infra/http/routes/orphanagesApprove.routes'
import orphanagesRouter from '@modules/orphanages/infra/http/routes/orphanages.routes'

const routes = Router()

routes.use('/orphanages', orphanagesRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/users', usersRouter)
routes.use('/password', passwordRouter)
routes.use('/orphanageApprove', orphanagesApproveRouter)

export default routes