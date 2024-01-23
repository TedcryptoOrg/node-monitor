'use strict';

import {DataTypes, HasManyGetAssociationsMixin, HasOneGetAssociationMixin, Model, Optional} from 'sequelize'
import db from "../config";
import Configuration from "./configuration";
import {NotificationChannel} from "./notificationChannel";

interface ConfigurationNotificationsAttributes {
    id: number,
    configuration_id: number,
    notification_channel_id: number,
    created_at?: Date,
    updated_at?: Date,
}

export interface ConfigurationNotificationsInput extends Optional<ConfigurationNotificationsAttributes, 'id'> {}

export interface ConfigurationNotificationsOutput extends Required<ConfigurationNotificationsAttributes> {
    getConfiguration: HasOneGetAssociationMixin<Configuration>
    getNotificationChannel: HasOneGetAssociationMixin<NotificationChannel>
}

export class ConfigurationNotifications extends Model<ConfigurationNotificationsAttributes, ConfigurationNotificationsInput> implements ConfigurationNotificationsAttributes {
    declare id: number
    declare configuration_id: number
    declare notification_channel_id: number
    declare readonly created_at: Date
    declare readonly updated_at: Date

    declare public getConfiguration: HasOneGetAssociationMixin<Configuration>
    declare public getNotificationChannel: HasOneGetAssociationMixin<NotificationChannel>
}

ConfigurationNotifications.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    configuration_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    notification_channel_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    sequelize: db.sequelize,
    tableName: 'configuration_notification_channels',
    timestamps: false,
});