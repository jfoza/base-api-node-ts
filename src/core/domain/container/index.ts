import { container } from "tsyringe";
import { IUserRepository } from "@features/users/domain/repositories/IUserRepository";
import UsersRepository from "@features/users/infra/typeorm/repositories/UsersRepository";
import { IMessagesRepository } from "@features/messages/domain/repositories/IMessagesRepository";
import MessagesRepository from "@features/messages/infra/typeorm/repositories/MessagesRepository";

container.registerSingleton<IUserRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IMessagesRepository>(
  "MessagesRepository",
  MessagesRepository
);
