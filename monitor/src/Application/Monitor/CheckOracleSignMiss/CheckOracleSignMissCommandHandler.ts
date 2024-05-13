import CommandHandler from '../../../Domain/Command/CommandHandler'
import { inject, injectable } from 'inversify'
import CheckOracleSignMissCommand from './CheckOracleSignMissCommand'
import CheckResult from '../CheckResult'
import { TYPES } from '../../../Domain/DependencyInjection/types'
import { CheckStatus } from '../../../Domain/Checker/CheckStatusEnum'
import CheckOracleSignCommandState from './CheckOracleSignCommandState'
import BlockchainClient from '../../../Domain/Blockchain/BlockchainClient'
import BlockchainClientFactory from '../../../Domain/Blockchain/BlockchainClientFactory'
import Configuration from '../../../Domain/Configuration/Configuration'
import { ServiceType } from '../../../Domain/Services/ServiceType'
import Logger from '../../Logger/Logger'

@injectable()
export default class CheckOracleSignMissCommandHandler implements CommandHandler<CheckOracleSignMissCommand> {
  constructor (
    @inject(TYPES.BlockchainClientFactory) private readonly clientFactory: BlockchainClientFactory,
    @inject(TYPES.Logger) private readonly logger: Logger
  ) {
  }

  async handle (command: CheckOracleSignMissCommand): Promise<CheckResult> {
    const currentMissCounter = await (await this.getClient(command.configuration))
      .fetchOracleMissCounter(command.configuration.chain, command.valoperAddress)

    if (command.lastState === undefined) {
      return new CheckResult(
        CheckStatus.OK,
        'No previous state found. Starting fresh.',
        CheckOracleSignCommandState.fresh(currentMissCounter)
      )
    }

    const missDifference = currentMissCounter - command.lastState.resolvedMissCounter
    if (command.lastState.lastStatus === CheckStatus.OK && missDifference === 0) {
      return new CheckResult(
        CheckStatus.OK,
        'No misses!',
        command.lastState
      )
    }

    if (currentMissCounter > command.lastState.lastNumberOfBlocksMissed) {
      this.logger.log(`🟡${command.messagePrefix} Counter has increased, current missed in this missing period: ${missDifference}. Refreshing previous incident timestamp.`, { command })
      if (missDifference >= command.missTolerance) {
        return new CheckResult(
          CheckStatus.ERROR,
                    `Missed too many oracle signing blocks. Miss counter: ${missDifference}. Miss tolerance: ${command.missTolerance}`,
                    command.lastState.withStatus(currentMissCounter, CheckStatus.ERROR)
        )
      }

      return new CheckResult(
        CheckStatus.WARNING,
                `Missed ${missDifference} blocks since last check.`,
                command.lastState.withStatus(currentMissCounter, CheckStatus.WARNING)
      )
    }

    const secondsLeftToReset = command.missToleranceIntervalSeconds - (new Date().getTime() - command.lastState.lastRun) / 1000
    if (secondsLeftToReset <= 0) {
      return new CheckResult(
        CheckStatus.OK,
                `No more misses happened since last one. Last missed: ${missDifference}. Reset monitoring flags`,
                command.lastState.reset(currentMissCounter)
      )
    }

    return new CheckResult(
      CheckStatus.WARNING,
            `No more misses happened since last one. Last missed: ${missDifference}. Reset in ${secondsLeftToReset.toFixed(0)} seconds.`,
            command.lastState
    )
  }

  private async getClient (configuration: Configuration): Promise<BlockchainClient> {
    return await this.clientFactory.createClientFromConfiguration(configuration, ServiceType.REST)
  }
}
