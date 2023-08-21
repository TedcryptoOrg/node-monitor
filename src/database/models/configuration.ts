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

  static associate(models: Model[]) {
    // define association here
  }
}
