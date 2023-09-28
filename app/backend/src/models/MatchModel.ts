import SequelizeTeams from '../database/models/SequelizeTeams';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { IMatch, IMatchModel } from '../Interfaces/IMatch';

export default class MatchModel implements IMatchModel {
  private matchModelSequelize = SequelizeMatches;

  async findAll(): Promise<IMatch[]> {
    const response = await this.matchModelSequelize.findAll({
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
    });
    return response;
  }
}
