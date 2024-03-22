export const TYPES = {
    // Generics
    CommandHandler: Symbol.for('CommandHandler'),
    EventHandler: Symbol.for('EventHandler'),

    // Security
    SecurityProvider: Symbol.for('SecurityProvider'),
    PasswordEncoder: Symbol.for('PasswordEncoder'),

    // Clients
    OrmClient: Symbol.for('OrmClient'),

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
}
