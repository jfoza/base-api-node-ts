import 'reflect-metadata';
import FakeUsersRepository from '@features/users/domain/repositories/fakes/FakeUserRepository';
import CreateUserService from '../CreateUserService';
import FakeHashProvider from '../../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@core/domain/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateMessage', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('Deve cadastrar um novo usuário', async () => {
    const user = await createUser.execute({
      name: 'Giuseppe Foza',
      email: 'gfozza@hotmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('Não deve criar dois usuários com o mesmo e-mail', async () => {
    const user = await createUser.execute({
      name: 'Giuseppe Foza',
      email: 'gfozza@hotmail.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'Giuseppe Foza',
        email: 'gfozza@hotmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);

    expect(user).toHaveProperty('id');
  });
});
