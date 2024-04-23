import { upsert } from '../../../Ui/Http/Configurations/upsert'
import { findAll } from '../../../Ui/Http/Configurations/findAll'
import { deleteConfiguration } from '../../../Ui/Http/Configurations/delete'
import { findMonitors } from '../../../Ui/Http/Configurations/findMonitors'
import { findServers } from '../../../Ui/Http/Configurations/findServers'
import { findById } from '../../../Ui/Http/Configurations/findById'
import { findNotificationChannels } from '../../../Ui/Http/Configurations/findNotificationChannels'
import { associateNotificationChannel } from '../../../Ui/Http/Configurations/associateNotificationChannel'
import { removeAssociationWithNotificationChannel } from '../../../Ui/Http/Configurations/removeAssociationWithNotificationChannel'

const configurationRouter = require('express').Router()

configurationRouter.post('/', upsert)
configurationRouter.get('/', findAll)
configurationRouter.get('/:id', findById)
configurationRouter.put('/:id', upsert)
configurationRouter.delete('/:id', deleteConfiguration)

configurationRouter.get('/:id/monitors', findMonitors)
configurationRouter.get('/:id/servers', findServers)

configurationRouter.get('/:id/notification-channels', findNotificationChannels)
configurationRouter.post('/:id/notification-channels', associateNotificationChannel)
configurationRouter.delete('/:id/notification-channels/:notificationId', removeAssociationWithNotificationChannel)

export default configurationRouter
