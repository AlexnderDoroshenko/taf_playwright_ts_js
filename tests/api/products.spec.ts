import { test, expect } from '@playwright/test';
import { config } from '../utils/config';
import { ProductDTO, ProductImage } from '../../types/product';

test.describe('Product API Endpoints', () => {
  
  test('Retrieve all products', async ({ request }) => {
    const response = await request.get(`${config.API_URL}/products`);
    expect(response.status()).toBe(200);
    const products = await response.json();
    expect(Array.isArray(products)).toBe(true);
  });

  test('Create a new product', async ({ request }) => {
    const newProductImage: ProductImage = {
      url: 'http://example.com/image.jpg' // example image URL
    };
    const newProduct: ProductDTO = {
      name: 'Test Product',
      price: '99.99', // decimal as string
      description: 'This is a test product',
      categories: [1, 2], // example category IDs
      brand: 'Test Brand',
      types: ['Type1', 'Type2'], // optional
      audiences: ['Audience1'], // optional
      images: [newProductImage], // optional
      discount: '10.00', // optional decimal as string
      stock: 100, // optional stock quantity
      stars: '4.5' // optional rating as decimal in string format
    };

    const response = await request.post(`${config.API_URL}/products`, {
      data: newProduct,
    });

    expect(response.status()).toBe(201);
    const createdProduct = await response.json();
    // expect(createdProduct).toMatchObject(Serializable<ProductDTO>);
    expect(createdProduct.id).toBeDefined();
  });

  test('Update an existing product', async ({ request }) => {
    const updatedProduct = {
      name: 'Updated Product',
      price: 150,
      description: 'This is an updated test product',
    };

    const response = await request.put(`${config.API_URL}/products/1`, {
      data: updatedProduct,
    });

    expect(response.status()).toBe(200);
    const product = await response.json();
    expect(product).toMatchObject(updatedProduct);
  });

});