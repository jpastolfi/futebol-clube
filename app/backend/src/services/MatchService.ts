import MatchModel from '../models/MatchModel';
import { IMatch, IMatchModel } from '../Interfaces/IMatch';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchService {
  constructor(private matchModel: IMatchModel = new MatchModel()) {}

  public async findAll(): Promise<ServiceResponse<IMatch[]>> {
    const response = await this.matchModel.findAll();
    return { status: 'SUCCESSFUL', data: response };
  }
}
