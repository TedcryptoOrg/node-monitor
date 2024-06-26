import { upsert } from '../../../Ui/Http/NotificationChannels/upsert'
import { findAll } from '../../../Ui/Http/NotificationChannels/findAll'
import { test } from '../../../Ui/Http/NotificationChannels/test'
import { deleteNotificationChannel } from '../../../Ui/Http/NotificationChannels/delete'
import { getById } from '../../../Ui/Http/NotificationChannels/getById'
import { type Request, type Response, type NextFunction, Router } from 'express'

const notificationChannelsRouter = Router()

notificationChannelsRouter.post('/', (req: Request, resp: Response, next: NextFunction) => {
  upsert(req, resp).then(next).catch(next)
})
notificationChannelsRouter.get('/', (req: Request, resp: Response, next: NextFunction) => {
  findAll(req, resp).then(next).catch(next)
})
notificationChannelsRouter.get('/:id', (req: Request, resp: Response, next: NextFunction) => {
  getById(req, resp).then(next).catch(next)
})
notificationChannelsRouter.put('/:id', (req: Request, resp: Response, next: NextFunction) => {
  upsert(req, resp).then(next).catch(next)
})
notificationChannelsRouter.delete('/:id', (req: Request, resp: Response, next: NextFunction) => {
  deleteNotificationChannel(req, resp).then(next).catch(next)
})
notificationChannelsRouter.post('/test', (req: Request, resp: Response, next: NextFunction) => {
  test(req, resp).then(next).catch(next)
})

export default notificationChannelsRouter as Router
