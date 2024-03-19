'use strict';

import {
    Association,
    DataTypes,
    ForeignKey,
    HasManyGetAssociationsMixin,
    HasOneGetAssociationMixin,
    Model,
    Optional
} from 'sequelize'
import db from "../config";
import Configuration from "./configuration";
import Service from "./service";
import Monitor from "./monitor";

interface ServerAttributes {
    id: number,
    name: string,
    address: string,
    is_enabled: boolean,
    configuration_id: number,
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ServerInput extends Optional<ServerAttributes, 'id'> {}
export interface ServerOutput extends Required<ServerAttributes> {
    getConfiguration: HasOneGetAssociationMixin<Configuration>
    getServices: HasManyGetAssociationsMixin<Service>
    getMonitors: HasManyGetAssociationsMixin<Monitor>
}

class Server extends Model<ServerAttributes, ServerInput> implements ServerAttributes{
    declare id: number
    declare name: string
    declare address: string
    declare is_enabled: boolean
    declare configuration_id: ForeignKey<Configuration['id']>
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;

    declare public getConfiguration: HasOneGetAssociationMixin<Configuration>
    declare public getServices: HasManyGetAssociationsMixin<Service>
    declare public getMonitors: HasManyGetAssociationsMixin<Monitor>

    public static associations: {
        services: Association<Server, Service>,
        monitors: Association<Server, Monitor>,
    }
}

Server.init({
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
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
}, {
    timestamps: true,
    tableName: 'servers',
    sequelize: db.sequelize,
});


Server.hasMany(Service, {
    sourceKey: 'id',
    foreignKey: 'server_id',
    onDelete: 'CASCADE',
})
Service.belongsTo(Server, {
    foreignKey: 'server_id',
    as: 'server',
    onDelete: 'CASCADE'
})
Server.hasMany(Monitor, {
    sourceKey: 'id',
    foreignKey: 'server_id',
    onDelete: 'CASCADE',
})
Monitor.belongsTo(Server, {
    foreignKey: 'server_id',
    as: 'server',
    onDelete: 'CASCADE'
})

export default Server;
