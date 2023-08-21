import {DataTypes, Sequelize} from 'sequelize'
import fs from "fs";
import path from "path";

export default class Database {
    private readonly sequelize: Sequelize
    private db: any = {};
    private isConnected: boolean = false;

    constructor (dbDsn: string) {
        this.sequelize = new Sequelize(dbDsn)
        this.loadModels();
    }

    async connect (): Promise<void> {
        if (this.isConnected) {
            return;
        }

        try {
            await this.sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
            throw new Error('Unable to connect to the database');
        }
    }

    async getDatabase(): Promise<Sequelize> {
        if (!this.isConnected) {
            await this.connect();
        }

        return this.sequelize;
    }

    private loadModels(): void
    {
        const basename = path.basename(__filename);
        const modelFolder = path.join(__dirname, '/models');

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
