import MatchModel from '../models/MatchModel';
import { IMatch, IMatchModel } from '../Interfaces/IMatch';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchService {
  constructor(private matchModel: IMatchModel = new MatchModel()) {}

  public async findAll(inProgress: string): Promise<ServiceResponse<IMatch[]>> {
    const response = await this.matchModel.findAll(inProgress);
    return { status: 'SUCCESSFUL', data: response };
  }

  public async finishMatch(id: number): Promise<ServiceResponse<{ message: string }>> {
    await this.matchModel.finishMatch(id);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatch(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<void> {
    await this.matchModel.updateMatch(id, homeTeamGoals, awayTeamGoals);
  }

  public async insertMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ServiceResponse<Partial<IMatch>>> {
    const response = await this.matchModel.insertMatch(
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    );
    return { status: 'CREATED', data: response };
  }
}
