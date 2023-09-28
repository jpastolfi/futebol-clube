import UserModel from '../models/UserModel';
import { IUser, IUserModel } from '../Interfaces/IUser';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import Token from '../utils/Token';

export default class UserService {
  constructor(private userModel: IUserModel = new UserModel()) {}

  public async findByEmail(
    email: IUser['email'],
    password: IUser['password'],
  ): Promise<ServiceResponse<{ token: string }>> {
    const response = await this.userModel.findByEmail(email, password);
    if (response === null) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' },
      };
    }
    const { role } = response;
    const token = Token.sign({ role });
    return { status: 'SUCCESSFUL', data: { token } };
  }
}
