import {login} from "../../../Ui/Http/Login/login";
import express from 'express'

const LoginRouter = express.Router()

LoginRouter.post('/', login)

export default LoginRouter