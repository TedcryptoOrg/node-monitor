'use strict';

import {DataTypes, Model, Optional} from 'sequelize'
import db from "../config";

interface AuditAttributes {
    id: number,
    configuration_id: number|null,
    monitor_id: number|null,
    server_id: number|null,
    message: string,
    created_at: Date,
}

export interface AuditInput extends Optional<AuditAttributes, 'id'> {}
export interface AuditOutput extends Required<AuditAttributes> {}

export class Audit extends Model<AuditAttributes, AuditInput> implements AuditAttributes {
    declare id: number
    declare configuration_id: number|null
    declare monitor_id: number|null
    declare server_id: number|null
    declare message: string
    declare created_at: Date
}

Audit.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    configuration_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    },
    monitor_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    },
    server_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize: db.sequelize,
    tableName: 'audit',
    timestamps: false,
});
