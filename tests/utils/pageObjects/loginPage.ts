import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';
import { config } from '../config';

export const LoginPageSelectors = {
    EMAIL_INPUT: 'input[type="email"]',
    PASSWORD_INPUT: 'input[type="password"]',
    LOGIN_BUTTON: 'button[type="submit"]',
    FORGOT_PASSWORD_LINK: 'text=Forgot Password?',
    SIGN_UP_LINK: 'text=Sign Up',
    REMEMBER_ME_CHECKBOX: 'input[type="checkbox"][name="remember"]',
    PASSWORD_TOGGLE: '.password-toggle',
    EMAIL_ERROR: '[data-testid="email-error"]',
    PASSWORD_ERROR: '[data-testid="password-error"]',
    GENERAL_ERROR: '.error-message',
    GOOGLE_LOGIN_BUTTON: 'button:has-text("Continue with Google")',
    FACEBOOK_LOGIN_BUTTON: 'button:has-text("Continue with Facebook")'
} as const;

export class LoginPage extends BasePage {
    private emailInput: Locator;
    private passwordInput: Locator;
    // ... other properties

    page: Page;
    usernameInput: Locator;
    loginButton: Locator;
    errorMessage: Locator;
    forgotPasswordLink: Locator;
    rememberMeCheckbox: Locator;
    signUpLink: Locator;
    passwordVisibilityToggle: Locator;

    constructor(page: Page) {
        super(page);
        this.emailInput = page.locator(LoginPageSelectors.EMAIL_INPUT);
        this.passwordInput = page.locator(LoginPageSelectors.PASSWORD_INPUT);
        // ... initialize other locators
        this.usernameInput = page.locator('input[name="username"]');
        this.loginButton = page.locator('button[type="submit"]');
        this.errorMessage = page.locator('.error-message');
        this.forgotPasswordLink = page.locator('a:text("Forgot Password?")');
        this.rememberMeCheckbox = page.locator('input[type="checkbox"][name="remember"]');
        this.signUpLink = page.locator('a:text("Sign Up")');
        this.passwordVisibilityToggle = page.locator('.password-toggle');
    }
    // ... rest of the class implementation

    async goto() {
        await this.page.goto(config.BASE_URL + '/login');
    }

    async fillUsername(username: string) {
        await this.usernameInput.fill(username);
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async submit() {
        await this.loginButton.click();
    }

    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }

    async login(username: string, password: string) {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.submit();
    }

    // New methods
    async isLoginButtonEnabled(): Promise<boolean> {
        return await this.loginButton.isEnabled();
    }

    async clearForm() {
        await this.usernameInput.clear();
        await this.passwordInput.clear();
    }

    async toggleRememberMe() {
        await this.rememberMeCheckbox.click();
    }

    async isRememberMeChecked(): Promise<boolean> {
        return await this.rememberMeCheckbox.isChecked();
    }

    async navigateToForgotPassword() {
        await this.forgotPasswordLink.click();
    }

    async navigateToSignUp() {
        await this.signUpLink.click();
    }

    async togglePasswordVisibility() {
        await this.passwordVisibilityToggle.click();
    }

    async isPasswordVisible(): Promise<boolean> {
        const inputType = await this.passwordInput.getAttribute('type');
        return inputType === 'text';
    }

    async getFieldValidationError(field: 'username' | 'password'): Promise<string | null> {
        const errorLocator = this.page.locator(`[data-testid="${field}-error"]`);
        return await errorLocator.textContent();
    }

    async waitForLoginComplete(): Promise<void> {
        // Wait for navigation or success indicator
        await this.page.waitForURL(/\/dashboard/);
    }

    async isLoginPageDisplayed(): Promise<boolean> {
        return await this.loginButton.isVisible();
    }

    async getUsernameValue(): Promise<string> {
        return await this.usernameInput.inputValue();
    }

    async getPasswordValue(): Promise<string> {
        return await this.passwordInput.inputValue();
    }
}

export default LoginPage;