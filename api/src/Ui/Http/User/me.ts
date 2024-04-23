import { type Request, type Response } from 'express'

export const me = async (req: Request, resp: Response): Promise<void> => {
  resp.status(200).send(resp.locals.user.toObject())
}
