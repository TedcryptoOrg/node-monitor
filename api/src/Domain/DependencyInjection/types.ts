export const TYPES = {
    CommandHandler: Symbol.for('CommandHandler'),
    EventHandler: Symbol.for('EventHandler'),
    SecurityProvider: Symbol.for('SecurityProvider'),
    PasswordEncoder: Symbol.for('PasswordEncoder'),
    OrmClient: Symbol.for('OrmClient'),
    AuditRepository: Symbol.for('AuditRepository'),
    ConfigurationRepository: Symbol.for('ConfigurationRepository'),
    ServerRepository: Symbol.for('ServerRepository'),
    NotificationChannelRepository: Symbol.for('NotificationChannelRepository'),
    NotificationChannelClientFactory: Symbol.for('NotificationChannelClientFactory'),
    MonitorRepository: Symbol.for('MonitorRepository'),
    ServiceRepository: Symbol.for('ServiceRepository'),
}
