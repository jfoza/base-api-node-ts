import { ICreateMessages } from '@features/messages/domain/models/ICreateMessages';
import { IMessagesRepository } from '@features/messages/domain/repositories/IMessagesRepository';
import { getRepository, Repository } from 'typeorm';
import Message from '../entities/Message';
import { IMessage } from '@features/messages/domain/models/IMessage';

class MessagesRepository implements IMessagesRepository {
  private ormRepository: Repository<Message>;

  constructor() {
    this.ormRepository = getRepository(Message);
  }

  public async findAll(): Promise<IMessage[]> {
    const messages = await this.ormRepository.find({ relations: ['user'] });

    return messages;
  }

  public async findById(id: string): Promise<IMessage | undefined> {
    const message = this.ormRepository.findOne(id);

    return message;
  }

  public async create({
    user_id,
    description,
    details,
  }: ICreateMessages): Promise<IMessage> {
    const message = this.ormRepository.create({
      user_id,
      description,
      details,
    });

    await this.ormRepository.save(message);

    return message;
  }

  public async save(message: Message): Promise<IMessage> {
    await this.ormRepository.save(message);

    return message;
  }

  public async remove(message: Message): Promise<void> {
    await this.ormRepository.remove(message);
  }
}

export default MessagesRepository;
