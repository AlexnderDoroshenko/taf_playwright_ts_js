# Test info

- Name: Checkout Flow >> should complete the checkout process successfully
- Location: /Users/oleksandrdoroshenko/projects/taf_playwright_ts_js/tests/ui/checkout.spec.ts:4:9

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
    at /Users/oleksandrdoroshenko/projects/taf_playwright_ts_js/tests/ui/checkout.spec.ts:10:27
```

# Page snapshot

```yaml
- heading "404" [level=1]
- heading "This page could not be found." [level=2]
- alert
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test.describe('Checkout Flow', () => {
   4 |     test('should complete the checkout process successfully', async ({ page }) => {
   5 |         // Navigate to the cart page
   6 |         await page.goto('/cart');
   7 |
   8 |         // Ensure the cart has items
   9 |         const cartItems = await page.locator('.cart-item').count();
> 10 |         expect(cartItems).toBeGreaterThan(0);
     |                           ^ Error: expect(received).toBeGreaterThan(expected)
  11 |
  12 |         // Proceed to checkout
  13 |         await page.click('text=Checkout');
  14 |
  15 |         // Fill in shipping information
  16 |         await page.fill('#shipping-address', '123 Main St');
  17 |         await page.fill('#shipping-city', 'Anytown');
  18 |         await page.fill('#shipping-zip', '12345');
  19 |
  20 |         // Select payment method
  21 |         await page.selectOption('#payment-method', 'credit-card');
  22 |
  23 |         // Fill in payment details
  24 |         await page.fill('#card-number', '4111111111111111');
  25 |         await page.fill('#card-expiry', '12/25');
  26 |         await page.fill('#card-cvc', '123');
  27 |
  28 |         // Submit the order
  29 |         await page.click('text=Place Order');
  30 |
  31 |         // Verify order confirmation
  32 |         const confirmationMessage = await page.locator('.confirmation-message').innerText();
  33 |         expect(confirmationMessage).toContain('Thank you for your order');
  34 |     });
  35 |
  36 |     test('should show error for empty shipping address', async ({ page }) => {
  37 |         // Navigate to the cart page
  38 |         await page.goto('/cart');
  39 |
  40 |         // Proceed to checkout
  41 |         await page.click('text=Checkout');
  42 |
  43 |         // Leave shipping address empty
  44 |         await page.fill('#shipping-city', 'Anytown');
  45 |         await page.fill('#shipping-zip', '12345');
  46 |
  47 |         // Submit the order
  48 |         await page.click('text=Place Order');
  49 |
  50 |         // Verify error message
  51 |         const errorMessage = await page.locator('.error-message').innerText();
  52 |         expect(errorMessage).toContain('Shipping address is required');
  53 |     });
  54 | });
```