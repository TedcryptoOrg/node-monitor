import type WebsocketClient from '../../Domain/Websocket/WebsocketClient'
import WebSocket, { type CloseEvent, type ErrorEvent } from 'ws'

export default class WsWebsocketClient implements WebsocketClient {
  private ws: WebSocket | undefined = undefined
  private isOpen: boolean = false
  private readonly messageQueue: Buffer[] = []

  constructor (
    private readonly url: string
  ) {
  }

  connect (): void {
    if (this.ws !== undefined) {
      console.debug('Websocket already starting...')
      return
    }

    console.debug('Connecting to', this.url)
    this.ws = new WebSocket(this.url)
    this.ws.on('open', () => {
      console.debug('Connection established')
      this.isOpen = true
      this.sendQueuedMessages()
    })
  }

  disconnect (): void {
    this.ws?.close()
  }

  onClose (callback: (code: number, reason: string) => void): void {
    this.ws?.addEventListener('close', (event: CloseEvent) => {
      callback(event.code, event.reason)
    })
  }

  onError (callback: (error: Error) => void): void {
    this.ws?.addEventListener('error', (event: ErrorEvent) => {
      callback(event.error)
    })
  }

  onMessage (callback: (message: string) => void): void {
    this.ws?.addEventListener('message', (event) => {
      let data: string
      if (typeof event.data === 'string') {
        data = event.data
      } else {
        data = event.data.toString()
      }
      callback(data)
    })
  }

  onOpen (callback: () => void): void {
    this.ws?.addEventListener('open', () => {
      callback()
      this.isOpen = true
    })
  }

  send (message: object): void {
    console.debug('Sending message', message)
    const bufferMessage = Buffer.from(JSON.stringify(message))
    if (!this.isOpen) {
      console.debug('Socket not open, waiting for connection')
      this.messageQueue.push(bufferMessage)
      this.connect()
    } else {
      console.debug('Socket open, sending message')
      this.ws?.send(bufferMessage)
    }
  }

  private sendQueuedMessages (): void {
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift()
      if (message !== undefined) {
        console.debug('Sending queued message')
        this.ws?.send(message)
      }
    }
  }
}
