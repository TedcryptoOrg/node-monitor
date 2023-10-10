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
}

class Configuration extends Model<ConfigurationAttributes, ConfigurationInput> implements ConfigurationAttributes {
  public id!: number
  public name!: string
  public chain!: string
    public is_enabled!: boolean
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getMonitors!: HasManyGetAssociationsMixin<Monitor>
  public getServers!: HasManyGetAssociationsMixin<Server>

  public static associations: {
      monitors: Association<Configuration, Monitor>
      servers: Association<Configuration, Server>
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


export default Configuration