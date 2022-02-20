import config from './jest.config';

const config2: any = {
  ...config,
  testMatch: ['**/*.test.ts'],
};

export default config2;
