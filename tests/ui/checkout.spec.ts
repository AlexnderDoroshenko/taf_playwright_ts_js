import { test, expect } from '@playwright/test';

test.describe('Checkout Flow', () => {
    test('should complete the checkout process successfully', async ({ page }) => {
        // Navigate to the cart page
        await page.goto('/cart');

        // Ensure the cart has items
        const cartItems = await page.locator('.cart-item').count();
        expect(cartItems).toBeGreaterThan(0);

        // Proceed to checkout
        await page.click('text=Checkout');

        // Fill in shipping information
        await page.fill('#shipping-address', '123 Main St');
        await page.fill('#shipping-city', 'Anytown');
        await page.fill('#shipping-zip', '12345');

        // Select payment method
        await page.selectOption('#payment-method', 'credit-card');

        // Fill in payment details
        await page.fill('#card-number', '4111111111111111');
        await page.fill('#card-expiry', '12/25');
        await page.fill('#card-cvc', '123');

        // Submit the order
        await page.click('text=Place Order');

        // Verify order confirmation
        const confirmationMessage = await page.locator('.confirmation-message').innerText();
        expect(confirmationMessage).toContain('Thank you for your order');
    });

    test('should show error for empty shipping address', async ({ page }) => {
        // Navigate to the cart page
        await page.goto('/cart');

        // Proceed to checkout
        await page.click('text=Checkout');

        // Leave shipping address empty
        await page.fill('#shipping-city', 'Anytown');
        await page.fill('#shipping-zip', '12345');

        // Submit the order
        await page.click('text=Place Order');

        // Verify error message
        const errorMessage = await page.locator('.error-message').innerText();
        expect(errorMessage).toContain('Shipping address is required');
    });
});