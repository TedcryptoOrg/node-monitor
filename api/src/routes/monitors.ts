import { create } from '../controllers/monitors/create'
import { findAll } from '../controllers/monitors/findAll'
import { ping } from '../controllers/monitors/ping'
import { update } from '../controllers/monitors/update'
import { deleteMonitor } from '../controllers/monitors/delete'
import {findFailed} from "../controllers/monitors/findFailed";
import {findWarnings} from "../controllers/monitors/findWarnings";

const monitorRouter = require('express').Router()

monitorRouter.post('/', create)
monitorRouter.get('/', findAll)
monitorRouter.put('/:id', update)
monitorRouter.delete('/:id', deleteMonitor)
monitorRouter.post('/:id/ping', ping)
monitorRouter.get('/failed', findFailed)
monitorRouter.get('/warnings', findWarnings)

export default monitorRouter
