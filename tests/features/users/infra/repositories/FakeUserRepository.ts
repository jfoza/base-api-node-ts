import { ICreateUser } from '../../../../../src/features/users/domain/models/ICreateUser';
import { IUserRepository } from '../../../../../src/features/users/domain/repositories/IUserRepository';
import User from '../../../../../src/features/users/infra/entities/User';
import { IUser } from '../../../../../src/features/users/domain/models/IUser';
import { v4 as uuidv4 } from 'uuid';

class FakeUsersRepository implements IUserRepository {
  private users: User[] = [];

  public async findAll(): Promise<IUser[] | undefined> {
    return this.users;
  }

  public async create({ name, email, password }: ICreateUser): Promise<IUser> {
    const user = new User();

    user.id = uuidv4();
    user.name = name;
    user.email = email;
    user.password = password;

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<IUser> {
    const findIndex = this.users.findIndex(findUser => (findUser.id = user.id));

    this.users[findIndex] = user;

    return user;
  }

  public async findById(id: string): Promise<IUser | undefined> {
    const user = this.users.find(user => (user.id = id));

    return user;
  }

  public async findByEmail(email: string): Promise<IUser | undefined> {
    const user = this.users.find(user => (user.email = email));

    return user;
  }
}

export default FakeUsersRepository;
