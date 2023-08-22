'use strict';

import {DataTypes, Model} from "sequelize";

export default class ServiceCheck extends Model {
  static init(sequelize:any): any {
    return super.init({
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      ip_address: DataTypes.STRING,
      port: DataTypes.STRING,
      is_enabled: DataTypes.BOOLEAN,
      configuration_object: DataTypes.TEXT
    }, {
      sequelize,
      modelName: 'serviceCheck',
    });
  }

  static associate(models: Model[]) {
    // define association here
  }
}
