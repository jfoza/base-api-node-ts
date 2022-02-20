import { IUser } from '@features/users/domain/models/IUser';

export interface IMessage {
  id: string;
  user_id: string;
  description: string;
  details: string;
  created_at: Date;
  updated_at: Date;
}
