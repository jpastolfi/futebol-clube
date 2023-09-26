import {
  DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional,
} from 'sequelize';

import db from '.';

export default class SequelizeTeams extends
  Model<InferAttributes<SequelizeTeams>, InferCreationAttributes<SequelizeTeams>> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

SequelizeTeams.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
  underscored: true,
});
