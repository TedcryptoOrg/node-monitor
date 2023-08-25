import {getAll} from "../../database/dal/configuration";
import {ConfigurationOutput} from "../../database/models/configuration";

export class ConfigurationManager {
    async getAllConfigurations(): Promise<ConfigurationOutput[]> {
        return getAll();
    }
}