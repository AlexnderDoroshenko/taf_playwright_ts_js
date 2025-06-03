# Test info

- Name: Order API Endpoints >> Create an order
- Location: /Users/oleksandrdoroshenko/projects/taf_playwright_ts_js/tests/api/orders.spec.ts:6:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 201
Received: 500
    at /Users/oleksandrdoroshenko/projects/taf_playwright_ts_js/tests/api/orders.spec.ts:14:31
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 | import { config } from '../utils/config';
   3 |
   4 | test.describe('Order API Endpoints', () => {
   5 |   
   6 |   test('Create an order', async ({ request }) => {
   7 |     const response = await request.post(`${config.API_URL}/orders`, {
   8 |       data: {
   9 |         productId: 1,
  10 |         quantity: 2,
  11 |         userId: 1,
  12 |       },
  13 |     });
> 14 |     expect(response.status()).toBe(201);
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  15 |     const responseBody = await response.json();
  16 |     expect(responseBody).toHaveProperty('id');
  17 |     expect(responseBody.productId).toBe(1);
  18 |     expect(responseBody.quantity).toBe(2);
  19 |   });
  20 |
  21 |   test('Retrieve an order', async ({ request }) => {
  22 |     const orderId = 1; // Assuming an order with ID 1 exists
  23 |     const response = await request.get(`${config.API_URL}/orders/${orderId}`);
  24 |     expect(response.status()).toBe(200);
  25 |     const responseBody = await response.json();
  26 |     expect(responseBody).toHaveProperty('id', orderId);
  27 |   });
  28 |
  29 |   test('Update an order status', async ({ request }) => {
  30 |     const orderId = 1; // Assuming an order with ID 1 exists
  31 |     const response = await request.patch(`${config.API_URL}/orders/${orderId}`, {
  32 |       data: {
  33 |         status: 'shipped',
  34 |       },
  35 |     });
  36 |     expect(response.status()).toBe(200);
  37 |     const responseBody = await response.json();
  38 |     expect(responseBody).toHaveProperty('status', 'shipped');
  39 |   });
  40 |
  41 | });
```