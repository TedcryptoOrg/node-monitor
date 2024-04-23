import { login } from '../../../Ui/Http/Login/login'
import express, { type NextFunction, type Request, type Response, type Router } from 'express'

const LoginRouter = express.Router()

LoginRouter.post('/', (req: Request, resp: Response, next: NextFunction) => {
  login(req, resp).catch(next)
  next()
})

export default LoginRouter as Router
