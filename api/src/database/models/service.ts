'use strict';

import {DataTypes, HasOneGetAssociationMixin, Model, Optional} from 'sequelize'
import db from "../config";
import Server from "./server";

export const SERVICE_TYPES: {RPC: string, REST: string, PROMETHEUS: string, NODE_EXPORTER: string} = {
    RPC: 'rpc',
    REST: 'rest',
    PROMETHEUS: 'prometheus',
    NODE_EXPORTER: 'node_exporter',
}

interface ServiceAttributes {
    id: number,
    name: string,
    address: string,
    is_enabled: boolean,
    type: string,
    server_id: number,
}

export interface ServiceInput extends Optional<ServiceAttributes, 'id'> {}
export interface ServiceOutput extends Required<ServiceAttributes> {
    getServer: HasOneGetAssociationMixin<Server>
}

class Service extends Model<ServiceAttributes, ServiceInput> implements ServiceAttributes {
    declare id: number
    declare name: string
    declare address: string
    declare is_enabled: boolean
    declare type: string
    declare server_id: number

    public getServer!: HasOneGetAssociationMixin<Server>
}

Service.init({
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
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    server_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
}, {
    sequelize: db.sequelize,
    tableName: 'services',
    timestamps: true,
})

export default Service
