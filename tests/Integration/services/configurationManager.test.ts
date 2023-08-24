import {createAndResetDatabaseInstance} from "../../Helper/databaseHelper";
import {createConfiguration, createServer, createService, createServiceCheck} from "../../Helper/fixedValues";
import {ConfigurationManager} from "../../../src/services/configuration/configurationManager";

describe('ConfigurationManager', () => {
    let configurationManager: ConfigurationManager;

    beforeAll(async () => {
        const database = await createAndResetDatabaseInstance();
        configurationManager = new ConfigurationManager(database);
    })

    it('should fetch all configurations', async () => {
        const configuration = await createConfiguration('configuration_test', 'chain_test');
        const server = await createServer('sever_test', '127.0.0.1', configuration);
        const service = await createService('RPC', '127.0.0.1', '26657', server);
        const serviceCheck = await createServiceCheck('Url checker', 'UrlChecker', '127.0.0.1', '26657', service);

        const configurations = await configurationManager.getAllConfigurations();
        expect(configurations.length).toBe(1);
        expect(configurations[0]?.name).toBe('configuration_test');
        expect(configurations[0]?.chain).toBe('chain_test');
        expect(configurations[0]?.servers.length).toBe(1);
        console.log(configurations);
    });
});