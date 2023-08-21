import Database from "../../../src/database/database";
import {Sequelize} from "sequelize";

describe('Database', () => {
    let database:Sequelize;

    beforeAll(async () => {
        database = await (new Database('sqlite::memory:')).getDatabase();
        await database.sync({force: true})
        await database.truncate()
    })

    it('should connect to the database', async () => {
        const configurationModel = database.model('configuration');

        await configurationModel.create({
            name: 'test',
            chain: 'test',
        })

        const configuration = await configurationModel.findOne({where: {name: 'test'}})
        expect(configuration).not.toBeNull();
        expect(configuration.name).toBe('test');
        expect(configuration.chain).toBe('test');
    })
});