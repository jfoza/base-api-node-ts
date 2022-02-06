import AppError from '@core/domain/errors/AppError';
import { IUserRepository } from '../repositories/IUserRepository';
import { ICreateUser } from '../models/ICreateUser';
import { IUser } from '../models/IUser';
import { inject, injectable } from 'tsyringe';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, email, password }: ICreateUser): Promise<IUser> {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('E-mail already exists!', 400);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
