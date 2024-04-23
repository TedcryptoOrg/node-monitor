import type Monitor from '../../../Domain/Monitor/Monitor'

export default class MonitorEnabled {
  constructor (
    public readonly monitor: Monitor
  ) {
  }
}
