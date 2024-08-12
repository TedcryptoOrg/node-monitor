import type Monitor from '../../Domain/Monitor/Monitor'
import type CheckResult from './CheckResult'
import type { CheckStatus } from '../../Domain/Checker/CheckStatusEnum'

export default class CheckStatusChanged {
  constructor (
    public monitor: Monitor,
    public lastStatus: CheckStatus,
    public checkResult: CheckResult
  ) {}
}
