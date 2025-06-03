# Test info

- Name: Authentication API Endpoints >> User can login
- Location: /Users/oleksandrdoroshenko/projects/taf_playwright_ts_js/tests/api/auth.spec.ts:18:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 405
    at /Users/oleksandrdoroshenko/projects/taf_playwright_ts_js/tests/api/auth.spec.ts:26:31
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test.describe('Authentication API Endpoints', () => {
   4 |   
   5 |   test('User can register', async ({ request }) => {
   6 |     const response = await request.post('/api/register', {
   7 |       data: {
   8 |         username: 'testuser',
   9 |         password: 'testpassword',
  10 |       },
  11 |     });
  12 |     
  13 |     expect(response.status()).toBe(201);
  14 |     const responseBody = await response.json();
  15 |     expect(responseBody).toHaveProperty('token');
  16 |   });
  17 |
  18 |   test('User can login', async ({ request }) => {
  19 |     const response = await request.post('/api/login', {
  20 |       data: {
  21 |         username: 'testuser',
  22 |         password: 'testpassword',
  23 |       },
  24 |     });
  25 |     
> 26 |     expect(response.status()).toBe(200);
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  27 |     const responseBody = await response.json();
  28 |     expect(responseBody).toHaveProperty('token');
  29 |   });
  30 |
  31 |   test('Login fails with incorrect credentials', async ({ request }) => {
  32 |     const response = await request.post('/api/login', {
  33 |       data: {
  34 |         username: 'wronguser',
  35 |         password: 'wrongpassword',
  36 |       },
  37 |     });
  38 |     
  39 |     expect(response.status()).toBe(401);
  40 |     const responseBody = await response.json();
  41 |     expect(responseBody).toHaveProperty('error', 'Invalid credentials');
  42 |   });
  43 |
  44 | });
```