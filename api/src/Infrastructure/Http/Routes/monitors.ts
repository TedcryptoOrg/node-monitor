import { create } from '../../../Ui/Http/monitors/create'
import { findAll } from '../../../Ui/Http/monitors/findAll'
import { ping } from '../../../Ui/Http/monitors/ping'
import { update } from '../../../Ui/Http/monitors/update'
import { deleteMonitor } from '../../../Ui/Http/monitors/delete'
import {findFailed} from '../../../Ui/Http/monitors/findFailed';
import {findWarnings} from '../../../Ui/Http/monitors/findWarnings';

const monitorRouter = require('express').Router()

monitorRouter.post('/', create)
monitorRouter.get('/', findAll)
monitorRouter.put('/:id', update)
monitorRouter.delete('/:id', deleteMonitor)
monitorRouter.post('/:id/ping', ping)
monitorRouter.get('/failed', findFailed)
monitorRouter.get('/warnings', findWarnings)

export default monitorRouter
