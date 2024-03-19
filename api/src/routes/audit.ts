// Configuration Router
import {findLatest} from "../controllers/audit/findLatest";

const configurationRouter = require('express').Router()

configurationRouter.get('/latest', findLatest)

export default configurationRouter