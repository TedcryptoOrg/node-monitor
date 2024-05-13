import CommandHandler from '../../../Domain/Command/CommandHandler'
import PingHealthcheckCommand from './PingHealthcheckCommand'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../../Domain/DependencyInjection/types'
import { HttpClient } from '../../../Domain/Http/HttpClient'
import Logger from '../../Logger/Logger'

@injectable()
export default class PingHealthcheckCommandHandler implements CommandHandler<PingHealthcheckCommand> {
  constructor (
    @inject(TYPES.HttpClient) private readonly httpClient: HttpClient,
    @inject(TYPES.Logger) private readonly logger: Logger
  ) {
  }

  async handle (command: PingHealthcheckCommand): Promise<void> {
    try {
      await this.httpClient.get(`${command.healthCheckUrl}/ping`)
    } catch (error) {
      this.logger.error('Health check ping failed', { error })
    }
  }
}
