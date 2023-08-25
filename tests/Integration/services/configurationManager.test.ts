import {createAndResetDatabaseInstance} from "../../Helper/databaseHelper";
import {ConfigurationManager} from "../../../src/services/configuration/configurationManager";

describe('ConfigurationManager', () => {
    let configurationManager: ConfigurationManager;

    beforeAll(async () => {
        await createAndResetDatabaseInstance();
        configurationManager = new ConfigurationManager();
    })

    it('should fetch all configurations', async () => {
        configurationManager.getAllConfigurations().then(configurations => {
            expect(configurations).not.toBeNull();
            expect(configurations.length).toBe(0);
        })
    });
});