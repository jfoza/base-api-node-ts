import { ICreateMessages } from "@modules/messages/domain/models/ICreateMessages";
import { IMessagesRepository } from "@modules/messages/domain/repositories/IMessagesRepository";
import { getRepository, Repository } from "typeorm";
import Message from "../entities/Message";

class MessagesRepository implements IMessagesRepository {
  private ormRepository: Repository<Message>;

  constructor() {
    this.ormRepository = getRepository(Message);
  }

  public async findAll(): Promise<Message[]> {
    const messages = await this.ormRepository.find();

    return messages;
  }

  public async findById(id: string): Promise<Message | undefined> {
    const message = this.ormRepository.findOne(id);

    return message;
  }

  public async create({
    description,
    details,
  }: ICreateMessages): Promise<Message> {
    const message = this.ormRepository.create({
      description,
      details,
    });

    await this.ormRepository.save(message);

    return message;
  }

  public async save(message: Message): Promise<Message> {
    await this.ormRepository.save(message);

    return message;
  }

  public async remove(message: Message): Promise<void> {
    await this.ormRepository.remove(message);
  }
}

export default MessagesRepository;
