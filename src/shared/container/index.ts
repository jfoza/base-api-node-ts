import { container } from "tsyringe";
import { IUserRepository } from "@modules/users/domain/repositories/IUserRepository";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";
import { IMessagesRepository } from "@modules/messages/domain/repositories/IMessagesRepository";
import MessagesRepository from "@modules/messages/infra/typeorm/repositories/MessagesRepository";

container.registerSingleton<IUserRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IMessagesRepository>(
  "MessagesRepository",
  MessagesRepository
);
