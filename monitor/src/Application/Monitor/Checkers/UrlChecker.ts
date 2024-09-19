import type Command from '../../../Domain/Command/Command'
import { AbstractChecker } from './AbstractChecker'
import CheckUrlCommand from '../CheckUrl/CheckUrlCommand'
import UrlMonitor from '../../../Domain/Monitor/UrlMonitor'
import CheckUrlCommandState from "../CheckUrl/CheckUrlCommandState";
import type CheckResult from "../CheckResult";

export default class UrlChecker extends AbstractChecker {
  private lastCommandState: CheckUrlCommandState | undefined

  getCommand (): Command {
    if (!(this.monitor instanceof UrlMonitor)) {
      throw new Error('Invalid monitor type')
    }

    return new CheckUrlCommand(
      this.monitor.getFullName(),
      this.monitor.url,
      this.monitor.allowedAttempts,
      this.lastCommandState
    )
  }

  protected async postCheck(result: CheckResult): Promise<void> {
    if (result.state !== undefined && !(result.state instanceof CheckUrlCommandState)) {
        throw new Error('Invalid state type')
    }

    this.lastCommandState = result.state
    await super.postCheck(result)
  }
}
