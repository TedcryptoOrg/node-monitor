import Database from "../../database/database";
import {Configuration} from "../../type/configuration";

export class ConfigurationManager {
    constructor(private readonly database: Database) {
    }

    async getAllConfigurations(): Promise<Configuration[]> {
        const configurationModel = this.database.model('configuration');

        // @ts-ignore: Unreachable code error
        return configurationModel.findAll();
    }
}