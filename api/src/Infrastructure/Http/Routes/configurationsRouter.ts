import { upsert } from '../../../Ui/Http/Configurations/upsert'
import { findAll } from '../../../Ui/Http/Configurations/findAll'
import { deleteConfiguration } from '../../../Ui/Http/Configurations/delete'
import { findMonitors } from '../../../Ui/Http/Configurations/findMonitors'
import { findServers } from '../../../Ui/Http/Configurations/findServers'
import { findById } from '../../../Ui/Http/Configurations/findById'
import { findNotificationChannels } from '../../../Ui/Http/Configurations/findNotificationChannels'
import { associateNotificationChannel } from '../../../Ui/Http/Configurations/associateNotificationChannel'
import { removeAssociationWithNotificationChannel } from '../../../Ui/Http/Configurations/removeAssociationWithNotificationChannel'
import { type Request, type Response, type NextFunction, Router } from 'express'

const configurationRouter = Router()

configurationRouter.post('/', (req: Request, resp: Response, next: NextFunction) => {
  upsert(req, resp).then(next).catch(next)
})
configurationRouter.get('/', (req: Request, resp: Response, next: NextFunction) => {
  findAll(req, resp).then(next).catch(next)
})
configurationRouter.get('/:id', (req: Request, resp: Response, next: NextFunction) => {
  findById(req, resp).then(next).catch(next)
})
configurationRouter.put('/:id', (req: Request, resp: Response, next: NextFunction) => {
  upsert(req, resp).then(next).catch(next)
})
configurationRouter.delete('/:id', (req: Request, resp: Response, next: NextFunction) => {
  deleteConfiguration(req, resp).then(next).catch(next)
})

configurationRouter.get('/:id/monitors', (req: Request, resp: Response, next: NextFunction) => {
  findMonitors(req, resp).then(next).catch(next)
})
configurationRouter.get('/:id/servers', (req: Request, resp: Response, next: NextFunction) => {
  findServers(req, resp).then(next).catch(next)
})

configurationRouter.get('/:id/notification-channels', (req: Request, resp: Response, next: NextFunction) => {
  findNotificationChannels(req, resp).then(next).catch(next)
})
configurationRouter.post('/:id/notification-channels', (req: Request, resp: Response, next: NextFunction) => {
  associateNotificationChannel(req, resp).then(next).catch(next)
})
configurationRouter.delete('/:id/notification-channels/:notificationId', (req: Request, resp: Response, next: NextFunction) => {
  removeAssociationWithNotificationChannel(req, resp).then(next).catch(next)
})

export default configurationRouter as Router
