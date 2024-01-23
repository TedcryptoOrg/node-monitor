'use strict';

import {DataTypes, Model, Optional} from 'sequelize'
import db from "../config";
import {ConfigurationNotifications} from "./configurationNotifications";

interface NotificationChannelAttributes {
    id: number,
    type: string,
    name: string,
    configuration_object: string,
    is_enabled: boolean,
    created_at?: Date,
    updated_at?: Date,
}

export interface NotificationChannelInput extends Optional<NotificationChannelAttributes, 'id'> {}

export interface NotificationChannelOutput extends Required<NotificationChannelAttributes> {}

export class NotificationChannel extends Model<NotificationChannelAttributes, NotificationChannelInput> implements NotificationChannelAttributes {
    declare id: number
    declare type: string
    declare name: string
    declare configuration_object: string
    declare is_enabled: boolean
    declare readonly created_at: Date
    declare readonly updated_at: Date
}

NotificationChannel.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    configuration_object: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_enabled: {
        type: DataTypes.BOOLEAN,
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
    tableName: 'notification_channels',
    timestamps: false,
});

NotificationChannel.hasMany(ConfigurationNotifications, {
    sourceKey: 'id',
    foreignKey: 'notification_channel_id',
    as: 'configuration_notifications',
    onDelete: 'CASCADE',
})
ConfigurationNotifications.belongsTo(NotificationChannel, {
    foreignKey: 'notification_channel_id',
    as: 'notification_channel',
})
