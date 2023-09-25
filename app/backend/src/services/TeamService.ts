import TeamModel from '../models/TeamModel';
import { ITeam, ITeamModel } from '../Interfaces/ITeam';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class TeamService {
  constructor(private teamModel: ITeamModel = new TeamModel()) {}

  public async findAll(): Promise<ServiceResponse<ITeam[]>> {
    const response = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: response };
  }

  public async findById(id: number): Promise<ServiceResponse<ITeam>> {
    const response = await this.teamModel.findById(id);
    return { status: 'SUCCESSFUL', data: response };
  }
}
