'use strict';

import {DataTypes, Model} from "sequelize";

export default class Server extends Model {
  static init(sequelize:any): any {
    return super.init({
      name: DataTypes.STRING,
      ip_address: DataTypes.STRING
    }, {
      sequelize,
      modelName: 'server',
    });
  }

  static associate(models: Model[]) {
    // define association here
  }
}
