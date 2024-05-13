import Monitor from '../../Domain/Monitor/Monitor'
import { MonitorType } from '../../Domain/Monitor/MonitorType'
import DiskSpaceChecker from './Checkers/DiskSpaceChecker'
import CommandHandlerManager from '../../Infrastructure/CommandHandler/CommandHandlerManager'
import { CheckStatus } from '../../Domain/Checker/CheckStatusEnum'
import { inject, injectable } from 'inversify'
import { MonitorCheckerFactory as MonitorCheckerFactoryInterface } from '../../Domain/Monitor/MonitorCheckerFactory'
import UrlChecker from './Checkers/UrlChecker'
import SignMissChecker from './Checkers/SignMissChecker'
import BlockChecker from './Checkers/BlockChecker'
import OracleSignMissChecker from './Checkers/OracleSignMissChecker'
import { TYPES } from '../../Domain/DependencyInjection/types'
import { EventDispatcher } from '../../Domain/Event/EventDispatcher'
import Logger from '../Logger/Logger'
import Checker from '../../Domain/Checker/Checker'

@injectable()
export default class MonitorCheckerFactory implements MonitorCheckerFactoryInterface {
  constructor (
    @inject(CommandHandlerManager) private readonly commandHandlerManager: CommandHandlerManager,
    @inject(TYPES.EventDispatcher) private readonly eventDispatcher: EventDispatcher,
    @inject(TYPES.Logger) private readonly logger: Logger
  ) {
  }

  create (monitor: Monitor): Checker {
    switch (monitor.type) {
      case MonitorType.DISK_SPACE_CHECK: {
        return new DiskSpaceChecker(
          this.commandHandlerManager,
          this.eventDispatcher,
          this.logger,
          monitor,
          CheckStatus.UNKNOWN
        )
      }
      case MonitorType.URL_CHECK: {
        return new UrlChecker(
          this.commandHandlerManager,
          this.eventDispatcher,
          this.logger,
          monitor,
          CheckStatus.UNKNOWN
        )
      }
      case MonitorType.SIGN_MISS_CHECK: {
        return new SignMissChecker(
          this.commandHandlerManager,
          this.eventDispatcher,
          this.logger,
          monitor,
          CheckStatus.UNKNOWN
        )
      }
      case MonitorType.BLOCK_CHECK: {
        return new BlockChecker(
          this.commandHandlerManager,
          this.eventDispatcher,
          this.logger,
          monitor,
          CheckStatus.UNKNOWN
        )
      }
      case MonitorType.PRICE_FEEDER_MISS_COUNT: {
        return new OracleSignMissChecker(
          this.commandHandlerManager,
          this.eventDispatcher,
          this.logger,
          monitor,
          CheckStatus.UNKNOWN
        )
      }
    }
  }
}
