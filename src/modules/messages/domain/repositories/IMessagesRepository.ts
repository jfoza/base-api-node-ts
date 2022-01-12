import { ICreateMessages } from "../models/ICreateMessages";
import { IMessage } from "../models/IMessage";

export interface IMessagesRepository {
  findAll(): Promise<IMessage[]>;
  findById(id: string): Promise<IMessage | undefined>;
  create(data: ICreateMessages): Promise<IMessage>;
  save(message: IMessage): Promise<IMessage>;
  remove(message: IMessage): Promise<void>;
}
