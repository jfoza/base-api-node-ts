import RedisCache from '@core/infra/repositories/CacheRepository';
import { inject, injectable } from 'tsyringe';
import { IMessage } from '../../domain/models/IMessage';
import { IMessagesRepository } from '../../domain/repositories/IMessagesRepository';

@injectable()
class ListMessagesService {
  constructor(
    @inject('MessagesRepository')
    private messagesRepository: IMessagesRepository,
    private redisCache: RedisCache,
  ) {}

  public async execute(): Promise<IMessage[]> {
    let messages = await this.redisCache.recover<IMessage[]>(
      'api-messages-MESSAGES-LIST',
    );

    if (!messages) {
      messages = await this.messagesRepository.findAll();

      await this.redisCache.save('api-messages-MESSAGES-LIST', messages);
    }

    return messages;
  }
}

export default ListMessagesService;
