import {findLatest} from "../../../Ui/Http/Audit/findLatest";

const auditRouter = require('express').Router()

auditRouter.get('/latest', findLatest)

export default auditRouter