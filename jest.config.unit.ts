import config from './jest.config';

const config2: any = {
  ...config,
  testMatch: ['**/*.spec.ts'],
};

export default config2;
