import { ConfigurationFactory } from '../../src/config/configuration_factory';
import * as yaml from 'yaml';
import { readdirSync, writeFileSync, unlinkSync } from 'fs';
import { Configuration } from 'src/type/configuration';

describe('ConfigurationFactory', () => {
    let configurationFactory: ConfigurationFactory;
    const tempFolderPath = __dirname + '/fixtures';

    beforeEach(() => {
        configurationFactory = new ConfigurationFactory(tempFolderPath);
    });

    afterEach(() => {
        // Cleanup temporary folder after each test
        const files = readdirSync(tempFolderPath);
        files.forEach((fileName) => {
            const filePath = `${tempFolderPath}/${fileName}`;
            unlinkSync(filePath); // Delete file
        });
    });

    describe('loadConfigurations', () => {
        it('should load configurations from YAML files in the config folder', () => {
            createTemporaryFile('kujira.yaml');
            const configurations = configurationFactory.loadConfigurations();

            // Assert that configurations object is not empty
            expect(Object.keys(configurations).length).toBeGreaterThan(0);

            // Assert that each configuration is parsed correctly
            Object.keys(configurations).forEach((provider) => {
                // @ts-ignore
                const configuration: Configuration = configurations[provider];
                expect(configuration).toBeDefined();
                expect(configuration.miss_tolerance).toBeDefined();
                expect(configuration.miss_tolerance_period).toBeDefined();
            });
        });

        it('should ignore non-YAML files in the config folder', () => {
            // Create a temporary non-YAML file in the config folder
            createTemporaryFile('non-yaml.txt');

            const configurations = configurationFactory.loadConfigurations();

            // Assert that configurations object does not include the non-YAML file
            expect(Object.keys(configurations)).not.toContain('non-yaml');
        });
    });

    function createTemporaryFile(fileName: string) {
        const configuration: Configuration = {
            miss_tolerance: 1,
            miss_tolerance_period: 1,
            sleep_duration: 1,
            alert_sleep_duration: 1,
            node_rest: 'http://',
            valoper_address: 'valoper',
        }

        writeFileSync(`${tempFolderPath}/${fileName}`, yaml.stringify(configuration));
    }
});
