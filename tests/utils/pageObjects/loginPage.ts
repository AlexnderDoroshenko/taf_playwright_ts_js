import { Page, Locator } from '@playwright/test';
// import { config } from '../utils/config';
// Please ensure the config module exists at the correct path, e.g. '../../config' or update the path accordingly.
// Example (uncomment and adjust if needed):
import { config } from '../config';

class LoginPage {
    page: Page;
    usernameInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;
    errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.locator('button[type="submit"]');
        this.errorMessage = page.locator('.error-message');
    }

    async goto() {
        await this.page.goto(config.BASE_URL + '/login');
    }

    async fillUsername(username) {
        await this.usernameInput.fill(username);
    }

    async fillPassword(password) {
        await this.passwordInput.fill(password);
    }

    async submit() {
        await this.loginButton.click();
    }

    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }

    async login(username, password) {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.submit();
    }
}

export default LoginPage;