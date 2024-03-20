import { create } from '../../../Ui/Http/servers/create'
import { findAll } from '../../../Ui/Http/servers/findAll'
import { findById } from '../../../Ui/Http/servers/findById'
import { findServices } from '../../../Ui/Http/servers/findServices'
import { findMonitors } from '../../../Ui/Http/servers/findMonitors'
import { update } from '../../../Ui/Http/servers/update'
import { getMetrics } from '../../../Ui/Http/servers/getMetrics'
import { deleteServer } from '../../../Ui/Http/servers/delete'

// Configuration Router
const serverRouter = require('express').Router()

serverRouter.post('/', create)
serverRouter.get('/', findAll)
serverRouter.get('/:id', findById)
serverRouter.put('/:id', update)
serverRouter.delete('/:id', deleteServer)
serverRouter.get('/:id/metrics', getMetrics)

// Services
serverRouter.get('/:id/services', findServices)

// Monitors
serverRouter.get('/:id/monitors', findMonitors)

export default serverRouter
