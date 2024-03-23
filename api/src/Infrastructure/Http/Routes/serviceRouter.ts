import { upsert } from '../../../Ui/Http/Services/upsert'
import { findAll } from '../../../Ui/Http/Services/findAll'
import { deleteService } from '../../../Ui/Http/Services/delete'

const serviceRouter = require('express').Router()

serviceRouter.post('/', upsert)
serviceRouter.get('/', findAll)
serviceRouter.put('/:id', upsert)
serviceRouter.delete('/:id', deleteService)

export default serviceRouter
