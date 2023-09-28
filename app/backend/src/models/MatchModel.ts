import SequelizeTeams from '../database/models/SequelizeTeams';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { IMatch, IMatchModel } from '../Interfaces/IMatch';

export default class MatchModel implements IMatchModel {
  private matchModelSequelize = SequelizeMatches;

  async findAll(inProgress: string): Promise<IMatch[]> {
    const query = {
      where: {},
      include: [
        {
          model: SequelizeTeams,
          as: 'homeTeam',
          attributes: ['teamName'],
        }, {
          model: SequelizeTeams,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    };
    if (inProgress === 'true') query.where = { inProgress: true };
    if (inProgress === 'false') query.where = { inProgress: false };
    const response = await this.matchModelSequelize.findAll(query);
    return response;
  }

  async finishMatch(id: number): Promise<void> {
    await this.matchModelSequelize.update(
      { inProgress: false },
      { where: { id } },
    );
  }

  async updateMatch(
    id:number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<void> {
    await this.matchModelSequelize.update(
      {
        homeTeamGoals,
        awayTeamGoals,
      },
      { where: { id } },
    );
  }
}
