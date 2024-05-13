import { CheckStatus } from '../../../Domain/Checker/CheckStatusEnum'

export default class CheckSignCommandState {
  constructor (
    public readonly resolvedMissCounter: number,
    public readonly lastNumberOfBlocksMissed: number,
    public readonly lastRun: number,
    public readonly lastStatus: CheckStatus
  ) {
  }

  static fresh (currentMissCounter: number): CheckSignCommandState {
    return new CheckSignCommandState(currentMissCounter, currentMissCounter, 0, CheckStatus.OK)
  }

  withStatus (currentMissCounter: number, status: CheckStatus): CheckSignCommandState {
    return new CheckSignCommandState(this.resolvedMissCounter, currentMissCounter, new Date().getTime(), status)
  }

  reset (currentMissCounter: number): CheckSignCommandState {
    return CheckSignCommandState.fresh(currentMissCounter)
  }
}
