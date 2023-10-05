export interface IMatch {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IMatchReturn extends IMatch {
  homeTeam: { teamName: string },
  awayTeam: { teamName: string },
}

export interface IMatchModel {
  findAll(inProgress: string): Promise<IMatch[]>;
  finishMatch(id: number): void;
  updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number): void;
  insertMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<IMatch>;
  findMatchesByHomeTeam(id: number): Promise<IMatch[]>
}
