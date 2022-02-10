import 'reflect-metadata';
import FakeMessagesRepository from '../../infra/repositories/FakeMessagesRepository';
import DeleteMessageService from '../../../../../src/features/messages/domain/services/DeleteMessageService';
import RedisCache from '../../../../../src/core/infra/repositories/CacheRepository';
import AppError from '../../../../../src/core/domain/errors/AppError';
import { v4 as uuidv4 } from 'uuid';

let fakeMessagesRepository: FakeMessagesRepository;
let deleteMessageService: DeleteMessageService;
let redisCache: RedisCache;

describe('DeleteMessageService', () => {
  beforeEach(() => {
    fakeMessagesRepository = new FakeMessagesRepository();
    redisCache = new RedisCache();

    deleteMessageService = new DeleteMessageService(
      fakeMessagesRepository,
      redisCache,
    );
  });

  it('Deve excluir uma mensagem existente', async () => {
    const message = await fakeMessagesRepository.create({
      user_id: uuidv4(),
      description: 'Teste',
      details: 'Teste',
    });

    await deleteMessageService.execute({
      id: message.id,
    });

    expect([]);
  });

  it('Não pode excluir uma mensagem que não existe', () => {
    expect(
      deleteMessageService.execute({
        id: uuidv4(), // id que não existe
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
