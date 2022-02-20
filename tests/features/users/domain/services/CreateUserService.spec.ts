import 'reflect-metadata';
import FakeUsersRepository from '../../../users/infra/repositories/FakeUserRepository';
import CreateUserService from '../../../../../src/features/users/domain/services/CreateUserService';
import FakeHashProvider from '../providers/FakeHashProvider';
import AppError from '../../../../../src/core/domain/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUserService', () => {
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
    await createUser.execute({
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
  });
});
