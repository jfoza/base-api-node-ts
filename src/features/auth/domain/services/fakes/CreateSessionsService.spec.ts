import 'reflect-metadata';
import FakeUsersRepository from '@features/users/domain/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '@features/users/domain/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@core/domain/errors/AppError';
import CreateSessionsService from '../CreateSessionsService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createSession: CreateSessionsService;

describe('CreateSession', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createSession = new CreateSessionsService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('Deve fazer a autenticação de um usuário', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Giuseppe Foza',
      email: 'gfozza@hotmail.com',
      password: '123456',
    });

    const response = await createSession.execute({
      email: 'gfozza@hotmail.com',
      password: '123456',
    });

    const userSession = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(userSession);
  });

  it('Não deve autenticar com um usuário inexistente', async () => {
    expect(
      createSession.execute({
        email: 'gfozza@hotmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve autenticar quando um usuário fornece uma senha errada', async () => {
    await fakeUsersRepository.create({
      name: 'Giuseppe Foza',
      email: 'gfozza@hotmail.com',
      password: '123456',
    });

    expect(
      createSession.execute({
        email: 'gfozza@hotmail.com',
        password: '031682',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
