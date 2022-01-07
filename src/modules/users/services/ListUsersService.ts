import { injectable, inject } from 'tsyringe';
import { getCustomRepository } from 'typeorm';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import User from '../infra/typeorm/entities/User';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';

@injectable()
class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute(): Promise<User[] | undefined> {
    const customers = await this.usersRepository.findAll();

    return customers;
  }
}


export default ListUsersService;