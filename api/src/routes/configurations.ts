import { create } from '../controllers/configurations/create'
import { findAll } from '../controllers/configurations/findAll'
import { update } from '../controllers/configurations/update'
import { deleteConfiguration } from '../controllers/configurations/delete'
import { findMonitors } from "../controllers/configurations/findMonitors";
import { findServers } from "../controllers/configurations/findServers";
import { findById } from "../controllers/configurations/findById";

// Configuration Router
const configurationRouter = require('express').Router()

configurationRouter.post('/', create)
configurationRouter.get('/', findAll)
configurationRouter.get('/:id', findById)
configurationRouter.put('/:id', update)
configurationRouter.delete('/:id', deleteConfiguration)

configurationRouter.get('/:id/monitors', findMonitors)
configurationRouter.get('/:id/servers', findServers)

export default configurationRouter
