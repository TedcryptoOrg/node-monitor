import CommandHandler from "../../../../Domain/Command/CommandHandler";
import FindAllConfigurationsCommand from "./FindAllConfigurationsCommand";
import {inject, injectable} from "inversify";
import ConfigurationRepository from "../../../../Domain/Configuration/ConfigurationRepository";
import {TYPES} from "../../../../Domain/DependencyInjection/types";
import Configuration from "../../../../Domain/Configuration/Configuration";

@injectable()
export default class FindAllConfigurationsCommandHandler implements CommandHandler {
    constructor(
        @inject(TYPES.ConfigurationRepository) private configurationRepository: ConfigurationRepository,
    ) {}

    handle(command: FindAllConfigurationsCommand): Promise<Configuration[]> {
        return this.configurationRepository.findAll();
    }
}
