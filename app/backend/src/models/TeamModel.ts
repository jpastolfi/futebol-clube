import SequelizeTeams from '../database/models/SequelizeTeams';
import { ITeam, ITeamModel } from '../Interfaces/ITeam';

export default class TeamModel implements ITeamModel {
  private teamModelSequelize = SequelizeTeams;

  async findAll(): Promise<ITeam[]> {
    const response = await this.teamModelSequelize.findAll();
    return response;
  }

  async findById(teamId: ITeam['id']): Promise<ITeam | null> {
    const response = await this.teamModelSequelize.findByPk(teamId);
    if (response === null) return null;
    const { id, teamName }: ITeam = response;
    return {
      id,
      teamName,
    };
  }
}
