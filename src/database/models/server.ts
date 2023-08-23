'use strict';

import {DataTypes, Model} from "sequelize";

export default class Server extends Model {
  static init(sequelize:any): any {
    return super.init({
      name: DataTypes.STRING,
      ip_address: DataTypes.STRING,
      is_enabled: DataTypes.BOOLEAN,
    }, {
      sequelize,
      modelName: 'server',
    });
  }

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
