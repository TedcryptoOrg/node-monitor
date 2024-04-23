import { upsert } from '../../../Ui/Http/Services/upsert'
import { findAll } from '../../../Ui/Http/Services/findAll'
import { deleteService } from '../../../Ui/Http/Services/delete'
import { type Request, type Response, type NextFunction, Router } from 'express'

const serviceRouter = Router()

serviceRouter.post('/', (req: Request, resp: Response, next: NextFunction) => {
  upsert(req, resp).catch(next)
  next()
})
serviceRouter.get('/', (req: Request, resp: Response, next: NextFunction) => {
  findAll(req, resp).catch(next)
  next()
})
serviceRouter.put('/:id', (req: Request, resp: Response, next: NextFunction) => {
  upsert(req, resp).catch(next)
  next()
})
serviceRouter.delete('/:id', (req: Request, resp: Response, next: NextFunction) => {
  deleteService(req, resp).catch(next)
  next()
})

export default serviceRouter as Router
