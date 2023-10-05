import { IMatchReturn } from './IMatch';

export interface ILeaderboardModel {
  rankTeams(): {
    allTeamsNames: { name: string }[];
    allMatches: IMatchReturn[];
  }
}

export interface ILeaderboard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
}
