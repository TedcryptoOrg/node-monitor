import CommandHandler from '../../../Domain/Command/CommandHandler'
import CheckBlockCommand from './CheckBlockCommand'
import CheckResult from '../CheckResult'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../../Domain/DependencyInjection/types'
import BlockchainClientFactory from '../../../Domain/Blockchain/BlockchainClientFactory'
import { CheckStatus } from '../../../Domain/Checker/CheckStatusEnum'
import Configuration from '../../../Domain/Configuration/Configuration'
import BlockchainClient from '../../../Domain/Blockchain/BlockchainClient'
import Server from '../../../Domain/Server/Server'
import { ServiceType } from '../../../Domain/Services/ServiceType'
import CheckBlockCommandState from './CheckBlockCommandState'
import Logger from '../../Logger/Logger'

@injectable()
export default class CheckBlockCommandHandler implements CommandHandler {
  constructor (
    @inject(TYPES.BlockchainClientFactory) private readonly clientFactory: BlockchainClientFactory,
    @inject(TYPES.Logger) private readonly logger: Logger
  ) {
  }

  async handle (command: CheckBlockCommand): Promise<CheckResult> {
    const client = await this.getClient(command.configuration, command.server)
    const currentBlockHeight = await client.getBlockHeight()
    command.lastState?.blockEta.pushBlock(currentBlockHeight)

    this.logger.log(`️${command.messagePrefix} Height: ${currentBlockHeight}`, { command })

    if (command.lastState === undefined) {
      const isSyncing = await client.isSyncing()

      return new CheckResult(
        isSyncing ? CheckStatus.WARNING : CheckStatus.OK,
                `No previous state found. Starting fresh. ${isSyncing ? 'Node is syncing.' : ''}`,
                CheckBlockCommandState.fresh(currentBlockHeight, isSyncing)
      )
    }

    if (await client.isSyncing()) {
      return await this.handleSyncing(command, currentBlockHeight)
    }

    if (command.lastState.lastStatus === CheckStatus.OK &&
            currentBlockHeight > command.lastState.currentBlockHeight
    ) {
      return new CheckResult(
        CheckStatus.OK,
        'No misses!',
        command.lastState.update(currentBlockHeight, 0, CheckStatus.OK)
      )
    }

    if (currentBlockHeight <= command.lastState.currentBlockHeight) {
      const missCounter = command.lastState.missCounter + 1
      this.logger.log(`🟠️${command.messagePrefix} Block is not increasing. Miss counter: ${missCounter}`, { command })
      if (missCounter >= command.missTolerance) {
        return new CheckResult(
          CheckStatus.ERROR,
                    `Missing too many blocks. Miss counter exceeded: ${missCounter}`,
                    command.lastState.update(currentBlockHeight, missCounter, CheckStatus.ERROR)
        )
      }

      return new CheckResult(
        CheckStatus.WARNING,
                `Block(s) missed: ${missCounter}`,
                command.lastState.update(currentBlockHeight, missCounter, CheckStatus.WARNING)
      )
    }

    const secondsLeftToReset = command.missToleranceIntervalSeconds - (new Date().getTime() - command.lastState.lastIncident) / 1000
    if (secondsLeftToReset <= 0) {
      return new CheckResult(
        CheckStatus.OK,
                `No more blocks were missed since last incident. Last missed: ${command.lastState.missCounter}. Reset monitoring flags`,
                command.lastState.reset(currentBlockHeight)
      )
    }

    return new CheckResult(
      CheckStatus.WARNING,
            `No more misses happened since last one. Last missed: ${command.lastState.missCounter}. Reset in ${secondsLeftToReset.toFixed(0)} seconds.`,
            command.lastState
    )
  }

  private async handleSyncing (command: CheckBlockCommand, currentBlockHeight: number): Promise<CheckResult> {
    this.logger.log(`🟠️${command.messagePrefix} Node is syncing...`, { command })
    const publicClient = await this.getClient(command.configuration)
    let message = `Node is syncing... Current height: ${currentBlockHeight}`
    try {
      const knownBlockHeight = await publicClient.getBlockHeight()
      message += `, known block height: ${knownBlockHeight}`
      message += `, ETA: ${command.lastState?.blockEta.getEta(knownBlockHeight)}`
    } catch (error: any) {
      this.logger.error(error.message as string, { command })
    }

    return new CheckResult(
      CheckStatus.ERROR,
      message,
      command.lastState?.update(currentBlockHeight, 0, CheckStatus.ERROR)
    )
  }

  private async getClient (configuration: Configuration, server?: Server): Promise<BlockchainClient> {
    if (server !== undefined) {
      return await this.clientFactory.createClientFromServer(configuration, server, ServiceType.RPC)
    }

    return await this.clientFactory.createPublicClientFromConfiguration(configuration, ServiceType.RPC)
  }
}
