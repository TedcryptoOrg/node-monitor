import {create} from '../../../Ui/Http/notificationChannels/create'
import {findAll} from '../../../Ui/Http/notificationChannels/findAll'
import {update} from '../../../Ui/Http/notificationChannels/update'
import {test} from '../../../Ui/Http/notificationChannels/test'
import {deleteNotificationChannel} from '../../../Ui/Http/notificationChannels/delete'

const notificationChannels = require('express').Router()

notificationChannels.post('/', create)
notificationChannels.get('/', findAll)
notificationChannels.put('/:id', update)
notificationChannels.delete('/:id', deleteNotificationChannel)
notificationChannels.post('/test', test)

export default notificationChannels
