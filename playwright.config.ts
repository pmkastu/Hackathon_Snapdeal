/// <reference types="node" />
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 900000,
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 2,
  workers: 1 ,
  reporter: [['html'],['allure-playwright']],
  use: {
    headless : true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },

  projects: [
    
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

  ],

});
