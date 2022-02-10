import 'reflect-metadata';
import RedisCache from '../../../../../src/core/infra/repositories/CacheRepository';
import FakeMessagesRepository from '../../infra/repositories/FakeMessagesRepository';
import FakeUsersRepository from '../../../users/infra/repositories/FakeUserRepository';
import CreateMessagesService from '../../../../../src/features/messages/domain/services/CreateMessagesService';
import AppError from '../../../../../src/core/domain/errors/AppError';
import { v4 as uuidv4 } from 'uuid';

let fakeMessagesRepository: FakeMessagesRepository;
let fakeUsersRepository: FakeUsersRepository;
let redisCache: RedisCache;
let createMessages: CreateMessagesService;

describe('CreateMessage', () => {
  beforeEach(() => {
    fakeMessagesRepository = new FakeMessagesRepository();
    fakeUsersRepository = new FakeUsersRepository();
    redisCache = new RedisCache();

    createMessages = new CreateMessagesService(
      fakeMessagesRepository,
      fakeUsersRepository,
      redisCache,
    );
  });

  it('Deve cadastrar uma nova mensagem contendo um usuário válido', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Giuseppe Foza',
      email: 'gfozza@hotmail.com',
      password: '123456',
    });

    const message = await createMessages.execute({
      user_id: user.id,
      description: 'Teste',
      details: 'Teste',
    });

    expect(message).toHaveProperty('id');
  });

  it('Não pode cadastrar uma mensagem com um usuário que não existe', () => {
    expect(
      createMessages.execute({
        user_id: uuidv4(),
        description: 'Teste',
        details: 'Teste',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
