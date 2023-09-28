import MatchModel from '../models/MatchModel';
import { IMatch, IMatchModel } from '../Interfaces/IMatch';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchService {
  constructor(private matchModel: IMatchModel = new MatchModel()) {}

  public async findAll(inProgress: string): Promise<ServiceResponse<IMatch[]>> {
    const response = await this.matchModel.findAll(inProgress);
    return { status: 'SUCCESSFUL', data: response };
  }
}
