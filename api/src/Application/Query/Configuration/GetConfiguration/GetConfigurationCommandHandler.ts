import CommandHandler from '../../../../Domain/Command/CommandHandler'
import GetConfigurationCommand from './GetConfigurationCommand'
import Configuration from '../../../../Domain/Configuration/Configuration'
import { inject, injectable } from 'inversify'
import ConfigurationRepository from '../../../../Domain/Configuration/ConfigurationRepository'
import { TYPES } from '../../../../Domain/DependencyInjection/types'

@injectable()
export default class GetConfigurationCommandHandler implements CommandHandler<GetConfigurationCommand> {
  constructor (
    @inject(TYPES.ConfigurationRepository) private readonly configurationRepository: ConfigurationRepository
  ) {}

  async handle (command: GetConfigurationCommand): Promise<Configuration> {
    return await this.configurationRepository.get(command.id)
  }
}
