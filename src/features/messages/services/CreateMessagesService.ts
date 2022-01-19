import { injectable, inject } from "tsyringe";
import { ICreateMessages } from "../domain/models/ICreateMessages";
import { IMessage } from "../domain/models/IMessage";
import { IMessagesRepository } from "../domain/repositories/IMessagesRepository";

@injectable()
class CreateMessagesService {
  constructor(
    @inject("MessagesRepository")
    private messagesRepository: IMessagesRepository
  ) {}

  public async execute({
    description,
    details,
  }: ICreateMessages): Promise<IMessage> {
    const message = await this.messagesRepository.create({
      description,
      details,
    });

    return message;
  }
}

export default CreateMessagesService;
