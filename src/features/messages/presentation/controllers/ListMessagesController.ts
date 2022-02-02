import { IController } from '@core/presentation/contracts/IController';
import ListMessagesService from '@features/messages/domain/services/ListMessagesService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ListMessagesController implements IController {
  public async run(request: Request, response: Response): Promise<Response> {
    const listMessages = container.resolve(ListMessagesService);

    const messages = await listMessages.execute();

    return response.json(messages);
  }
}
