import type Checker from '../../../Domain/Checker/Checker'
import type Monitor from '../../../Domain/Monitor/Monitor'
import type CommandHandler from '../../../Domain/Command/CommandHandler'
import { CheckStatus } from '../../../Domain/Checker/CheckStatusEnum'
import type CheckResult from '../CheckResult'
import { sleep } from '../../Shared/sleep'
import type Command from '../../../Domain/Command/Command'
import CheckStatusChanged from '../CheckStatusChanged'
import { type EventDispatcher } from '../../../Domain/Event/EventDispatcher'
import type Logger from '../../Logger/Logger'

export abstract class AbstractChecker implements Checker {
  constructor (
    protected commandHandler: CommandHandler,
    protected eventDispatcher: EventDispatcher,
    protected logger: Logger,
    protected monitor: Monitor,
    protected status: CheckStatus = CheckStatus.UNKNOWN,
    protected stopSignal: boolean = false
  ) {
    if (!monitor.isEnabled) {
      this.stopSignal = true
    }
  }

  start (): void {
    if (!this.monitor.isEnabled) {
      this.logger.debug(`${this.monitor.getFullName()} is disabled`, { monitorId: this.monitor.id, configurationId: this.monitor.configuration.id })
      return
    }
    if (!this.stopSignal) {
      this.logger.debug(`${this.monitor.getFullName()} Already running`, { monitorId: this.monitor.id, configurationId: this.monitor.configuration.id })
      return
    }

    this.logger.debug(`${this.monitor.getFullName()} Starting`, { monitorId: this.monitor.id, configurationId: this.monitor.configuration.id })
    this.stopSignal = false
  }

  stop (): void {
    this.stopSignal = true
  }

  updateMonitor (monitor: Monitor): void {
    let restart = false
    if (this.monitor.isEnabled !== monitor.isEnabled) {
      restart = true
    }
    this.monitor = monitor
    this.stopSignal = !monitor.isEnabled
    if (restart) {
      if (monitor.isEnabled) {
        this.start()
      }
    }
  }

  setStatus (status: CheckStatus): void {
    this.status = status
  }

  getStatus (): CheckStatus {
    return this.status
  }

  protected abstract getCommand (): Command

  protected async postCheck (result: CheckResult): Promise<void> {
    // Do nothing by default
  }

  async check (): Promise<void> {
    do {
      const result: CheckResult = await this.commandHandler.handle(this.getCommand())

      this.logger.log(`${this.monitor.getFullName()}[Status: ${result.status.toString()}] ${result.message}`, { monitorId: this.monitor.id, configurationId: this.monitor.configuration.id })

      if (this.status !== result.status) {
        await this.eventDispatcher.dispatch(new CheckStatusChanged(this.monitor, this.status, result))
      }

      this.status = result.status

      await this.postCheck(result)

      if (!this.stopSignal) {
        // this.logger.log(`${this.monitor.getFullName()} Sleeping for ${this.monitor.checkIntervalSeconds} seconds`, {monitorId: this.monitor.id, configurationId: this.monitor.configuration.id})

        await sleep(1000 * this.monitor.checkIntervalSeconds)
      }
    } while (!this.stopSignal)
    if (this.stopSignal) {
      this.logger.debug(`${this.monitor.getFullName()} Stopped as requested`, { monitorId: this.monitor.id, configurationId: this.monitor.configuration.id })
    }
  }
}
