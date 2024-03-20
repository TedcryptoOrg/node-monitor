import { create } from '../../../Ui/Http/services/create'
import { findAll } from '../../../Ui/Http/services/findAll'
import { update } from '../../../Ui/Http/services/update'
import { deleteService } from '../../../Ui/Http/services/delete'

// Configuration Router
const serviceRouter = require('express').Router()

serviceRouter.post('/', create)
serviceRouter.get('/', findAll)
serviceRouter.put('/:id', update)
serviceRouter.delete('/:id', deleteService)

export default serviceRouter
