import { WebSocketServer as WsServer, WebSocket } from 'ws'
import { type WebSocketServer } from '../../Domain/Server/WebSocketServer'

export default class WsWebSocketServer implements WebSocketServer {
  server: WsServer | undefined

  constructor (private readonly port: number) {}

  start (): void {
    this.server = new WsServer({ port: this.port })

    console.log(`WebSocket server started on port ${this.port}`)
  }

  on (event: string, listener: (...args: any[]) => void): void {
    if (this.server === undefined) {
      this.start()
    }

    this.server?.on(event, listener)
  }

  send (message: string | object): void {
    this.server?.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(Buffer.from(typeof message === 'string' ? message : JSON.stringify(message)))
      }
    })
  }
}
