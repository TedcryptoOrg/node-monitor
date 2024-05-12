export const TYPES = {
  // Generics
  CommandHandler: Symbol.for('CommandHandler'),
  EventHandler: Symbol.for('EventHandler'),
  EventDispatcher: Symbol.for('EventDispatcher'),
  AlertChannel: Symbol.for('AlertChannel'),
  Alerter: Symbol.for('Alerter'),

  // Clients
  HttpClient: Symbol.for('HttpClient'),
  ApiClient: Symbol.for('ApiClient'),
  WebSocketServer: Symbol.for('WebSocketServer'),
  MonitorCheckerFactory: Symbol.for('MonitorCheckerFactory'),
  BlockchainClientFactory: Symbol.for('BlockchainClientFactory'),

  // Logger
  Logger: Symbol.for('Logger')
}
