import { IController } from '@core/presentation/contracts/IController';
import DeleteMessageService from '@features/messages/domain/services/DeleteMessageService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class DeleteMessagesController implements IController {
  public async run(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteMessage = container.resolve(DeleteMessageService);

    await deleteMessage.execute({ id });

    return response.json([]);
  }
}
