import RedisCache from "@core/infra/repositories/CacheRepository";
import { IMessage } from "@features/messages/domain/models/IMessage";
import { IShowMessage } from "@features/messages/domain/models/IShowMessage";
import { IMessagesRepository } from "@features/messages/domain/repositories/IMessagesRepository";
import AppError from "src/core/domain/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class ShowMessageService {
  constructor(
    @inject("MessagesRepository")
    private messagesRepository: IMessagesRepository,
    private redisCache: RedisCache
  ) {}

  public async execute({ id }: IShowMessage): Promise<IMessage> {
    let message = await this.redisCache.recover<IMessage>(
      "api-messages-MESSAGE-ID"
    );

    if (!message) {
      message = (await this.messagesRepository.findById(id)) || null;

      await this.redisCache.save("api-messages-MESSAGE-ID", message);
    }

    if (!message) {
      throw new AppError("Registro não encontrado", 404);
    }

    return message;
  }
}

export default ShowMessageService;
