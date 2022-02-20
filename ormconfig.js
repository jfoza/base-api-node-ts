require('dotenv/config');

let NODE_ENV = process.env.NODE_ENV;

let DB_HOST = process.env.DB_HOST;
let DB_TYPE = process.env.DB_TYPE;
let DB_PORT = process.env.DB_PORT;
let DB_PASSWORD = process.env.DB_PASSWORD;

let DB_DATABASE = process.env.DB_DATABASE_APP;
let DB_USERNAME = process.env.DB_USERNAME;

let ENTITIES = process.env.ENTITIES;
let MIGRATIONS = process.env.MIGRATIONS;
let MIGRATIONS_DIR = process.env.MIGRATIONS_DIR;

if (NODE_ENV == 'test') {
  DB_DATABASE = process.env.DB_DATABASE_TEST;
}

module.exports = {
  type: DB_TYPE,
  // url: DB_URL,

  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,

  entities: [ENTITIES],
  migrations: [MIGRATIONS],
  cli: {
    migrationsDir: MIGRATIONS_DIR,
  },
  extra: {
    // ssl: {
    //   rejectUnauthorized: false,
    // },
  },
  synchronize: false,
};
