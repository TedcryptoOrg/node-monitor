'use strict';

import {
    Association,
    DataTypes,
    HasManyCreateAssociationMixin,
    HasManyGetAssociationsMixin,
    Model,
    NonAttribute,
    Optional
} from 'sequelize'
import sequelizeConnection from "../config";
import Monitor from "./monitor";

interface ConfigurationAttributes {
    id: number
    name: string
    chain: string
    createdAt?: Date
    updatedAt?: Date
}

export interface ConfigurationInput extends Optional<ConfigurationAttributes, 'id'> {}
export interface ConfigurationOutput extends Required<ConfigurationAttributes> {
    getMonitors: HasManyGetAssociationsMixin<Monitor>
}

class Configuration extends Model<ConfigurationAttributes, ConfigurationInput> implements ConfigurationAttributes {
  public id!: number
  public name!: string
  public chain!: string
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getMonitors!: HasManyGetAssociationsMixin<Monitor>

  public static associations: {
      monitors: Association<Configuration, Monitor>
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
}, {
  timestamps: true,
    tableName: 'configurations',
  sequelize: sequelizeConnection,
});

export default Configuration