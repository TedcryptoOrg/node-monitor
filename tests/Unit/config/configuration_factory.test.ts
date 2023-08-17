import { ConfigurationFactory } from '../../../src/config/configurationFactory';
import * as yaml from 'yaml';
import { readdirSync, writeFileSync, unlinkSync } from 'fs';
import {Configuration} from "../../../src/type/configuration";

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
            if (fileName === '.gitkeep') {
                return;
            }
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
                expect(configuration.priceFeeder.miss_tolerance).toBeDefined();
                expect(configuration.priceFeeder.miss_tolerance_period_seconds).toBeDefined();
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
            chainName: 'test',
            priceFeeder: {
                miss_tolerance: 1,
                miss_tolerance_period_seconds: 1,
                sleep_duration_seconds: 1,
                alert_sleep_duration_minutes: 1,
            },
            rest: {
                address: 'http://'
            },
            rpc: {
                address: 'http://'
            },
            prometheus: {
                address: 'http://'
            },
            valoperAddress: 'valoper',
        }

        writeFileSync(`${tempFolderPath}/${fileName}`, yaml.stringify(configuration));
    }
});
