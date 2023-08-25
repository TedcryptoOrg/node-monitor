import { type Model, type ModelStatic, type Sequelize } from 'sequelize'
import sequelizeConnection from './config'

class Database {

  constructor (private readonly sequelize: Sequelize) {

  }

  model (modelName: string): ModelStatic<Model<any, any>> {
    return this.sequelize.model(modelName)
  }

  async getDatabase (): Promise<Sequelize> {
    return this.sequelize
  }
}

export const database = new Database(sequelizeConnection)
