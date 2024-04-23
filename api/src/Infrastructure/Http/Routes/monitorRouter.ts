import { upsert } from '../../../Ui/Http/Monitors/upsert'
import { findAll } from '../../../Ui/Http/Monitors/findAll'
import { ping } from '../../../Ui/Http/Monitors/ping'
import { deleteMonitor } from '../../../Ui/Http/Monitors/delete'
import { findFailed } from '../../../Ui/Http/Monitors/findFailed'
import { findWarnings } from '../../../Ui/Http/Monitors/findWarnings'
import { findById } from '../../../Ui/Http/Monitors/findById'
import { type Request, type Response, type NextFunction, Router } from 'express'

const monitorRouter = Router()

monitorRouter.get('/failed', (req: Request, resp: Response, next: NextFunction) => {
  findFailed(req, resp).then(next).catch(next)
})
monitorRouter.get('/warnings', (req: Request, resp: Response, next: NextFunction) => {
  findWarnings(req, resp).then(next).catch(next)
})
monitorRouter.post('/', (req: Request, resp: Response, next: NextFunction) => {
  upsert(req, resp).then(next).catch(next)
})
monitorRouter.get('/', (req: Request, resp: Response, next: NextFunction) => {
  findAll(req, resp).then(next).catch(next)
})
monitorRouter.get('/:id', (req: Request, resp: Response, next: NextFunction) => {
  findById(req, resp).then(next).catch(next)
})
monitorRouter.put('/:id', (req: Request, resp: Response, next: NextFunction) => {
  upsert(req, resp).then(next).catch(next)
})
monitorRouter.delete('/:id', (req: Request, resp: Response, next: NextFunction) => {
  deleteMonitor(req, resp).then(next).catch(next)
})
monitorRouter.post('/:id/ping', (req: Request, resp: Response, next: NextFunction) => {
  ping(req, resp).then(next).catch(next)
})

export default monitorRouter as Router
