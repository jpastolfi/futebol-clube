import { Model, QueryInterface, DataTypes } from "sequelize";
import { IMatch } from "../../Interfaces/IMatch";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    return queryInterface.createTable<Model<IMatch>>('matches', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      homeTeamId: {
        type: DataTypes.INTEGER,
        field: 'home_team_id',
      },
      homeTeamGoals: {
        type: DataTypes.INTEGER,
        field: 'home_team_goals',
      },
      awayTeamId: {
        type: DataTypes.INTEGER,
        field: 'away_team_id',
      },
      awayTeamGoals: {
        type: DataTypes.INTEGER,
        field: 'away_team_goals',
      },
      inProgress: {
        type: DataTypes.BOOLEAN,
        field: 'in_progress',
      }
    })
  },

  down: async (queryInterface: QueryInterface) => {
    return queryInterface.dropTable('matches');
  }
};