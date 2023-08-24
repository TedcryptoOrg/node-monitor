import { Sequelize } from 'sequelize'

const dbDsn = process.env.DB_DSN as string

const sequelizeConnection = new Sequelize(dbDsn)

export default sequelizeConnection
