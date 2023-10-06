import { Sequelize } from 'sequelize'
require('dotenv').config({ path: '.env', override: false })

console.debug('Connection to database using ' + process.env.DB_DSN)

const sequelizeConnection = new Sequelize(process.env.DB_DSN as string)

export default sequelizeConnection
