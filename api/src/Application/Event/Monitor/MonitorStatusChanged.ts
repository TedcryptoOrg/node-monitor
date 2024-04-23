import type Event from '../../../Domain/Event/Event'
import type Monitor from '../../../Domain/Monitor/Monitor'

export default class MonitorStatusChanged implements Event {
  constructor (
    public readonly monitor: Monitor,
    public readonly status: boolean,
    public readonly lastError: string | null
  ) {
  }
}
