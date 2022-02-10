import 'reflect-metadata';
import FakeUsersRepository from '../../../users/infra/repositories/FakeUserRepository';
import ListUsersService from '../../../../../src/features/users/domain/services/ListUsersService';

let fakeUsersRepository: FakeUsersRepository;
let listUsersService: ListUsersService;

describe('ListUsersService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listUsersService = new ListUsersService(fakeUsersRepository);
  });

  it('Deve listar os usuários cadastrados', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Giuseppe Foza',
      email: 'gfozza@hotmail.com',
      password: '123456',
    });

    const users = await listUsersService.execute();

    expect(users).toEqual([user]);
  });
});
