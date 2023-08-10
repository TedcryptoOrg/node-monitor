import {readdirSync, readFileSync} from 'fs';
import * as yaml from 'yaml';
import {Configuration} from "../type/configuration";

export class ConfigurationFactory {
    private folderPath: string;

    constructor(folderPath: string = __dirname + '/../../config') {
        this.folderPath = folderPath;
    }


    loadConfigurations(): { [key: string]: Configuration } {
        const files = readdirSync(this.folderPath);
        const configurations: { [key: string]: Configuration } = {};

        files.forEach((fileName) => {
            if (!fileName.endsWith('.yaml')) {
                return;
            }
            const filePath = `${this.folderPath}/${fileName}`;

            try {
                console.debug(`Reading file: ${filePath}`);
                const fileContent = readFileSync(filePath, 'utf8');
                // Add the parsed configuration.ts to the array
                configurations[fileName.replace('.yaml', '')] = yaml.parse(fileContent);
            } catch (error) {
                console.error(`Error reading or parsing file: ${filePath}`);
                console.error(error);
            }
        });

        return configurations;
    }
}