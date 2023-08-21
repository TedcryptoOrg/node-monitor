import Database from "../../../src/database/database";
import {Model, Sequelize} from "sequelize";
import Configuration from "../../../src/database/models/configuration";
import Server from "../../../src/database/models/server";

describe('Database', () => {
    let database:Sequelize;

    beforeAll(async () => {
        database = await (new Database('sqlite::memory:')).getDatabase();
        await database.sync({force: true})
        await database.truncate()
    })

    it('should create a configuration', async () => {
        const configurationModel = database.model('configuration');

        await configurationModel.create({
            name: 'test',
            chain: 'test',
        })

        const configuration: Model<Configuration>|null = await configurationModel.findOne({where: {name: 'test'}})
        expect(configuration).not.toBeNull();
        expect(configuration?.name).toBe('test');
        expect(configuration?.chain).toBe('test');
    })

    it('should create a server', () => {
        const serverModel = database.model('server');

        serverModel.create({
            name: 'test',
            ip_address: '127.0.0.1'
        });

        serverModel.findOne({where: {name: 'test'}}).then((server: Model<Server>|null) => {
            expect(server).not.toBeNull();
            expect(server?.name).toBe('test');
            expect(server?.ip_address).toBe('127.0.0.1');
        })
    });
});