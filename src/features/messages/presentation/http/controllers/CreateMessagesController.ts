import { IController } from "@core/presentation/contracts/IController";
import CreateMessagesService from "@features/messages/presentation/services/CreateMessagesService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class CreateMessagesController implements IController {
  public async run(request: Request, response: Response): Promise<Response> {
    const { description, details } = request.body;

    const createMessages = container.resolve(CreateMessagesService);

    const message = await createMessages.execute({
      description,
      details,
    });

    return response.json(message);
  }
}
