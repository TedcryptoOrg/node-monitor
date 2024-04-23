import type Event from './Event'

export default interface EventHandler<TEvent> {
  handle: (event: TEvent) => Promise<void>

  supports: (event: Event) => boolean
}
