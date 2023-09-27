import * as bcrypt from 'bcryptjs';
import SequelizeUsers from '../database/models/SequelizeUsers';
import { IUser, IUserModel } from '../Interfaces/IUser';

export default class UserModel implements IUserModel {
  private userModelSequelize = SequelizeUsers;

  async findByEmail(
    emailToSearch: IUser['email'],
    passwordToCheck: IUser['password'],
  ): Promise<IUser | null> {
    const response = await this.userModelSequelize.findOne({
      where: { email: emailToSearch },
    });
    if (response === null) return null;
    const { id, username, role, email, password } :IUser = response;
    const isPasswordValid = bcrypt.compareSync(passwordToCheck, password);
    if (!isPasswordValid) return null;
    return {
      id,
      username,
      role,
      email,
      password,
    };
  }
}
