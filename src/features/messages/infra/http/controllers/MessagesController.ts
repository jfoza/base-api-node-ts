import CreateMessagesService from "@features/messages/services/CreateMessagesService";
import DeleteMessageService from "@features/messages/services/DeleteMessageService";
import ListMessagesService from "@features/messages/services/ListMessagesService";
import UpdateMessageService from "@features/messages/services/UpdateMessageService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class MessagesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listMessages = container.resolve(ListMessagesService);

    const messages = await listMessages.execute();

    return response.json(messages);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { description, details } = request.body;

    const createMessages = container.resolve(CreateMessagesService);

    const message = await createMessages.execute({
      description,
      details,
    });

    return response.json(message);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { description, details } = request.body;
    const { id } = request.params;

    const updateMessage = container.resolve(UpdateMessageService);

    const message = await updateMessage.execute({
      id,
      description,
      details,
    });

    return response.json(message);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteMessage = container.resolve(DeleteMessageService);

    await deleteMessage.execute({ id });

    return response.json([]);
  }
}
