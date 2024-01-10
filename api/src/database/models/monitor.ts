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
import Server from "./server";

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
    server_id: number|null,
    configuration_object: string,
    last_check?: string|null,
    status?: boolean,
    last_error?: string|null,
}

export interface MonitorInput extends Optional<MonitorAttributes, 'id'> {}
export interface MonitorOutput extends Required<MonitorAttributes> {
    getConfiguration: HasOneGetAssociationMixin<Configuration>
}

class Monitor extends Model<MonitorAttributes, MonitorInput> implements MonitorAttributes {
    declare id: number
    declare name: string
    declare type: string
    declare is_enabled: boolean
    declare configuration_id: ForeignKey<Configuration['id']>
    declare server_id: ForeignKey<Server['id']>|null
    declare configuration_object: string
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
    declare last_check: string
    declare status: boolean
    declare last_error: string|null

    public getConfiguration!: HasOneGetAssociationMixin<Configuration>
    public getServer!: HasOneGetAssociationMixin<Server|null>
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
    server_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
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
    },
    last_check: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    last_error: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: true,
    tableName: 'monitors',
    sequelize: db.sequelize,
});

export default Monitor
