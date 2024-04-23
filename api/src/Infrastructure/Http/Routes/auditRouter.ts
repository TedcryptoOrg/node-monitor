import { findLatest } from '../../../Ui/Http/Audit/findLatest'
import type { NextFunction, Request, Response, Router } from 'express'

const auditRouter = require('express').Router()

auditRouter.get('/latest', (req: Request, resp: Response, next: NextFunction) => {
  findLatest(req, resp).catch(next)
  next()
})

export default auditRouter as Router
