import { test as base, expect } from '@playwright/test';

type AuthFixtures = {
  authToken: string;
  login: (username: string, password: string) => Promise<void>;
};

export const test = base.extend<AuthFixtures>({
  authToken: async ({}, use) => {
    // Setup: Obtain an authentication token
    const response = await fetch(`${process.env.API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: 'testuser', password: 'testpassword' }),
    });
    const data = await response.json();
    await use(data.token);
  },

  login: async ({ authToken }, use) => {
    const login = async (username: string, password: string) => {
      const response = await fetch(`${process.env.API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ username, password }),
      });
      expect(response.ok).toBeTruthy();
    };
    await use(login);
  },
});