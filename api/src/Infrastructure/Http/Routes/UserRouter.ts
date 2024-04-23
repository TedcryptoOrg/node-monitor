import { list } from '../../../Ui/Http/User/list'
import { me } from '../../../Ui/Http/User/me'
import { get } from '../../../Ui/Http/User/get'
import { upsert } from '../../../Ui/Http/User/upsert'
import { remove } from '../../../Ui/Http/User/delete'
import express, { type Request, type Response, type NextFunction, type Router } from 'express'
import { authenticateMiddleware } from '../AuthenticateMiddleware'

const UserRouter = express.Router()

UserRouter.get('/', (req: Request, resp: Response, next: NextFunction) => {
  list(req, resp).catch(next)
  next()
})
UserRouter.get('/me', (req: Request, resp: Response, next: NextFunction) => {
  authenticateMiddleware(req, resp).catch(next)
  next()
}, (req: Request, resp: Response, next: NextFunction) => {
  me(req, resp).catch(next)
  next()
})
UserRouter.post('/', (req: Request, resp: Response, next: NextFunction) => {
  upsert(req, resp).catch(next)
  next()
})
UserRouter.get('/:id', (req: Request, resp: Response, next: NextFunction) => {
  get(req, resp).catch(next)
  next()
})
UserRouter.put('/:id', (req: Request, resp: Response, next: NextFunction) => {
  upsert(req, resp).catch(next)
  next()
})
UserRouter.delete('/:id', (req: Request, resp: Response, next: NextFunction) => {
  remove(req, resp).catch(next)
  next()
})

export default UserRouter as Router
