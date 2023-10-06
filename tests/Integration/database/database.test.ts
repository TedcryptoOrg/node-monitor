import {createAndResetDatabaseInstance} from "../../Helper/databaseHelper";
import {create as createConfiguration} from "../../../src/database/dal/configuration";
import {create as createServer} from "../../../src/database/dal/server";
import {create as createService} from "../../../src/database/dal/service";
import {create as createMonitor} from "../../../src/database/dal/monitor";
import {SERVICE_TYPES} from "../../../src/database/models/service";

describe('Database', () => {

    beforeAll(async () => {
        await createAndResetDatabaseInstance();
    })

    it('should create a configuration', async () => {
        const configuration = await createConfiguration({
            name: 'configuration_test',
            chain: 'chain_test',
            is_enabled: true
        });

        expect(configuration).not.toBeNull();
        expect(configuration?.id).toBe(1);
        expect(configuration?.name).toBe('configuration_test');
        expect(configuration?.chain).toBe('chain_test');
        expect(configuration?.is_enabled).toBe(true);

        // test associations
        const monitors = await configuration?.getMonitors();
        expect(monitors).not.toBeNull();
        expect(monitors?.length).toBe(0);

        const servers = await configuration?.getServers();
        expect(servers).not.toBeNull();
        expect(servers?.length).toBe(0);
    })

    it('should create a server', async () => {
        const configuration = await createConfiguration({
            name: 'configuration_test',
            chain: 'chain_test',
            is_enabled: true
        });

        const server = await createServer({
            name: 'server_test',
            address: 'localhost',
            is_enabled: true,
            configuration_id: configuration.id
        });

        expect(server).not.toBeNull();
        expect(server?.id).toBe(1);
        expect(server?.name).toBe('server_test');
        expect(server?.address).toBe('localhost');
        expect(server?.is_enabled).toBe(true);
        expect(server?.configuration_id).toBe(configuration.id);

        // test associations
        const configurationFromServer = await server?.getConfiguration();
        expect(configurationFromServer).not.toBeNull();
        expect(configurationFromServer?.id).toBe(configuration.id);

        const services = await server?.getServices();
        expect(services).not.toBeNull();
        expect(services?.length).toBe(0);
    });

    it('should create a service', async () => {
        const configuration = await createConfiguration({
            name: 'configuration_test',
            chain: 'chain_test',
            is_enabled: true
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
            type: SERVICE_TYPES.RPC,
            is_enabled: true,
            server_id: server.id
        });

        expect(service).not.toBeNull();
        expect(service?.id).toBe(1);
        expect(service?.name).toBe('RPC');
        expect(service?.address).toBe('localhost:26657');
        expect(service?.is_enabled).toBe(true);
        expect(service?.server_id).toBe(server.id);

        // test associations
        const serverFromService = await service?.getServer();
        expect(serverFromService).not.toBeNull();
        expect(serverFromService?.id).toBe(server.id);
    })

    it('should create a monitor check', async () => {
        const configuration = await createConfiguration({
            name: 'configuration_test',
            chain: 'chain_test',
            is_enabled: true
        });

        const monitor = await createMonitor({
            name: 'Check URL',
            type: 'UrlChecker',
            is_enabled: true,
            configuration_id: configuration.id,
            configuration_object: JSON.stringify({}),
        })

        expect(monitor).not.toBeNull();
        expect(monitor?.id).toBe(1);
        expect(monitor?.name).toBe('Check URL');
        expect(monitor?.type).toBe('UrlChecker');
        expect(monitor?.is_enabled).toBe(true);
        expect(monitor?.configuration_id).toBe(configuration.id);
        expect(monitor?.configuration_object).toBe('{}');

        // test associations
        const configurationFromMonitor = await monitor?.getConfiguration();
        expect(configurationFromMonitor).not.toBeNull();
        expect(configurationFromMonitor?.id).toBe(configuration.id);
    });
});