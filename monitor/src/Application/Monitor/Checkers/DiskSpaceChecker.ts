import { AbstractChecker } from './AbstractChecker'
import type Command from '../../../Domain/Command/Command'
import CheckDiskSpaceCommand from '../CheckDiskSpace/CheckDiskSpaceCommand'
import DiskSpaceCheckMonitor from '../../../Domain/Monitor/DiskSpaceCheckMonitor'

export default class DiskSpaceChecker extends AbstractChecker {
  getCommand (): Command {
    if (!(this.monitor instanceof DiskSpaceCheckMonitor)) {
      throw new Error('Invalid monitor type')
    }

    return new CheckDiskSpaceCommand(
      this.monitor.getFullName(),
      this.monitor.server,
      this.monitor.threshold
    )
  }
}
