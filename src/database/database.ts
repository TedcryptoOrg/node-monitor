import {Model, ModelStatic, Sequelize} from 'sequelize'
import fs from 'fs'
import path from 'path'

export default class Database {
  private readonly sequelize: Sequelize
  private db: any = {}
  private readonly isConnected: boolean = false

  constructor (dbDsn: string) {
    this.sequelize = new Sequelize(dbDsn)
    this.loadModels()
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

  private loadModels (): void {
    const basename = path.basename(__filename)
    const modelFolder = path.join(__dirname, '/models')

    fs
      .readdirSync(path.join(modelFolder))
      .filter(file => {
        return (
          file.indexOf('.') !== 0 &&
                    file !== basename &&
                    file.slice(-3) === '.ts' &&
                    !file.includes('.test.js')
        )
      })
      .forEach(file => {
        const { default: ModelClass } = require(path.join(modelFolder, file))
        const model = ModelClass.init(this.sequelize)
        this.db[model.name] = model
      })

    Object.keys(this.db).forEach(modelName => {
      if (this.db[modelName].associate) {
        this.db[modelName].associate(this.db)
      }
    })
  }
}
