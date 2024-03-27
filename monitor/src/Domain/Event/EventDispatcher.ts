export interface EventDispatcher {
    dispatch(event: Event): Promise<void>
}
