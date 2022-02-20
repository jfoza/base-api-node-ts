import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { IController } from '../../../../core/presentation/contracts/IController';
import ShowMessageService from '../../domain/services/ShowMessageService';

export default class ShowMessageController implements IController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showMessage = container.resolve(ShowMessageService);

    const message = await showMessage.execute({ id });

    return response.json(message);
  }
}
