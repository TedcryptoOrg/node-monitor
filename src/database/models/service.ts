'use strict';

import {DataTypes, Model} from "sequelize";

export default class Service extends Model {
  static init(sequelize:any): any {
    return super.init({
      name: DataTypes.STRING,
      ip_address: DataTypes.STRING,
      port: DataTypes.STRING,
      is_enabled: DataTypes.BOOLEAN,
    }, {
      sequelize,
      modelName: 'service',
    });
  }

  associate(models: Model[]) {
    // @ts-ignore: Unreachable code error
    Service.belongsTo(models.Server, {
        foreignKey: 'server_id',
        as: 'server',
        onDelete: 'CASCADE'
    })
    // @ts-ignore: Unreachable code error
    Service.hasMany(models.ServiceCheck, {
        foreignKey: 'service_id',
        as: 'serviceChecks',
        onDelete: 'CASCADE'
    })
  }
}
