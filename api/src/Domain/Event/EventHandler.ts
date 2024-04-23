import type Event from './Event'

export default interface EventHandler {
  handle: (event: Event) => Promise<void>

  supports: (event: Event) => boolean
}
