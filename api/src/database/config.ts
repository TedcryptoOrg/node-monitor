import { Sequelize } from 'sequelize'
import dbConfig from '../../config/db.config'

console.debug('Connection to database using ' + process.env.DB_DSN)

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
})

const db = {
  Sequelize,
  sequelize
}

export default db
