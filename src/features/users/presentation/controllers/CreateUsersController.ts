import { Request, Response } from 'express';
import CreateUserService from '@features/users/domain/services/CreateUserService';
import { container } from 'tsyringe';
import { IController } from '@core/presentation/contracts/IController';

export default class CreateUsersController implements IController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(user);
  }
}
