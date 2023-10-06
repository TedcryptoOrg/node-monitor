import { Sequelize } from 'sequelize'

console.debug('Connection to database using ' + process.env.DB_DSN)

const sequelizeConnection = new Sequelize(process.env.DB_DSN as string)

export default sequelizeConnection
