import * as jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel';
import { IUser, IUserModel } from '../Interfaces/IUser';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class UserService {
  constructor(private userModel: IUserModel = new UserModel()) {}

  public async findByEmail(
    email: IUser['email'],
    password: IUser['password'],
  ): Promise<ServiceResponse<{ token: string }>> {
    const response = await this.userModel.findByEmail(email, password);
    if (response === 'deu ruim') {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' },
      };
    }
    const token = jwt.sign({
      email,
      password,
    }, process.env.JWT_SECRET || 'jwt_secret', {
      expiresIn: '7d',
    });
    return { status: 'SUCCESSFUL', data: { token } };
  }
}
