import type Event from './Event'

export default interface EventHandler<E> {
  handle: (event: E) => Promise<void>

  supports: (event: Event) => boolean
}
