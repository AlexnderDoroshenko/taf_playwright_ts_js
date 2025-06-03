import { test, expect } from '@playwright/test';

test.describe('Authentication API Endpoints', () => {
  
  test('User can register', async ({ request }) => {
    const response = await request.post('/api/register', {
      data: {
        username: 'testuser',
        password: 'testpassword',
      },
    });
    
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('token');
  });

  test('User can login', async ({ request }) => {
    const response = await request.post('/api/login', {
      data: {
        username: 'testuser',
        password: 'testpassword',
      },
    });
    
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('token');
  });

  test('Login fails with incorrect credentials', async ({ request }) => {
    const response = await request.post('/api/login', {
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