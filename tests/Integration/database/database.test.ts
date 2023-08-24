import Database from "../../../src/database/database";
import {Model, Sequelize} from "sequelize";
import Configuration from "../../../src/database/models/configuration";
import Server from "../../../src/database/models/server";
import {createAndResetDatabaseInstance} from "../../Helper/databaseHelper";

describe('Database', () => {
    let database:Database;

    beforeAll(async () => {
        database = await createAndResetDatabaseInstance();
    })

    it('should create a configuration', async () => {
        const configurationModel = database.model('configuration');

        await configurationModel.create({
            name: 'test',
            chain: 'test',
        })

        const configuration: Model<Configuration>|null|any = await configurationModel.findOne({where: {name: 'test'}})
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

        serverModel.findOne({where: {name: 'test'}}).then((server: Model<Server>|null|any) => {
            expect(server).not.toBeNull();
            expect(server?.name).toBe('test');
            expect(server?.ip_address).toBe('127.0.0.1');
            expect(server?.is_enabled).toBe(true);
        })
    });

    it('should create a service', () => {
        const serviceModel = database.model('service');

        serviceModel.create({
            name: 'test',
            ip_address: '127.0.0.1',
            port: '8080'
        });

        serviceModel.findOne({where: {name: 'test'}}).then((service: Model<Server>|null|any) => {
            expect(service).not.toBeNull();
            expect(service?.name).toBe('test');
            expect(service?.ip_address).toBe('127.0.0.1');
            expect(service?.port).toBe('8080');
            expect(service?.is_enabled).toBe(true);
        })
    })

    it('should creeate a service check', () => {
        const serviceCheck = database.model('serviceCheck')

        serviceCheck.create({
            name: 'test',
            type: 'http',
            ip_address: '',
            port: '',
            is_enabled: true,
            configuration_object: JSON.stringify({}),
        })

        serviceCheck.findOne({where: {name: 'test'}}).then((serviceCheck: Model<Server>|null|any) => {
            expect(serviceCheck).not.toBeNull();
            expect(serviceCheck?.name).toBe('test');
            expect(serviceCheck?.type).toBe('http');
            expect(serviceCheck?.ip_address).toBe('');
            expect(serviceCheck?.port).toBe('');
            expect(serviceCheck?.is_enabled).toBe(true);
            expect(serviceCheck?.configuration_object).toBe('{}');
        })
    });
});