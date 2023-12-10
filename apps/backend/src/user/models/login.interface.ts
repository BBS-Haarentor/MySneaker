import { IUser } from './user.interface';

export interface ILogin {
  user: IUser,
  access_token: string,
  token_type: string,
  expires_in: number
}