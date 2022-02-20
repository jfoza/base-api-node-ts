import 'reflect-metadata';
import FakeMessagesRepository from '../../infra/repositories/FakeMessagesRepository';
import ListMessagesService from '../../../../../src/features/messages/domain/services/ListMessagesService';
import RedisCache from '../../../../../src/core/infra/repositories/CacheRepository';
import { v4 as uuidv4 } from 'uuid';

let fakeMessagesRepository: FakeMessagesRepository;
let listMessagesService: ListMessagesService;
let redisCache: RedisCache;

describe('ListMessagesService', () => {
  beforeEach(() => {
    fakeMessagesRepository = new FakeMessagesRepository();
    redisCache = new RedisCache();

    listMessagesService = new ListMessagesService(
      fakeMessagesRepository,
      redisCache,
    );
  });

  it('Deve listar as mensagens cadastrados', async () => {
    await fakeMessagesRepository.create({
      user_id: uuidv4(),
      description: 'Teste',
      details: 'Teste',
    });

    const messages = await listMessagesService.execute();

    expect(Array.isArray(messages)).toEqual(true);
  });
});
