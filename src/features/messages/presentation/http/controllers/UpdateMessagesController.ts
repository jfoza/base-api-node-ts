import { IController } from "@core/presentation/contracts/IController";
import UpdateMessageService from "@features/messages/presentation/services/UpdateMessageService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class UpdateMessagesController implements IController {
  public async run(request: Request, response: Response): Promise<Response> {
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
}
