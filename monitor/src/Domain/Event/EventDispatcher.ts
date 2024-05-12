import type Event from './Event'

export interface EventDispatcher {
  dispatch: (event: Event) => Promise<void>
}
