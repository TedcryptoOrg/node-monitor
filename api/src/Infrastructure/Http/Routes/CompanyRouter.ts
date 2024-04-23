import { list } from '../../../Ui/Http/Companies/list'
import { get } from '../../../Ui/Http/Companies/get'
import { upsert } from '../../../Ui/Http/Companies/upsert'
import { remove } from '../../../Ui/Http/Companies/delete'
import express from 'express'

const CompanyRouter = express.Router()

CompanyRouter.get('/', list)
CompanyRouter.post('/', upsert)
CompanyRouter.get('/:id', get)
CompanyRouter.put('/:id', upsert)
CompanyRouter.delete('/:id', remove)

export default CompanyRouter
