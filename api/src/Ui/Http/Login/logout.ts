import { type Request, type Response } from 'express'

export const logout = async (req: Request, resp: Response): Promise<void> => {
  resp.status(200).send({
    message: 'okay'
  })
}
