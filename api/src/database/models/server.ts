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
}

class Server extends Model<ServerAttributes, ServerInput> implements ServerAttributes{
    public id!: number
    public name!: string
    public address!: string
    public is_enabled!: boolean
    public configuration_id!: ForeignKey<Configuration['id']>
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getConfiguration!: HasOneGetAssociationMixin<Configuration>
    public getServices!: HasManyGetAssociationsMixin<Service>

    public static associations: {
        services: Association<Server, Service>
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

export default Server;
