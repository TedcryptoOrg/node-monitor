'use strict';

import {
    DataTypes,
    ForeignKey,
    HasOneGetAssociationMixin,
    Model,
    Optional
} from 'sequelize'
import db from "../config";
import Configuration from "./configuration";

export const monitorTypes = {
    urlCheck: {
        name: 'urlCheck',
        description: 'Monitor that a specific url is alive (this is automatically added to services created)',
    },
    blockCheck: {
        name: 'blockCheck',
        description: 'Check how many blocks were missed over a period'
    },
    signMissCheck: {
        name: 'signMissCheck',
        description: 'Check how much blocks were not signed over a period',
    },
    priceFeederMissCount: {
        name: 'priceFeederMissCount',
        description: 'Blocks missed in the price feeder over a period',
    },
    nodeExporterDiskSpace: {
        name: 'nodeExporterDiskSpace',
        description: 'Disk space left',
    },
}

interface MonitorAttributes {
    id: number,
    name: string,
    type: string,
    is_enabled: boolean,
    configuration_id: number,
    configuration_object: string,
}

export interface MonitorInput extends Optional<MonitorAttributes, 'id'> {}
export interface MonitorOutput extends Required<MonitorAttributes> {
    getConfiguration: HasOneGetAssociationMixin<Configuration>
}

class Monitor extends Model<MonitorAttributes, MonitorInput> implements MonitorAttributes {
    public id!: number
    public name!: string
    public type!: string
    public is_enabled!: boolean
    public configuration_id!: ForeignKey<Configuration['id']>
    public configuration_object!: string
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getConfiguration!: HasOneGetAssociationMixin<Configuration>
}

Monitor.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    configuration_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
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
    configuration_object: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: true,
    tableName: 'monitors',
    sequelize: db.sequelize,
});

export default Monitor
