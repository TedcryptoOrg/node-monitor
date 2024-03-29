import { upsert } from '../../../Ui/Http/Monitors/upsert'
import { findAll } from '../../../Ui/Http/Monitors/findAll'
import { ping } from '../../../Ui/Http/Monitors/ping'
import { deleteMonitor } from '../../../Ui/Http/Monitors/delete'
import {findFailed} from '../../../Ui/Http/Monitors/findFailed';
import {findWarnings} from '../../../Ui/Http/Monitors/findWarnings';

const monitorRouter = require('express').Router()

monitorRouter.post('/', upsert)
monitorRouter.get('/', findAll)
monitorRouter.put('/:id', upsert)
monitorRouter.delete('/:id', deleteMonitor)
monitorRouter.post('/:id/ping', ping)
monitorRouter.get('/failed', findFailed)
monitorRouter.get('/warnings', findWarnings)

export default monitorRouter
