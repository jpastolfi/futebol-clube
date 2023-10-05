import { IMatch } from '../Interfaces/IMatch';
import { ILeaderboard } from '../Interfaces/ILeaderboard';

export type PossibleOutcomes = 'totalVictories' | 'totalLosses' | 'totalDraws';

export default class leaderboardHandler {
  static leaderboardKeys(): ILeaderboard {
    return {
      name: '',
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    };
  }

  static sortLeaderboards(leaderboard: ILeaderboard[]): ILeaderboard[] {
    return leaderboard
    // Quarto critério: gols a favor
      .sort((first, second) => second.goalsFavor - first.goalsFavor)
    // Terceiro critério: saldo de gols
      .sort((first, second) => {
        if (first.goalsBalance && second.goalsBalance) {
          return second.goalsBalance - first.goalsBalance;
        }
        return 1;
      })
      // Segundo critério: número de vitórias
      .sort((first, second) => second.totalVictories - first.totalVictories)
      // Primeiro critério: número de pontos
      .sort((first, second) => second.totalPoints - first.totalPoints);
  }

  static returnEfficiency(
    totalPoints: ILeaderboard['totalPoints'],
    totalGames: ILeaderboard['totalGames'],
  ): number {
    return ((totalPoints / (totalGames * 3)) * 100);
  }

  static returnMatchPoints(
    homeTeamGoals: IMatch['homeTeamGoals'],
    awayTeamGoals: IMatch['awayTeamGoals'],
  ): [number, PossibleOutcomes] {
    const goalsDiff = homeTeamGoals - awayTeamGoals;
    if (goalsDiff < 0) return [0, 'totalLosses'];
    if (goalsDiff > 0) return [3, 'totalVictories'];
    return [1, 'totalDraws'];
  }
}
