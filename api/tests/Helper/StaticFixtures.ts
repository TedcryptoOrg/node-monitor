import Configuration from "../../src/Domain/Configuration/Configuration";
import {myContainer} from "../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../src/Domain/DependencyInjection/types";
import ConfigurationRepository from "../../src/Domain/Configuration/ConfigurationRepository";

export const createConfiguration = async (): Promise<Configuration> => {
    return myContainer.get<ConfigurationRepository>(TYPES.ConfigurationRepository).upsert(
        new Configuration(
            'test',
            'test',
            true
        )
    )
}
