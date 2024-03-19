'use strict';

import {
    Association,
    DataTypes,
    HasManyGetAssociationsMixin,
    Model,
    Optional
} from 'sequelize'
import db from "../config";
import Monitor from "./monitor";
import Server from "./server";
import {ConfigurationNotifications} from "./configurationNotifications";

interface ConfigurationAttributes {
    id: number
    name: string
    chain: string
    is_enabled: boolean
    createdAt?: Date
    updatedAt?: Date
}

export interface ConfigurationInput extends Optional<ConfigurationAttributes, 'id'> {}
export interface ConfigurationOutput extends Required<ConfigurationAttributes> {
    getMonitors: HasManyGetAssociationsMixin<Monitor>
    getServers: HasManyGetAssociationsMixin<Server>
    getNotificationChannels: HasManyGetAssociationsMixin<ConfigurationNotifications>
}

class Configuration extends Model<ConfigurationAttributes, ConfigurationInput> implements ConfigurationAttributes {
  declare id: number
  declare name: string
  declare chain: string
  declare is_enabled: boolean
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  declare public getMonitors: HasManyGetAssociationsMixin<Monitor>
  declare public getServers: HasManyGetAssociationsMixin<Server>
  declare public getNotificationChannels: HasManyGetAssociationsMixin<ConfigurationNotifications>

  public static associations: {
      monitors: Association<Configuration, Monitor>
      servers: Association<Configuration, Server>
      notificationChannels: Association<Configuration, ConfigurationNotifications>
  }
}

Configuration.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  chain: {
    type: DataTypes.STRING,
    allowNull: false,
  },
    is_enabled: {
      type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    }
}, {
  timestamps: true,
    tableName: 'configurations',
  sequelize: db.sequelize,
});

Configuration.hasMany(Monitor, {
    sourceKey: 'id',
    foreignKey: 'configuration_id',
    onDelete: 'CASCADE',
})
Monitor.belongsTo(Configuration, {
    foreignKey: 'configuration_id',
    targetKey: 'id',
})
Configuration.hasMany(Server, {
    sourceKey: 'id',
    foreignKey: 'configuration_id',
    onDelete: 'CASCADE',
})
Server.belongsTo(Configuration, {
    foreignKey: 'configuration_id',
    targetKey: 'id',
})
Configuration.hasMany(ConfigurationNotifications, {
    sourceKey: 'id',
    foreignKey: 'configuration_id',
    onDelete: 'CASCADE',
})
ConfigurationNotifications.belongsTo(Configuration, {
    foreignKey: 'configuration_id',
    targetKey: 'id',
})

export default Configuration