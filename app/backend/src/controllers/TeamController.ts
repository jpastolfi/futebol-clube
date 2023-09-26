import { Request, Response } from 'express';
import TeamService from '../services/TeamService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamController {
  constructor(private teamService = new TeamService()) {}

  public async findAll(req: Request, res: Response) {
    const serviceResponse = await this.teamService.findAll();
    return res.status(200).json(serviceResponse.data);
  }

  public async findById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const serviceResponse = await this.teamService.findById(id);
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    return res.status(200).json(serviceResponse.data);
  }
}
