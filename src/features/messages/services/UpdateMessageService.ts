import AppError from "@core/domain/errors/AppError";
import { injectable, inject } from "tsyringe";
import { IMessage } from "../domain/models/IMessage";
import { IUpdateMessage } from "../domain/models/IUpdateMessage";
import { IMessagesRepository } from "../domain/repositories/IMessagesRepository";

@injectable()
class UpdateMessageService {
  constructor(
    @inject("MessagesRepository")
    private messagesRepository: IMessagesRepository
  ) {}

  public async execute({
    id,
    description,
    details,
  }: IUpdateMessage): Promise<IMessage> {
    const message = await this.messagesRepository.findById(id);

    if (!message) {
      throw new AppError("Message not found.");
    }

    message.description = description;
    message.details = details;

    await this.messagesRepository.save(message);

    return message;
  }
}

export default UpdateMessageService;
