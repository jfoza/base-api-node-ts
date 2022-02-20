import request from 'supertest';
import { app } from '../../../../../src/core/presentation/http/app';

describe('CreateUsersController', () => {
  it('Deve cadastrar um usuário', async () => {
    const response = await request(app).post('/users').send({
      name: 'testes integração',
      email: 'testes@testes.com.br',
      password: '12345678',
      password_confirmation: '12345678',
    });

    expect(response.status).toBe(200);
  });

  it('Não deve cadastrar dois usuários com o mesmo e-mail', async () => {
    await request(app).post('/users').send({
      name: 'testes integração',
      email: 'testes@testes.com.br',
      password: '12345678',
      password_confirmation: '12345678',
    });

    expect(
      request(app).post('/users').send({
        name: 'testes integração',
        email: 'testes@testes.com.br', // E-mail já cadastrado
        password: '12345678',
        password_confirmation: '12345678',
      }),
    ).rejects;
  });
});
