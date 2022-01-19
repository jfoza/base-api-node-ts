import AppError from "@core/domain/errors/AppError";
import { injectable, inject } from "tsyringe";
import { IdeleteMessage } from "../domain/models/IDeleteMessage";
import { IMessagesRepository } from "../domain/repositories/IMessagesRepository";

@injectable()
class DeleteMessageService {
  constructor(
    @inject("MessagesRepository")
    private messagesRepository: IMessagesRepository
  ) {}

  public async execute({ id }: IdeleteMessage): Promise<void> {
    const message = await this.messagesRepository.findById(id);

    if (!message) {
      throw new AppError("Message not found.");
    }

    await this.messagesRepository.remove(message);
  }
}

export default DeleteMessageService;
