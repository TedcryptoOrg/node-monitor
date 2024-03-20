import {findLatest} from "../../../Ui/Http/audit/findLatest";

const configurationRouter = require('express').Router()

configurationRouter.get('/latest', findLatest)

export default configurationRouter