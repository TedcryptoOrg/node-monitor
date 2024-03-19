import {ConfigurationManager} from "../../../src/services/configurationManager";

describe('ConfigurationManager', () => {
    it('should fetch all configurations', async () => {
        const configurationManager = new ConfigurationManager();
        const configurations = await configurationManager.getAllConfigurations()
        expect(configurations).not.toBeNull();
        //expect(configurations[0]).toBe({});
        expect(configurations.length).toBe(0);
    });
});