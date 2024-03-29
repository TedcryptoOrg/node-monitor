import {upsert} from '../../../Ui/Http/NotificationChannels/upsert'
import {findAll} from '../../../Ui/Http/NotificationChannels/findAll'
import {test} from '../../../Ui/Http/NotificationChannels/test'
import {deleteNotificationChannel} from '../../../Ui/Http/NotificationChannels/delete'
import {getById} from "../../../Ui/Http/NotificationChannels/getById";

const notificationChannelsRouter = require('express').Router()

notificationChannelsRouter.post('/', upsert)
notificationChannelsRouter.get('/', findAll)
notificationChannelsRouter.get('/:id', getById)
notificationChannelsRouter.put('/:id', upsert)
notificationChannelsRouter.delete('/:id', deleteNotificationChannel)
notificationChannelsRouter.post('/test', test)

export default notificationChannelsRouter
