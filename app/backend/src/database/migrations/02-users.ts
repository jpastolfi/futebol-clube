import { Model, QueryInterface, DataTypes } from "sequelize";
import { IUser } from "../../Interfaces/IUser";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    return queryInterface.createTable<Model<IUser>>('users', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    })
  },

  down: async (queryInterface: QueryInterface) => {
    return queryInterface.dropTable('users');
  }
};
