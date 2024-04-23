import { list } from '../../../Ui/Http/User/list'
import { me } from '../../../Ui/Http/User/me'
import { get } from '../../../Ui/Http/User/get'
import { upsert } from '../../../Ui/Http/User/upsert'
import { remove } from '../../../Ui/Http/User/delete'
import { type Request, type Response, type NextFunction, Router } from 'express'
import { authenticateMiddleware } from '../AuthenticateMiddleware'

const UserRouter = Router()

UserRouter.get('/', (req: Request, resp: Response, next: NextFunction) => {
  list(req, resp).then(next).catch(next)
})
UserRouter.get('/me', (req: Request, resp: Response, next: NextFunction) => {
  authenticateMiddleware(req, resp).then(next).catch(next)
}, (req: Request, resp: Response, next: NextFunction) => {
  me(req, resp).then(next).catch(next)
})
UserRouter.post('/', (req: Request, resp: Response, next: NextFunction) => {
  upsert(req, resp).then(next).catch(next)
})
UserRouter.get('/:id', (req: Request, resp: Response, next: NextFunction) => {
  get(req, resp).then(next).catch(next)
})
UserRouter.put('/:id', (req: Request, resp: Response, next: NextFunction) => {
  upsert(req, resp).then(next).catch(next)
})
UserRouter.delete('/:id', (req: Request, resp: Response, next: NextFunction) => {
  remove(req, resp).then(next).catch(next)
})

export default UserRouter as Router
