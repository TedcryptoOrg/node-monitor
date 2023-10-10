import { create } from '../controllers/monitors/create'
import { findAll } from '../controllers/monitors/findAll'
import { update } from '../controllers/monitors/update'
import { deleteMonitor } from '../controllers/monitors/delete'

const monitorRouter = require('express').Router()

monitorRouter.post('/', create)
monitorRouter.get('/', findAll)
monitorRouter.put('/:id', update)
monitorRouter.delete('/:id', deleteMonitor)

export default monitorRouter
