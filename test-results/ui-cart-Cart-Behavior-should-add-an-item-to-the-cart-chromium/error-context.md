# Test info

- Name: Cart Behavior >> should add an item to the cart
- Location: /Users/oleksandrdoroshenko/projects/taf_playwright_ts_js/tests/ui/cart.spec.ts:4:9

# Error details

```
Error: page.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('text=Add to Cart')

    at /Users/oleksandrdoroshenko/projects/taf_playwright_ts_js/tests/ui/cart.spec.ts:6:20
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test.describe('Cart Behavior', () => {
   4 |     test('should add an item to the cart', async ({ page }) => {
   5 |         await page.goto('/products');
>  6 |         await page.click('text=Add to Cart'); // Adjust selector as needed
     |                    ^ Error: page.click: Target page, context or browser has been closed
   7 |         const cartCount = await page.locator('.cart-count').innerText(); // Adjust selector as needed
   8 |         expect(cartCount).toBe('1');
   9 |     });
  10 |
  11 |     test('should remove an item from the cart', async ({ page }) => {
  12 |         await page.goto('/cart');
  13 |         await page.click('text=Remove'); // Adjust selector as needed
  14 |         const cartCount = await page.locator('.cart-count').innerText(); // Adjust selector as needed
  15 |         expect(cartCount).toBe('0');
  16 |     });
  17 |
  18 |     test('should update item quantity in the cart', async ({ page }) => {
  19 |         await page.goto('/cart');
  20 |         await page.fill('input[name="quantity"]', '2'); // Adjust selector as needed
  21 |         await page.click('text=Update'); // Adjust selector as needed
  22 |         const itemQuantity = await page.locator('input[name="quantity"]').inputValue(); // Adjust selector as needed
  23 |         expect(itemQuantity).toBe('2');
  24 |     });
  25 | });
```