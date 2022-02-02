import { IController } from '@core/presentation/contracts/IController';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateSessionsService from '../../domain/services/CreateSessionsService';

export default class SessionsController implements IController {
  public async run(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSession = container.resolve(CreateSessionsService);

    const user = await createSession.execute({
      email,
      password,
    });

    return response.json(user);
  }
}
