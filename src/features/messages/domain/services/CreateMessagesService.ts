import AppError from '@core/domain/errors/AppError';
import RedisCache from '@core/infra/repositories/CacheRepository';
import { IUserRepository } from '@features/users/domain/repositories/IUserRepository';
import { injectable, inject } from 'tsyringe';
import { ICreateMessages } from '../models/ICreateMessages';
import { IMessage } from '../models/IMessage';
import { IMessagesRepository } from '../repositories/IMessagesRepository';

@injectable()
class CreateMessagesService {
  constructor(
    @inject('MessagesRepository')
    private messagesRepository: IMessagesRepository,

    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    private redisCache: RedisCache,
  ) {}

  public async execute({
    user_id,
    description,
    details,
  }: ICreateMessages): Promise<IMessage> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    await this.redisCache.invalidate('api-messages-MESSAGES-LIST');
    await this.redisCache.invalidate('api-messages-MESSAGE-ID');

    const message = await this.messagesRepository.create({
      user_id,
      description,
      details,
    });

    return message;
  }
}

export default CreateMessagesService;
