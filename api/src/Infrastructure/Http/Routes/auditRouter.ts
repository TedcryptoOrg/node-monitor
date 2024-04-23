import { findLatest } from '../../../Ui/Http/Audit/findLatest'
import { type NextFunction, type Request, type Response, Router } from 'express'

const auditRouter = Router()

auditRouter.get('/latest', (req: Request, resp: Response, next: NextFunction) => {
  findLatest(req, resp).catch(next)
  next()
})

export default auditRouter as Router
