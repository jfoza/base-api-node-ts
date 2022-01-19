require("dotenv/config");

module.exports = {
  type: process.env.DB_TYPE,
  url: process.env.DB_URL,
  // host: process.env.DB_HOST,
  // port: process.env.DB_PORT,
  // username: process.env.DB_USERNAME,
  // password: process.env.PASSWORD,
  // database: process.env.DB_DATABASE,
  entities: [process.env.ENTITIES],
  migrations: [process.env.MIGRATIONS],
  cli: {
    migrationsDir: process.env.MIGRATIONS_DIR,
  },
  synchronize: false,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
