import TeamModel from '../models/TeamModel';
import MatchModel from '../models/MatchModel';
import { ITeam, ITeamModel } from '../Interfaces/ITeam';
import { IMatch, IMatchModel } from '../Interfaces/IMatch';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ILeaderboard } from '../Interfaces/ILeaderboard';
import leaderboardHandler, { PossibleOutcomes } from '../utils/leaderboardHandler';

export default class LeaderboardService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
    private teamModel: ITeamModel = new TeamModel(),
  ) {}

  private static returnOneMatchResult(id: ITeam['id'], match: IMatch): ILeaderboard {
    const filledData = leaderboardHandler.leaderboardKeys();
    let points = 0;
    let result: PossibleOutcomes;
    if (match.homeTeamId === id) {
      [points, result] = leaderboardHandler
        .returnMatchPoints(match.homeTeamGoals, match.awayTeamGoals);
      filledData.goalsFavor = match.homeTeamGoals;
      filledData.goalsOwn = match.awayTeamGoals;
    } else {
      [points, result] = leaderboardHandler
        .returnMatchPoints(match.awayTeamGoals, match.homeTeamGoals);
      filledData.goalsFavor = match.awayTeamGoals;
      filledData.goalsOwn = match.homeTeamGoals;
    }
    filledData.totalPoints += points;
    filledData[result] += 1;
    filledData.totalGames += 1;
    return filledData;
  }

  private static returnRankResult(rankTable: ILeaderboard[]): ILeaderboard {
    const rank = rankTable.reduce((acc, currentMatch) => {
      acc.totalVictories += currentMatch.totalVictories;
      acc.totalLosses += currentMatch.totalLosses;
      acc.totalDraws += currentMatch.totalDraws;
      acc.totalGames += currentMatch.totalGames;
      acc.goalsOwn += currentMatch.goalsOwn;
      acc.goalsFavor += currentMatch.goalsFavor;
      acc.totalPoints += currentMatch.totalPoints;
      return acc;
    }, leaderboardHandler.leaderboardKeys());

    return {
      ...rankTable[0],
      ...rank,
      goalsBalance: rank.goalsFavor - rank.goalsOwn,
      efficiency: leaderboardHandler.returnEfficiency(rank.totalPoints, rank.totalGames),
    };
  }

  async returnLeaderboard(): Promise<ServiceResponse<ILeaderboard[]>> {
    const getAllTeams = await this.teamModel.findAll();

    const results = getAllTeams.map(async (team) => {
      const homeTeamMatches = await this.matchModel.findMatchesByHomeTeam(team.id);
      const leaderboard: ILeaderboard[] = [];

      homeTeamMatches.forEach((match) => {
        const homeMatch = LeaderboardService.returnOneMatchResult(team.id, match);
        leaderboard.push(homeMatch);
      });

      const rank = LeaderboardService.returnRankResult(leaderboard);
      rank.name = team.teamName;

      return rank;
    });

    const finalLeaderboard = await Promise.all(results);
    const sortedFinal = leaderboardHandler.sortLeaderboards(finalLeaderboard);

    return {
      status: 'SUCCESSFUL',
      data: sortedFinal,
    };
  }
}
