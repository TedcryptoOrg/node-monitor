import { upsert } from '../../../Ui/Http/Configurations/upsert'
import { findAll } from '../../../Ui/Http/Configurations/findAll'
import { update } from '../../../Ui/Http/Configurations/update'
import { deleteConfiguration } from '../../../Ui/Http/Configurations/delete'
import { findMonitors } from '../../../Ui/Http/Configurations/findMonitors';
import { findServers } from '../../../Ui/Http/Configurations/findServers';
import { findById } from '../../../Ui/Http/Configurations/findById';
import { findNotificationChannels} from '../../../Ui/Http/Configurations/findNotificationChannels';
import { associateNotificationChannel } from '../../../Ui/Http/Configurations/associateNotificationChannel';
import {deleteNotificationChannel} from '../../../Ui/Http/Configurations/deleteNotificationChannel';

// Configuration Router
const configurationRouter = require('express').Router()

configurationRouter.post('/', upsert)
configurationRouter.get('/', findAll)
configurationRouter.get('/:id', findById)
configurationRouter.put('/:id', update)
configurationRouter.delete('/:id', deleteConfiguration)

configurationRouter.get('/:id/monitors', findMonitors)
configurationRouter.get('/:id/servers', findServers)
configurationRouter.get('/:id/notification-channels', findNotificationChannels)
configurationRouter.post('/:id/notification-channels', associateNotificationChannel)
configurationRouter.delete('/:id/notification-channels', deleteNotificationChannel)

export default configurationRouter
