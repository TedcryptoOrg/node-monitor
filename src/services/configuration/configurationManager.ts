import Database from "../../database/database";
import {getAll} from "../../database/dal/configuration";
import {ConfigurationOutput} from "../../database/models/configuration";

export class ConfigurationManager {
    constructor(private readonly database: Database) {
    }

    async getAllConfigurations(): Promise<ConfigurationOutput[]> {
        return getAll();
    }
}