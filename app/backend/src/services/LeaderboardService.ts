import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';
import LeaderboardModel from '../models/LeaderboardModel';
import { ITeamModel } from '../Interfaces/ITeam';
import { IMatch, IMatchModel } from '../Interfaces/IMatch';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ILeaderboardModel } from '../Interfaces/ILeaderboard';

export default class LeaderboardService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
    private teamModel: ITeamModel = new TeamModel(),
    private leaderboardModel: ILeaderboardModel = new LeaderboardModel(),
  ) {}

  public async rankTeams()/* : Promise<ServiceResponse<IMatch[]>> */ {
    const response = await this.leaderboardModel.rankTeams();
    return { status: 'SUCCESSFUL', data: response };
  }
}
