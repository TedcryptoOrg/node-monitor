import { login } from '../../../Ui/Http/Login/login'
import { type NextFunction, type Request, type Response, Router } from 'express'

const LoginRouter = Router()

LoginRouter.post('/', (req: Request, resp: Response, next: NextFunction) => {
  login(req, resp).catch(next)
  next()
})

export default LoginRouter as Router
