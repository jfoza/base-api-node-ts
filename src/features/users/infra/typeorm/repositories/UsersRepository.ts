import { ICreateUser } from '@features/users/domain/models/ICreateUser';
import { IUserRepository } from '@features/users/domain/repositories/IUserRepository';
import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';
import { IUser } from '@features/users/domain/models/IUser';

class UsersRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findAll(): Promise<IUser[] | undefined> {
    const users = await this.ormRepository.find({ relations: ['messages'] });

    return users;
  }

  public async create({ name, email, password }: ICreateUser): Promise<IUser> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<IUser> {
    await this.ormRepository.save(user);

    return user;
  }

  public async findById(id: string): Promise<IUser | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<IUser | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }
}

export default UsersRepository;
