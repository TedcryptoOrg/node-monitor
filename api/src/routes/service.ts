import { create } from '../controllers/services/create'
import { findAll } from '../controllers/services/findAll'
import { update } from '../controllers/services/update'
import { deleteService } from '../controllers/services/delete'

// Configuration Router
const serviceRouter = require('express').Router()

serviceRouter.post('/', create)
serviceRouter.get('/', findAll)
serviceRouter.put('/:id', update)
serviceRouter.delete('/:id', deleteService)

export default serviceRouter
