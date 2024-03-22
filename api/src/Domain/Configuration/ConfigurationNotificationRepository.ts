import ConfigurationNotification from "./ConfigurationNotification";

export default interface ConfigurationNotificationRepository {
    upsert(ConfigurationNotification: ConfigurationNotification): Promise<ConfigurationNotification>

    delete(id: number): Promise<void>
}