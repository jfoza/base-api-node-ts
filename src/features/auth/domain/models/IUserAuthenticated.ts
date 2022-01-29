import { IUser } from '@features/users/domain/models/IUser';

export interface IUserAuthenticated {
  user: IUser;
  token: string;
}
