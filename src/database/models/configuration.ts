'use strict';

import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from "../config";

interface ConfigurationAttributes {
    id: number,
    name: string,
    chain: string,
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ConfigurationInput extends Optional<ConfigurationAttributes, 'id'> {}
export interface ConfigurationOutput extends Required<ConfigurationAttributes> {}

class Configuration extends Model<ConfigurationAttributes, ConfigurationInput> implements ConfigurationAttributes {
  public id!: number
  public name!: string
  public chain!: string
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

  static associate(models: Model[]) {
    // @ts-ignore: Unreachable code error
    Configuration.hasMany(models.Server, {
        foreignKey: 'configuration_id',
        as: 'servers',
        onDelete: 'CASCADE'
    })
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