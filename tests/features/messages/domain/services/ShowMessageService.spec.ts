import 'reflect-metadata';
import FakeMessagesRepository from '../../infra/repositories/FakeMessagesRepository';
import ShowMessageService from '../../../../../src/features/messages/domain/services/ShowMessageService';
import RedisCache from '../../../../../src/core/infra/repositories/CacheRepository';
import AppError from '../../../../../src/core/domain/errors/AppError';
import { v4 as uuidv4 } from 'uuid';

let fakeMessagesRepository: FakeMessagesRepository;
let showMessageService: ShowMessageService;
let redisCache: RedisCache;

describe('ShowMessageService', () => {
  beforeEach(() => {
    fakeMessagesRepository = new FakeMessagesRepository();
    redisCache = new RedisCache();

    showMessageService = new ShowMessageService(
      fakeMessagesRepository,
      redisCache,
    );
  });

  it('Deve listar uma mensagem pelo id', async () => {
    const message = await fakeMessagesRepository.create({
      user_id: uuidv4(),
      description: 'Teste',
      details: 'Teste',
    });

    const id = message.id;

    const messageId = await showMessageService.execute({ id });

    expect(messageId).toEqual(message);
  });

  it('Não pode retornar uma mensagem que não existe', () => {
    const id = uuidv4();

    expect(showMessageService.execute({ id })).rejects.toBeInstanceOf(AppError);
  });
});
