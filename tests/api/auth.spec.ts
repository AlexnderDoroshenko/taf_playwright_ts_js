import { faker } from '@faker-js/faker';
import { test, expect } from '../../fixtures/custom-fixtures';


test.describe('Authentication API Endpoints', () => {

    test('User can register', async ({request, config}) => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();

        const response = await request.post(`${config.API_URL}/api/users/register/`, {
            data: {
                email: faker.internet.email({ firstName, lastName }),
                first_name: firstName,
                last_name: lastName,
                password: faker.internet.password({ length: 12 }),
                username: faker.internet.username({ firstName, lastName })
            },
        });

        expect(response.status()).toBe(201);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('access');
        expect(responseBody).toHaveProperty('refresh');
        expect(responseBody['refresh']).not.toEqual(responseBody['access']);
    });

    test('User can login', async ({request, config, authToken}) => {
        const response = await request.post(`${config.API_URL}/api/users/token/`, {
            headers: {
                'Authorization': authToken,
            },
            data: {
                username: config.USER_EMAIL,
                password: config.USER_PASSWORD,
            },
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('access');
        expect(responseBody).toHaveProperty('refresh');
        expect(responseBody['refresh']).not.toEqual(responseBody['access']);
    });

    test('Login fails with incorrect credentials', async ({request, config}) => {
        const response = await request.post(`${config.API_URL}/api/users/token/`, {
            data: {
                username: 'wronguser',
                password: 'wrongpassword',
            },
        });

        expect(response.status()).toBe(401);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error', 'Invalid credentials');
    });

});