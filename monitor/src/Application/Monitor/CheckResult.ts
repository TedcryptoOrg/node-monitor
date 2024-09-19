import type { CheckStatus } from '../../Domain/Checker/CheckStatusEnum'
import type CheckSignCommandState from './CheckSignMiss/CheckSignCommandState'
import type CheckBlockCommandState from './CheckBlock/CheckBlockCommandState'
import type CheckUrlCommandState from "./CheckUrl/CheckUrlCommandState";

export default class CheckResult {
  constructor (
    public readonly status: CheckStatus,
    public readonly message: string,
    public readonly state?: CheckSignCommandState | CheckBlockCommandState | CheckUrlCommandState
  ) {
  }
}
