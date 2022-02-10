import 'reflect-metadata';
import RedisCache from '../../../../../src/core/infra/repositories/CacheRepository';
import FakeMessagesRepository from '../../infra/repositories/FakeMessagesRepository';
import UpdateMessageService from '../../../../../src/features/messages/domain/services/UpdateMessageService';
import AppError from '../../../../../src/core/domain/errors/AppError';
import { v4 as uuidv4 } from 'uuid';

let fakeMessagesRepository: FakeMessagesRepository;
let redisCache: RedisCache;
let updateMessageService: UpdateMessageService;

describe('UpdateMessageservice', () => {
  beforeEach(() => {
    fakeMessagesRepository = new FakeMessagesRepository();
    redisCache = new RedisCache();

    updateMessageService = new UpdateMessageService(
      fakeMessagesRepository,
      redisCache,
    );
  });

  it('Deve atualizar uma mensagem já existente', async () => {
    const message = await fakeMessagesRepository.create({
      user_id: uuidv4(),
      description: 'Teste',
      details: 'Teste',
    });

    const messageUpdated = await updateMessageService.execute({
      id: message.id,
      description: 'Teste 2',
      details: 'Teste 2',
    });

    expect(messageUpdated).toHaveProperty('id');
  });

  it('Não pode atualizar uma mensagem que não existe', () => {
    expect(
      updateMessageService.execute({
        id: uuidv4(), // id que não existe
        description: 'Teste 5',
        details: 'Teste 5',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
