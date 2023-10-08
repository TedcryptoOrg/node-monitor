'use strict';

import {DataTypes, HasOneGetAssociationMixin, Model, Optional} from 'sequelize'
import sequelizeConnection from "../config";
import Server from "./server";

interface ServiceAttributes {
    id: number,
    name: string,
    address: string,
    is_enabled: boolean,
    server_id: number,
}

export interface ServiceInput extends Optional<ServiceAttributes, 'id'> {}
export interface ServiceOutput extends Required<ServiceAttributes> {
    getServer: HasOneGetAssociationMixin<Server>
}

class Service extends Model<ServiceAttributes, ServiceInput> implements ServiceAttributes {
    public id!: number
    public name!: string
    public address!: string
    public is_enabled!: boolean
    public server_id!: number

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
    sequelize: sequelizeConnection,
    tableName: 'services',
    timestamps: true,
})

export default Service
