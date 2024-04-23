import type Monitor from '../../../Domain/Monitor/Monitor'

export default class MonitorDisabled {
  constructor (
    public readonly monitor: Monitor
  ) {
  }
}
