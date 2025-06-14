import {defineConfig, devices} from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
    testDir: './tests',
    timeout: 30000,
    expect: {
        timeout: 5000,
    },
    reporter: [['html', {outputFolder: 'playwright-report', open: 'never'}]],
    use: {
        actionTimeout: 0,
        baseURL: process.env.BASE_URL,
        trace: 'on-first-retry',
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
    },
    projects: [
        //   name: 'chromium',
        //   use: { ...devices['Desktop Chrome'] },
        // },
        // {
        //   name: 'firefox',
        //   use: { ...devices['Desktop Firefox'] },
        // },
        // {
        //   name: 'webkit',
        //   use: { ...devices['Desktop Safari'] },
        // },
        {
            name: 'api',
            use: {},
        },
    ],
});