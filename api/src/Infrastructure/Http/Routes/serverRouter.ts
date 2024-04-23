import { findAll } from '../../../Ui/Http/Server/findAll'
import { findById } from '../../../Ui/Http/Server/findById'
import { findServices } from '../../../Ui/Http/Server/findServices'
import { findMonitors } from '../../../Ui/Http/Server/findMonitors'
import { upsert } from '../../../Ui/Http/Server/upsert'
import { getMetrics } from '../../../Ui/Http/Server/getMetrics'
import { deleteServer } from '../../../Ui/Http/Server/delete'
import { type Request, type Response, type NextFunction, Router } from 'express'

const serverRouter = Router()

serverRouter.post('/', (req: Request, resp: Response, next: NextFunction) => {
  upsert(req, resp).catch(next)
  next()
})
serverRouter.get('/', (req: Request, resp: Response, next: NextFunction) => {
  findAll(req, resp).catch(next)
  next()
})
serverRouter.get('/:id', (req: Request, resp: Response, next: NextFunction) => {
  findById(req, resp).catch(next)
  next()
})
serverRouter.put('/:id', (req: Request, resp: Response, next: NextFunction) => {
  upsert(req, resp).catch(next)
  next()
})
serverRouter.delete('/:id', (req: Request, resp: Response, next: NextFunction) => {
  deleteServer(req, resp).catch(next)
  next()
})
serverRouter.get('/:id/metrics', (req: Request, resp: Response, next: NextFunction) => {
  getMetrics(req, resp).catch(next)
  next()
})

// Services
serverRouter.get('/:id/services', (req: Request, resp: Response, next: NextFunction) => {
  findServices(req, resp).catch(next)
  next()
})

// Monitors
serverRouter.get('/:id/monitors', (req: Request, resp: Response, next: NextFunction) => {
  findMonitors(req, resp).catch(next)
  next()
})

export default serverRouter as Router
