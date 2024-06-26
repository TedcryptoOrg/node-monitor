import type ConfigurationNotification from './ConfigurationNotification'

export default interface ConfigurationNotificationRepository {
  upsert: (ConfigurationNotification: ConfigurationNotification) => Promise<ConfigurationNotification>

  delete: (id: number) => Promise<void>

  findByConfigurationId: (configurationId: number) => Promise<ConfigurationNotification[]>
}
