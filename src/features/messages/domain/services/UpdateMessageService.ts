import AppError from '@core/domain/errors/AppError';
import RedisCache from '@core/infra/repositories/CacheRepository';
import { injectable, inject } from 'tsyringe';
import { IMessage } from '../models/IMessage';
import { IUpdateMessage } from '../models/IUpdateMessage';
import { IMessagesRepository } from '../repositories/IMessagesRepository';

@injectable()
class UpdateMessageService {
  constructor(
    @inject('MessagesRepository')
    private messagesRepository: IMessagesRepository,
    private redisCache: RedisCache,
  ) {}

  public async execute({
    id,
    description,
    details,
  }: IUpdateMessage): Promise<IMessage> {
    const message = await this.messagesRepository.findById(id);

    if (!message) {
      throw new AppError('Message not found.');
    }

    await this.redisCache.invalidate('api-messages-MESSAGES-LIST');
    await this.redisCache.invalidate('api-messages-MESSAGE-ID');

    message.description = description;
    message.details = details;

    await this.messagesRepository.save(message);

    return message;
  }
}

export default UpdateMessageService;
