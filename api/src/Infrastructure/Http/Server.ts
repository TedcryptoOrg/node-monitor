import express, { type Request, type Response, type NextFunction } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import configurationRouter from './Routes/configurationsRouter'
import auditRouter from './Routes/auditRouter'
import serverRouter from './Routes/serverRouter'
import serviceRouter from './Routes/serviceRouter'
import monitorRouter from './Routes/monitorRouter'
import notificationChannelsRouter from './Routes/notificationChannelsRouter'
import CompanyRouter from './Routes/CompanyRouter'
import UserRouter from './Routes/UserRouter'
import LoginRouter from './Routes/LoginRouter'

dotenv.config()

const app = express()
const corsOptions = {
  origin: process.env.CORS_ORIGIN
}

// Setting it up
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: any, res: any) => {
  res.send('Hello there!')
})

app.use('/api/configurations', configurationRouter)
app.use('/api/audit', auditRouter)
app.use('/api/servers', serverRouter)
app.use('/api/services', serviceRouter)
app.use('/api/monitors', monitorRouter)
app.use('/api/notification-channels', notificationChannelsRouter)
app.use('/api/companies', CompanyRouter)
app.use('/api/users', UserRouter)
app.use('/api/login', LoginRouter)

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message })
})

export const server = app
