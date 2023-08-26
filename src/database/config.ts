import { Sequelize } from 'sequelize'

const sequelizeConnection = new Sequelize(process.env.DB_DSN as string)

export default sequelizeConnection
