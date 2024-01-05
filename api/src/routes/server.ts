import { create } from '../controllers/servers/create'
import { findAll } from '../controllers/servers/findAll'
import { findById } from '../controllers/servers/findById'
import { findServices } from '../controllers/servers/findServices'
import { findMonitors } from '../controllers/servers/findMonitors'
import { update } from '../controllers/servers/update'
import { deleteServer } from '../controllers/servers/delete'

// Configuration Router
const serverRouter = require('express').Router()

serverRouter.post('/', create)
serverRouter.get('/', findAll)
serverRouter.get('/:id', findById)
serverRouter.put('/:id', update)
serverRouter.delete('/:id', deleteServer)

// Services
serverRouter.get('/:id/services', findServices)

// Monitors
serverRouter.get('/:id/monitors', findMonitors)

export default serverRouter
