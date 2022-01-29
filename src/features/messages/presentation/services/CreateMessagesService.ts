import RedisCache from '@core/infra/repositories/CacheRepository';
import { injectable, inject } from 'tsyringe';
import { ICreateMessages } from '../../domain/models/ICreateMessages';
import { IMessage } from '../../domain/models/IMessage';
import { IMessagesRepository } from '../../domain/repositories/IMessagesRepository';

@injectable()
class CreateMessagesService {
  constructor(
    @inject('MessagesRepository')
    private messagesRepository: IMessagesRepository,
    private redisCache: RedisCache,
  ) {}

  public async execute({
    description,
    details,
  }: ICreateMessages): Promise<IMessage> {
    await this.redisCache.invalidate('api-messages-MESSAGES-LIST');
    await this.redisCache.invalidate('api-messages-MESSAGE-ID');

    const message = await this.messagesRepository.create({
      description,
      details,
    });

    return message;
  }
}

export default CreateMessagesService;
