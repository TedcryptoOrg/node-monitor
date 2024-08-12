import { CheckStatus } from '../../../Domain/Checker/CheckStatusEnum'
import BlockEta from '../BlockEta'

export default class CheckBlockCommandState {
  constructor (
    public readonly currentBlockHeight: number,
    public readonly missCounter: number,
    public readonly lastIncident: number,
    public readonly lastStatus: CheckStatus,
    public readonly isSyncing = false,
    public readonly blockEta: BlockEta
  ) {
  }

  static fresh (currentBlockHeight: number, isSyncing: boolean): CheckBlockCommandState {
    return new CheckBlockCommandState(currentBlockHeight, 0, 0, CheckStatus.OK, isSyncing, new BlockEta())
  }

  update (currentMissCounter: number, missCounter: number, status: CheckStatus): CheckBlockCommandState {
    const lastIncident = missCounter > this.missCounter ? new Date().getTime() : this.lastIncident

    return new CheckBlockCommandState(currentMissCounter, missCounter, lastIncident, status, this.isSyncing, this.blockEta)
  }

  reset (currentMissCounter: number): CheckBlockCommandState {
    return CheckBlockCommandState.fresh(currentMissCounter, this.isSyncing)
  }
}
