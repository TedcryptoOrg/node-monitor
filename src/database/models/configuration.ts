'use strict';

import {DataTypes, Model} from "sequelize";

export default class Configuration extends Model {
  static init(sequelize:any): any {
    return super.init({
      name: DataTypes.STRING,
      chain: DataTypes.STRING
    }, {
      sequelize,
      modelName: 'configuration',
    });
  }

  associate(models: Model[]) {
    // @ts-ignore: Unreachable code error
    Configuration.hasMany(models.Server, {
        foreignKey: 'configuration_id',
        as: 'servers',
        onDelete: 'CASCADE'
    })
  }
}
