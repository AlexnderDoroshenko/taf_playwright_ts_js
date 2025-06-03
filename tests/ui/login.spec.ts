import { test, expect } from '@playwright/test';
import { LoginPage } from '../utils/pageObjects/loginPage';

test.describe('Login Flow', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await page.goto('/login');
    });

    test('should login successfully with valid credentials', async () => {
        await loginPage.fillEmail('user@example.com');
        await loginPage.fillPassword('password123');
        await loginPage.submit();

        // Verify successful login
        await expect(page).toHaveURL('/dashboard');
        await expect(page.locator('text=Welcome')).toBeVisible();
    });

    test('should show error message with invalid credentials', async () => {
        await loginPage.fillEmail('user@example.com');
        await loginPage.fillPassword('wrongpassword');
        await loginPage.submit();

        // Verify error message
        await expect(page.locator('text=Invalid credentials')).toBeVisible();
    });
});