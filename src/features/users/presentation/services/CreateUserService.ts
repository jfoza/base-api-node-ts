import { hash } from 'bcryptjs';
import AppError from '@core/domain/errors/AppError';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { ICreateUser } from '../../domain/models/ICreateUser';
import { IUser } from '../../domain/models/IUser';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({ name, email, password }: ICreateUser): Promise<IUser> {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('E-mail already exists!', 400);
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
