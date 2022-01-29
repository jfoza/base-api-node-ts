import { injectable, inject } from 'tsyringe';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { IUser } from '@features/users/domain/models/IUser';

@injectable()
class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute(): Promise<IUser[] | undefined> {
    const users = await this.usersRepository.findAll();

    return users;
  }
}

export default ListUsersService;
