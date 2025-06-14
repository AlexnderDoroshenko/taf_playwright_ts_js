import { test, expect } from '@playwright/test';
import { config } from '../../config';

test.describe('Order API Endpoints', () => {
  
  test('Create an order', async ({ request }) => {
    const response = await request.post(`${config.API_URL}/orders`, {
      data: {
        productId: 1,
        quantity: 2,
        userId: 1,
      },
    });
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id');
    expect(responseBody.productId).toBe(1);
    expect(responseBody.quantity).toBe(2);
  });

  test('Retrieve an order', async ({ request }) => {
    const orderId = 1; // Assuming an order with ID 1 exists
    const response = await request.get(`${config.API_URL}/orders/${orderId}`);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id', orderId);
  });

  test('Update an order status', async ({ request }) => {
    const orderId = 1; // Assuming an order with ID 1 exists
    const response = await request.patch(`${config.API_URL}/orders/${orderId}`, {
      data: {
        status: 'shipped',
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('status', 'shipped');
  });

});