import { type Request, type Response } from 'express'
import type User from '../../Domain/User/User'

export const adminSecureMiddleware = async (req: Request, res: Response, next: any): Promise<void> => {
  if (!res.locals.user) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  const user = res.locals.user as User
  if (!user.is_admin || !user.is_super_admin) {
    res.status(403).json({ message: 'Forbidden' })
    return
  }

  next()
}
