import {create} from '../controllers/notificationChannels/create'
import {findAll} from '../controllers/notificationChannels/findAll'
import {update} from '../controllers/notificationChannels/update'
import {test} from '../controllers/notificationChannels/test'
import {deleteNotificationChannel} from '../controllers/notificationChannels/delete'

const notificationChannels = require('express').Router()

notificationChannels.post('/', create)
notificationChannels.get('/', findAll)
notificationChannels.put('/:id', update)
notificationChannels.delete('/:id', deleteNotificationChannel)
notificationChannels.post('/test', test)

export default notificationChannels
