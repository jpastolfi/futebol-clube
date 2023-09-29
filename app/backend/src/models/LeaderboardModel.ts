import SequelizeTeams from '../database/models/SequelizeTeams';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { ILeaderboardModel } from '../Interfaces/ILeaderboard';

export default class LeaderboardModel implements ILeaderboardModel {
  private matchModelSequelize = SequelizeMatches;

  public async rankTeams() {
    const response = await this.matchModelSequelize.findAll({ where: { inProgress: false },
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
      ] });
    return response;
  }
}
