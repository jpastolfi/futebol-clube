import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(private matchService = new MatchService()) {}

  public async findAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    const serviceResponse = await this.matchService.findAll(inProgress as string);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async finishMatch(req: Request, res: Response) {
    const id = Number(req.params.id);
    const serviceResponse = await this.matchService.finishMatch(id);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async updateMatch(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.matchService.updateMatch(id, homeTeamGoals, awayTeamGoals);
    return res.status(200).json({
      message: `Match ${id}'s score has been altered to ${homeTeamGoals}x${awayTeamGoals}` });
  }

  public async insertMatch(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const serviceResponse = await this
      .matchService.insertMatch(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
