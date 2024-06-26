import { list } from '../../../Ui/Http/Companies/list'
import { get } from '../../../Ui/Http/Companies/get'
import { upsert } from '../../../Ui/Http/Companies/upsert'
import { remove } from '../../../Ui/Http/Companies/delete'
import { type NextFunction, type Request, type Response, Router } from 'express'

const CompanyRouter = Router()

CompanyRouter.get('/', (req: Request, resp: Response, next: NextFunction) => {
  list(req, resp).then(next).catch(next)
})
CompanyRouter.post('/', (req: Request, resp: Response, next: NextFunction) => {
  upsert(req, resp).then(next).catch(next)
})
CompanyRouter.get('/:id', (req: Request, resp: Response, next: NextFunction) => {
  get(req, resp).then(next).catch(next)
})
CompanyRouter.put('/:id', (req: Request, resp: Response, next: NextFunction) => {
  upsert(req, resp).then(next).catch(next)
})
CompanyRouter.delete('/:id', (req: Request, resp: Response, next: NextFunction) => {
  remove(req, resp).then(next).catch(next)
})

export default CompanyRouter as Router
