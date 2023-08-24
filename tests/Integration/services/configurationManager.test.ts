import {createAndResetDatabaseInstance} from "../../Helper/databaseHelper";
import {ConfigurationManager} from "../../../src/services/configuration/configurationManager";
import { create as createConfiguration } from "../../../src/database/dal/configuration";
import { create as createServer } from "../../../src/database/dal/server";
import { create as createService } from "../../../src/database/dal/service";
import { create as createMonitor } from "../../../src/database/dal/monitor";

describe('ConfigurationManager', () => {
    let configurationManager: ConfigurationManager;

    beforeAll(async () => {
        const database = await createAndResetDatabaseInstance();
        configurationManager = new ConfigurationManager(database);
    })

    it('should fetch all configurations', async () => {
        const configuration = await createConfiguration({
            name: 'configuration_test',
            chain: 'chain_test'
        });
        const server = await createServer({
            name: 'server_test',
            address: 'localhost',
            is_enabled: true,
            configuration_id: configuration.id
        });
        const service = await createService({
            name: 'RPC',
            address: 'localhost:26657',
            is_enabled: true,
            server_id: server.id
        });
        const monitor = await createMonitor({
            name: 'Check URL',
            type: 'UrlChecker',
            is_enabled: true,
            configuration_id: configuration.id,
            configuration_object: JSON.stringify({}),
        })

        const configurations = await configurationManager.getAllConfigurations();
        expect(configurations.length).toBe(1);
        expect(configurations[0]?.name).toBe('configuration_test');
        expect(configurations[0]?.chain).toBe('chain_test');
    });
});