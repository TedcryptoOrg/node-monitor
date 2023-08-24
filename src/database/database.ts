import {Model, ModelStatic, Sequelize} from 'sequelize'

export default class Database {
  private readonly sequelize: Sequelize

  constructor (dbDsn: string) {
    this.sequelize = new Sequelize(dbDsn)
  }

  model(modelName: string): ModelStatic<Model<any, any>> {
    return this.sequelize.model(modelName)
  }

  async getDatabase (): Promise<Sequelize> {
    return this.sequelize
  }

}
