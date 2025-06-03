# Test info

- Name: Product API Endpoints >> Retrieve all products
- Location: /Users/oleksandrdoroshenko/projects/taf_playwright_ts_js/tests/api/products.spec.ts:7:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 401
    at /Users/oleksandrdoroshenko/projects/taf_playwright_ts_js/tests/api/products.spec.ts:9:31
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 | import { config } from '../utils/config';
   3 | import { ProductDTO, ProductImage } from '../../types/product';
   4 |
   5 | test.describe('Product API Endpoints', () => {
   6 |   
   7 |   test('Retrieve all products', async ({ request }) => {
   8 |     const response = await request.get(`${config.API_URL}/products`);
>  9 |     expect(response.status()).toBe(200);
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  10 |     const products = await response.json();
  11 |     expect(Array.isArray(products)).toBe(true);
  12 |   });
  13 |
  14 |   test('Create a new product', async ({ request }) => {
  15 |     const newProductImage: ProductImage = {
  16 |       url: 'http://example.com/image.jpg' // example image URL
  17 |     };
  18 |     const newProduct: ProductDTO = {
  19 |       name: 'Test Product',
  20 |       price: '99.99', // decimal as string
  21 |       description: 'This is a test product',
  22 |       categories: [1, 2], // example category IDs
  23 |       brand: 'Test Brand',
  24 |       types: ['Type1', 'Type2'], // optional
  25 |       audiences: ['Audience1'], // optional
  26 |       images: [newProductImage], // optional
  27 |       discount: '10.00', // optional decimal as string
  28 |       stock: 100, // optional stock quantity
  29 |       stars: '4.5' // optional rating as decimal in string format
  30 |     };
  31 |
  32 |     const response = await request.post(`${config.API_URL}/products`, {
  33 |       data: newProduct,
  34 |     });
  35 |
  36 |     expect(response.status()).toBe(201);
  37 |     const createdProduct = await response.json();
  38 |     // expect(createdProduct).toMatchObject(Serializable<ProductDTO>);
  39 |     expect(createdProduct.id).toBeDefined();
  40 |   });
  41 |
  42 |   test('Update an existing product', async ({ request }) => {
  43 |     const updatedProduct = {
  44 |       name: 'Updated Product',
  45 |       price: 150,
  46 |       description: 'This is an updated test product',
  47 |     };
  48 |
  49 |     const response = await request.put(`${config.API_URL}/products/1`, {
  50 |       data: updatedProduct,
  51 |     });
  52 |
  53 |     expect(response.status()).toBe(200);
  54 |     const product = await response.json();
  55 |     expect(product).toMatchObject(updatedProduct);
  56 |   });
  57 |
  58 | });
```