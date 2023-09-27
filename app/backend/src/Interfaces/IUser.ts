import { ILogin } from './ILogin';

export interface IUser extends ILogin {
  id: number;
  username: string;
  role: string;
}

export interface IUserModel {
  findByEmail(
    emailToSearch: IUser['email'],
    passwordToCheck: IUser['password'],
  ): Promise<IUser | null>
}
