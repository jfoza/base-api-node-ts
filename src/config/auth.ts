require('dotenv/config');

export default {
  jwt: {
    secret: 'SecretTeste', // process.env.JWT_SECRET,
    expiresIn: '1d', // process.env.JWT_EXPIRES,
  },
};
