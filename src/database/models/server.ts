'use strict';

import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from "../config";

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
export interface ServerOutput extends Required<ServerAttributes> {}

class Server extends Model<ServerAttributes, ServerInput> implements ServerAttributes{
    public id!: number
    public name!: string
    public address!: string
    public is_enabled!: boolean
    public configuration_id!: number
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

  associate(models: Model[]) {
    // @ts-ignore: Unreachable code error
    Server.belongsTo(models.Configuration, {
        foreignKey: 'configuration_id',
        as: 'configuration',
        onDelete: 'CASCADE'
    })
    // @ts-ignore: Unreachable code error
    Server.hasMany(models.Service, {
        foreignKey: 'server_id',
        as: 'services',
        onDelete: 'CASCADE'
    })
  }
}

Server.init({
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
    configuration_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    }
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
});

export default Server;
