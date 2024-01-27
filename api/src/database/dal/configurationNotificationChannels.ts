import {ConfigurationNotifications} from "../models/configurationNotifications";

export async function findByConfigurationId(id: number) {
    return await ConfigurationNotifications.findAll({
        where: {
            configuration_id: id
        }
    })
}
