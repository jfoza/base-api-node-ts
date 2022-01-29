import { IUserSession } from '@features/users/domain/models/IUserSession';

export interface IUserAuthenticated {
  user: IUserSession;
  token: string;
}
