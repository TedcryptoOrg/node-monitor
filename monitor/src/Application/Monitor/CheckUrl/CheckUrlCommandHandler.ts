import CommandHandler from '../../../Domain/Command/CommandHandler'
import CheckUrlCommand from './CheckUrlCommand'
import CheckResult from '../CheckResult'
import { CheckStatus } from '../../../Domain/Checker/CheckStatusEnum'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../../Domain/DependencyInjection/types'
import { HttpClient } from '../../../Domain/Http/HttpClient'
import { AxiosError } from 'axios'
import Logger from '../../Logger/Logger'
import CheckUrlCommandState from "./CheckUrlCommandState";

@injectable()
export default class CheckUrlCommandHandler implements CommandHandler<CheckUrlCommand> {
  constructor (
    @inject(TYPES.HttpClient) private readonly httpClient: HttpClient,
    @inject(TYPES.Logger) private readonly logger: Logger
  ) {
  }

  async handle (command: CheckUrlCommand): Promise<CheckResult> {
    try {
      this.logger.debug(`Checking URL: ${command.url}`, { command })
      await this.httpClient.get(command.url, { timeout: 5000 })
    } catch (error: any) {
      const axiosError = error as AxiosError
      if (axiosError.code === 'ECONNABORTED' || axiosError.response === undefined) {
        this.logger.error(`Error checking URL: ${command.url}`, { error })
        if (command.lastState === undefined) {
            return new CheckResult(
                CheckStatus.ERROR,
                `URL ${command.url} is unreachable`,
                CheckUrlCommandState.create()
            )
        }
        if (command.lastState.numFailures <= command.allowedAttempts) {
            return new CheckResult(
                CheckStatus.WARNING,
                `URL ${command.url} is unreachable. Attempt ${command.lastState.numFailures}`,
                command.lastState.incrementFailure()
            )
        }

        return new CheckResult(CheckStatus.ERROR, `URL ${command.url} is unreachable. Attempts ${command.lastState.numFailures} exceeded`)
      }
    }

    return new CheckResult(CheckStatus.OK, `URL ${command.url} is reachable`)
  }
}
