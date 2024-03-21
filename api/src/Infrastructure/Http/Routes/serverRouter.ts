import { findAll } from '../../../Ui/Http/Server/findAll'
import { findById } from '../../../Ui/Http/Server/findById'
import { findServices } from '../../../Ui/Http/Server/findServices'
import { findMonitors } from '../../../Ui/Http/Server/findMonitors'
import { upsert } from '../../../Ui/Http/Server/upsert'
import { getMetrics } from '../../../Ui/Http/Server/getMetrics'
import { deleteServer } from '../../../Ui/Http/Server/delete'

// Configuration Router
const serverRouter = require('express').Router()

serverRouter.post('/', upsert)
serverRouter.get('/', findAll)
serverRouter.get('/:id', findById)
serverRouter.put('/:id', upsert)
serverRouter.delete('/:id', deleteServer)
serverRouter.get('/:id/metrics', getMetrics)

// Services
serverRouter.get('/:id/services', findServices)

// Monitors
serverRouter.get('/:id/monitors', findMonitors)

export default serverRouter
