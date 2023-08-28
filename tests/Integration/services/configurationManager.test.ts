import {createAndResetDatabaseInstance} from "../../Helper/databaseHelper";
import {ConfigurationManager} from "../../../src/services/configuration/configurationManager";

describe('ConfigurationManager', () => {
    beforeAll(async () => {
        await createAndResetDatabaseInstance();
    })

    it('should fetch all configurations', async () => {
        const configurationManager = new ConfigurationManager();
        const configurations = await configurationManager.getAllConfigurations()
        expect(configurations).not.toBeNull();
        expect(configurations.length).toBe(0);
    });
});