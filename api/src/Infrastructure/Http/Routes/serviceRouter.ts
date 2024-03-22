import { upsert } from '../../../Ui/Http/Services/upsert'
import { findAll } from '../../../Ui/Http/Services/findAll'
import { update } from '../../../Ui/Http/Services/update'
import { deleteService } from '../../../Ui/Http/Services/delete'

// Configuration Router
const serviceRouter = require('express').Router()

serviceRouter.post('/', upsert)
serviceRouter.get('/', findAll)
serviceRouter.put('/:id', update)
serviceRouter.delete('/:id', deleteService)

export default serviceRouter
