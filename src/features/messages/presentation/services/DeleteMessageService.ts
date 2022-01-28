import AppError from "@core/domain/errors/AppError";
import RedisCache from "@core/infra/repositories/CacheRepository";
import { injectable, inject } from "tsyringe";
import { IdeleteMessage } from "../../domain/models/IDeleteMessage";
import { IMessagesRepository } from "../../domain/repositories/IMessagesRepository";

@injectable()
class DeleteMessageService {
  constructor(
    @inject("MessagesRepository")
    private messagesRepository: IMessagesRepository,
    private redisCache: RedisCache
  ) {}

  public async execute({ id }: IdeleteMessage): Promise<void> {
    const message = await this.messagesRepository.findById(id);

    if (!message) {
      throw new AppError("Message not found.");
    }

    await this.redisCache.invalidate("api-messages-MESSAGES-LIST");
    await this.redisCache.invalidate("api-messages-MESSAGE-ID");

    await this.messagesRepository.remove(message);
  }
}

export default DeleteMessageService;
