import SequelizeTeams from '../database/models/SequelizeTeams';
import { ITeam, ITeamModel } from '../Interfaces/ITeam';

export default class TeamModel implements ITeamModel {
  private teamModelSequelize = SequelizeTeams;

  async findAll(): Promise<ITeam[]> {
    const response = await this.teamModelSequelize.findAll();
    return response;
  }

  async findById(id: number): Promise<ITeam> {
    const response = await this.teamModelSequelize.findByPk(id);
    if (!response) throw new Error('Time não encontrado');
    return {
      id: response.id,
      teamName: response.teamName,
    };
  }
}
