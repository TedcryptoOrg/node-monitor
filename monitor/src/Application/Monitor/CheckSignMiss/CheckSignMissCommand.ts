import type Command from '../../../Domain/Command/Command'
import type CheckSignCommandState from './CheckSignCommandState'
import type Configuration from '../../../Domain/Configuration/Configuration'

export default class CheckSignMissCommand implements Command {
  constructor (
    public readonly messagePrefix: string,
    public readonly configuration: Configuration,
    public readonly valoperAddress: string,
    public readonly missTolerance: number,
    public readonly missToleranceIntervalSeconds: number,
    public readonly lastState?: CheckSignCommandState
  ) {
  }
}
