export default interface WebsocketClient {
  connect: () => void
  disconnect: () => void
  send: (message: object) => void
  onMessage: (callback: (message: string) => void) => void
  onError: (callback: (error: Error) => void) => void
  onClose: (callback: (code: number, reason: string) => void) => void
  onOpen: (callback: () => void) => void
}
