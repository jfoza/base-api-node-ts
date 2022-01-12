import { inject, injectable } from "tsyringe";
import { IMessage } from "../domain/models/IMessage";
import { IMessagesRepository } from "../domain/repositories/IMessagesRepository";

@injectable()
class ListMessagesService {
  constructor(
    @inject("MessagesRepository")
    private messagesRepository: IMessagesRepository
  ) {}

  public async execute(): Promise<IMessage[]> {
    const messages = await this.messagesRepository.findAll();

    return messages;
  }
}

export default ListMessagesService;
