export const TYPES = {
  // Generics
  CommandHandler: Symbol.for('CommandHandler'),
  EventHandler: Symbol.for('EventHandler'),
  EventDispatcher: Symbol.for('EventDispatcher'),

  // Security
  SecurityProvider: Symbol.for('SecurityProvider'),
  PasswordEncoder: Symbol.for('PasswordEncoder'),

  // Clients
  OrmClient: Symbol.for('OrmClient'),
  ServerMetricsExporter: Symbol.for('ServerMetricsExporter'),
  MonitorController: Symbol.for('MonitorController'),
  HttpClient: Symbol.for('HttpClient'),

  // Factories
  NotificationChannelClientFactory: Symbol.for('NotificationChannelClientFactory'),

  // Repositories
  AuditRepository: Symbol.for('AuditRepository'),
  ConfigurationRepository: Symbol.for('ConfigurationRepository'),
  ServerRepository: Symbol.for('ServerRepository'),
  MonitorRepository: Symbol.for('MonitorRepository'),
  ServiceRepository: Symbol.for('ServiceRepository'),
  NotificationChannelRepository: Symbol.for('NotificationChannelRepository'),
  ConfigurationNotificationRepository: Symbol.for('ConfigurationNotificationRepository'),
  CompanyRepository: Symbol.for('CompanyRepository'),
  UserRepository: Symbol.for('UserRepository')
}
