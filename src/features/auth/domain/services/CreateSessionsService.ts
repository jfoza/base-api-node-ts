import authConfig from '@config/auth';
import AppError from '@core/domain/errors/AppError';
import { sign, Secret } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';
import { IUserRepository } from '@features/users/domain/repositories/IUserRepository';
import { ICreateSessions } from '../../domain/models/ICreateSessions';
import { IUserAuthenticated } from '../../domain/models/IUserAuthenticated';
import { IHashProvider } from '@features/users/domain/providers/HashProvider/models/IHashProvider';

@injectable()
class CreateSessionsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    password,
  }: ICreateSessions): Promise<IUserAuthenticated> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordConfirmed = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = sign({}, authConfig.jwt.secret as Secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}

export default CreateSessionsService;
