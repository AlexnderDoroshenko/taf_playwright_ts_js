import { test, expect } from '@playwright/test';

test.describe('Cart Behavior', () => {
    test('should add an item to the cart', async ({ page }) => {
        await page.goto('/products');
        await page.click('text=Add to Cart'); // Adjust selector as needed
        const cartCount = await page.locator('.cart-count').innerText(); // Adjust selector as needed
        expect(cartCount).toBe('1');
    });

    test('should remove an item from the cart', async ({ page }) => {
        await page.goto('/cart');
        await page.click('text=Remove'); // Adjust selector as needed
        const cartCount = await page.locator('.cart-count').innerText(); // Adjust selector as needed
        expect(cartCount).toBe('0');
    });

    test('should update item quantity in the cart', async ({ page }) => {
        await page.goto('/cart');
        await page.fill('input[name="quantity"]', '2'); // Adjust selector as needed
        await page.click('text=Update'); // Adjust selector as needed
        const itemQuantity = await page.locator('input[name="quantity"]').inputValue(); // Adjust selector as needed
        expect(itemQuantity).toBe('2');
    });
});