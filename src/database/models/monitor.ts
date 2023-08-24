'use strict';

import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from "../config";

interface MonitorAttributes {
    id: number,
    name: string,
    type: string,
    is_enabled: boolean,
    configuration_id: number,
    configuration_object: string
}

export interface MonitorInput extends Optional<MonitorAttributes, 'id'> {}
export interface MonitorOutput extends Required<MonitorAttributes> {}

class Monitor extends Model<MonitorAttributes, MonitorInput> implements MonitorAttributes {
    public id!: number
    public name!: string
    public type!: string
    public is_enabled!: boolean
    public configuration_id!: number
    public configuration_object!: string
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

  associate(models: Model[]) {
    // @ts-ignore: Unreachable code error
    ServiceCheck.belongsTo(models.Service, {
        foreignKey: 'service_id',
        as: 'service',
        onDelete: 'CASCADE'
    })
  }
}

Monitor.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    configuration_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    configuration_object: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
    tableName: 'monitors',
    sequelize: sequelizeConnection,
});

export default Monitor
