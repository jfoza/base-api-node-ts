import { Connection, QueryRunner } from 'typeorm';
import connect from './src/core/infra/database';

let connection: Connection;
beforeAll(async () => {
  connection = await connect();

  const queryRunner: QueryRunner = connection.createQueryRunner();

  await queryRunner.query('TRUNCATE users, messages');
});

afterAll(async () => {
  // process.env.NODE_ENV = 'app';

  await connection.close();
});
