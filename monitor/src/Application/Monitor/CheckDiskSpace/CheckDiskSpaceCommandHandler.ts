import CommandHandler from '../../../Domain/Command/CommandHandler'
import { sleep } from '../../Shared/sleep'
import CheckResult from '../CheckResult'
import { CheckStatus } from '../../../Domain/Checker/CheckStatusEnum'
import CheckDiskSpaceCommand from './CheckDiskSpaceCommand'
import { NoRecoverableException } from '../../../Domain/NoRecoverableException'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../../Domain/DependencyInjection/types'
import ApiClient, { ServerMetricsResponse } from '../../../Domain/ApiClient'
import Logger from '../../Logger/Logger'

@injectable()
export default class CheckDiskSpaceCommandHandler implements CommandHandler<CheckDiskSpaceCommand> {
  constructor (
    @inject(TYPES.ApiClient) private readonly apiClient: ApiClient,
    @inject(TYPES.Logger) private readonly logger: Logger
  ) {
  }

  async handle (command: CheckDiskSpaceCommand): Promise<CheckResult> {
    const metrics = await this.fetchMetrics(command)

    this.logger.debug(`${command.messagePrefix} Used disk space: ${metrics.usedDiskSpacePercentage}%`, { command })

    if (metrics.usedDiskSpacePercentage >= command.threshold) {
      return new CheckResult(
        CheckStatus.ERROR,
                `Used disk space is ${metrics.usedDiskSpacePercentage}% above threshold ${command.threshold}`
      )
    }

    return new CheckResult(
      CheckStatus.OK,
            `Used disk space is ${metrics.usedDiskSpacePercentage}% below threshold ${command.threshold}`
    )
  }

  private async fetchMetrics (command: CheckDiskSpaceCommand, attempts = 0): Promise<ServerMetricsResponse> {
    try {
      return await this.apiClient.getServerMetrics(command.server.id)
    } catch (exception: any) {
      this.logger.error(exception.message as string, { exception, command, attempts })

      if (attempts >= 5) {
        throw new NoRecoverableException(`${command.messagePrefix} Error fetching metrics. Error: ${exception.message}`)
      }

      attempts = attempts + 1
      await sleep(2000 * attempts)

      return await this.fetchMetrics(command, attempts)
    }
  }
}
