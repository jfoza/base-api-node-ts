import { injectable, inject } from "tsyringe";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import User from "../infra/typeorm/entities/User";

@injectable()
class ListUsersService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUserRepository
  ) {}

  public async execute(): Promise<User[] | undefined> {
    const customers = await this.usersRepository.findAll();

    return customers;
  }
}

export default ListUsersService;
