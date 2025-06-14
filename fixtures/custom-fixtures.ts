import {test as base, expect} from '@playwright/test';
import {config as testConfig} from '../config';

type AuthFixtures = {
    config: typeof testConfig;
    authToken: string;
    login: (email: string, password: string) => Promise<void>;
};

export const test = base.extend<AuthFixtures>({
    config: async ({}, use) => {
        await use(testConfig);
    },
    authToken: async ({config}, use) => {
        // Setup: Obtain an authentication token
        const response = await fetch(`${config.API_URL}/api/users/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: config.USER_EMAIL, password: config.USER_PASSWORD}),
        });
        const data = await response.json();
        config.ACCESS_TOKEN = data.access;
        config.REFRESH_TOKEN = data.refresh;
        await use(data.access);
    },

    // login: async ({authToken, config}, use) => {
    //     const login = async (email: string, password: string) => {
    //         const response = await fetch(`${config.API_URL}/auth/login`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${authToken}`,
    //             },
    //             body: JSON.stringify({email, password}),
    //         });
    //         expect(response.ok).toBeTruthy();
    //     };
    //     await use(login);
    // },
});

export { expect } from '@playwright/test';
