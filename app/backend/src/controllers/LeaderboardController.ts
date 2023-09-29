import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  public async rankTeams(req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.rankTeams();
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
