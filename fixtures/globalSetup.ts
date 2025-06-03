import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  globalSetup: './fixtures/globalSetup.ts',
  // Add other configurations as needed
};

export default config;