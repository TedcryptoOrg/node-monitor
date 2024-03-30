import Event from './Event'

export interface EventDispatcher {
    dispatch(event: Event): Promise<void>
}
