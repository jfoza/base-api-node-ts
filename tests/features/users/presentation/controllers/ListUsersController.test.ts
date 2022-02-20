import request from 'supertest';
import { app } from '../../../../../src/core/presentation/http/app';

describe('ListUsersController', () => {
  it('Estando autenticado, deve listar os usuários cadastrados', async () => {
    await request(app).post('/users').send({
      name: 'testes integração',
      email: 'testes@testes.com.br',
      password: '12345678',
      password_confirmation: '12345678',
    });

    const responseAuth = await request(app).post('/auth').send({
      email: 'testes@testes.com.br',
      password: '12345678',
    });

    const token = responseAuth.body.token;

    const responseList = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(responseList.status).toBe(200);
  });

  it('Não deve listar os usuários, quando não houver autenticação', async () => {
    expect(request(app).get('/users')).rejects;
  });
});
