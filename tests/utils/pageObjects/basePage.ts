import { Page, Locator } from '@playwright/test';

export const BasePageSelectors = {
    HEADER: 'header',
    FOOTER: 'footer',
    LOGO: '.logo',
    LANGUAGE_SELECTOR: '.language-selector',
    LOADING_SPINNER: '.loading-spinner'
} as const;

export class BasePage {
    protected page: Page;
    protected header: Locator;
    protected footer: Locator;
    protected logo: Locator;
    protected languageSelector: Locator;
    protected loadingSpinner: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = page.locator(BasePageSelectors.HEADER);
        this.footer = page.locator(BasePageSelectors.FOOTER);
        this.logo = page.locator(BasePageSelectors.LOGO);
        this.languageSelector = page.locator(BasePageSelectors.LANGUAGE_SELECTOR);
        this.loadingSpinner = page.locator(BasePageSelectors.LOADING_SPINNER);
    }
    // ... rest of the class implementation
}