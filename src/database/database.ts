import { type Model, type ModelStatic, type Sequelize } from 'sequelize'
import Monitor from './models/monitor'
import Configuration from './models/configuration'
import sequelizeConnection from './config'

class Database {
  constructor (private readonly sequelize: Sequelize) {
    Configuration.hasMany(Monitor, {
      sourceKey: 'id',
      foreignKey: 'configuration_id',
      onDelete: 'CASCADE',
      onUpdate: 'NO ACTION'
    })
    Monitor.belongsTo(Configuration, {
      foreignKey: 'configuration_id',
      targetKey: 'id',
      foreignKeyConstraint: true,
      constraints: true
    })
  }

  model (modelName: string): ModelStatic<Model<any, any>> {
    return this.sequelize.model(modelName)
  }

  async getDatabase (): Promise<Sequelize> {
    return this.sequelize
  }
}

export const database = new Database(sequelizeConnection)
