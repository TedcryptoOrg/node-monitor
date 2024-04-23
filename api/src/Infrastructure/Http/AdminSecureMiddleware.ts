import { type Request, type Response } from 'express'
import type User from '../../Domain/User/User'

export const adminSecureMiddleware = async (req: Request, res: Response, next: any) => {
  if (!res.locals.user) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const user = res.locals.user as User
  if (!user.is_admin || !user.is_super_admin) {
    return res.status(403).json({ message: 'Forbidden' })
  }

  next()
}
