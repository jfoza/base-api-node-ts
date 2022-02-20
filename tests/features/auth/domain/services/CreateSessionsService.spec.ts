import 'reflect-metadata';
import FakeUsersRepository from '../../../users/infra/repositories/FakeUserRepository';
import FakeHashProvider from '../../../users/domain/providers/FakeHashProvider';
import AppError from '../../../../../src/core/domain/errors/AppError';
import CreateSessionsService from '../../../../../src/features/auth/domain/services/CreateSessionsService';

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

  it('Não deve autenticar quando o usuário fornece uma senha errada', async () => {
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
