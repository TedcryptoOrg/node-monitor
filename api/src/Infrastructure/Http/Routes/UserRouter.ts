import { list } from '../../../Ui/Http/User/list'
import { me } from '../../../Ui/Http/User/me'
import { get } from '../../../Ui/Http/User/get'
import { upsert } from '../../../Ui/Http/User/upsert'
import { remove } from '../../../Ui/Http/User/delete'
import express from 'express'
import { authenticateMiddleware } from '../AuthenticateMiddleware'

const UserRouter = express.Router()

UserRouter.get('/', list)
UserRouter.get('/me', authenticateMiddleware, me)
UserRouter.post('/', upsert)
UserRouter.get('/:id', get)
UserRouter.put('/:id', upsert)
UserRouter.delete('/:id', remove)

export default UserRouter
