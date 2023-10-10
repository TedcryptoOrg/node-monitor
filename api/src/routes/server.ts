import { create } from '../controllers/servers/create'
import { findAll } from '../controllers/servers/findAll'
import { update } from '../controllers/servers/update'
import { deleteConfiguration } from '../controllers/servers/delete'

// Configuration Router
const serverRouter = require('express').Router()

serverRouter.post('/', create)
serverRouter.get('/', findAll)
serverRouter.put('/:id', update)
serverRouter.delete('/:id', deleteConfiguration)

export default serverRouter
