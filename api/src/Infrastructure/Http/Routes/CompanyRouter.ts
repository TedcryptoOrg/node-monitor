import { list } from '../../../Ui/Http/Companies/list'
import { get } from '../../../Ui/Http/Companies/get'
import { upsert } from '../../../Ui/Http/Companies/upsert'
import { remove } from '../../../Ui/Http/Companies/delete'
import express, { type NextFunction, type Request, type Response, type Router } from 'express'

const CompanyRouter = express.Router()

CompanyRouter.get('/', (req: Request, resp: Response, next: NextFunction) => {
  list(req, resp).catch(next)
  next()
})
CompanyRouter.post('/', (req: Request, resp: Response, next: NextFunction) => {
  upsert(req, resp).catch(next)
  next()
})
CompanyRouter.get('/:id', (req: Request, resp: Response, next: NextFunction) => {
  get(req, resp).catch(next)
  next()
})
CompanyRouter.put('/:id', (req: Request, resp: Response, next: NextFunction) => {
  upsert(req, resp).catch(next)
  next()
})
CompanyRouter.delete('/:id', (req: Request, resp: Response, next: NextFunction) => {
  remove(req, resp).catch(next)
  next()
})

export default CompanyRouter as Router
