import { upsert } from '../../../Ui/Http/Services/upsert'
import { findAll } from '../../../Ui/Http/Services/findAll'
import { deleteService } from '../../../Ui/Http/Services/delete'
import { type Request, type Response, type NextFunction, Router } from 'express'

const serviceRouter = Router()

serviceRouter.post('/', (req: Request, resp: Response, next: NextFunction) => {
  upsert(req, resp).then(next).catch(next)
})
serviceRouter.get('/', (req: Request, resp: Response, next: NextFunction) => {
  findAll(req, resp).then(next).catch(next)
})
serviceRouter.put('/:id', (req: Request, resp: Response, next: NextFunction) => {
  upsert(req, resp).then(next).catch(next)
})
serviceRouter.delete('/:id', (req: Request, resp: Response, next: NextFunction) => {
  deleteService(req, resp).then(next).catch(next)
})

export default serviceRouter as Router
