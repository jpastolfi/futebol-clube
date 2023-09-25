'use strict';

import { Model, QueryInterface, DataTypes } from "sequelize";
import { ITeam } from "../../Interfaces/ITeam";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    return queryInterface.createTable<Model<ITeam>>('teams', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      teamName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'team_name'
      },
    })
  },

  down: async (queryInterface: QueryInterface) => {
    return queryInterface.dropTable('teams');
  }
};
