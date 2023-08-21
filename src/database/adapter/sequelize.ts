import { Sequelize, DataTypes } from 'sequelize'
import fs from "fs";
import path from "path";

export default class Database {
    private readonly sequelize: Sequelize
    private db: any = {};

    constructor (dbDsn: string) {
        this.sequelize = new Sequelize(dbDsn)
        this.loadModels();
    }

    async connect (): Promise<void> {
        try {
            await this.sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
            throw new Error('Unable to connect to the database');
        }
    }

    private loadModels(): void
    {
        const basename = path.basename(__filename);
        const modelFolder = __dirname + '/../models';

        fs
            .readdirSync(path.join(modelFolder))
            .filter(file => {
                return (
                    file.indexOf('.') !== 0 &&
                    file !== basename &&
                    file.slice(-3) === '.js' &&
                    file.indexOf('.test.js') === -1
                );
            })
            .forEach(file => {
                const model = require(path.join(modelFolder, file))(this.sequelize, DataTypes);
                this.db[model.name] = model;
            });

        Object.keys(this.db).forEach(modelName => {
            if (this.db[modelName].associate) {
                this.db[modelName].associate(this.db);
            }
        });
    }
}
