import {Model, ModelStatic, Sequelize} from 'sequelize'
import Configuration from "./models/configuration";

export default class Database {
  private readonly sequelize: Sequelize
  private db: any = {}
  private readonly isConnected: boolean = false

  constructor (dbDsn: string) {
    this.sequelize = new Sequelize(dbDsn)
  }

  async connect (): Promise<void> {
    if (this.isConnected) {
      return
    }

    try {
      await this.sequelize.authenticate()
      console.log('Connection has been established successfully.')
    } catch (error) {
      console.error('Unable to connect to the database:', error)
      throw new Error('Unable to connect to the database')
    }
  }

  model(modelName: string): ModelStatic<Model<any, any>> {
    return this.sequelize.model(modelName)
  }

  async getDatabase (): Promise<Sequelize> {
    if (!this.isConnected) {
      await this.connect()
    }

    return this.sequelize
  }

}
