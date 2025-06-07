import { Page, Locator } from '@playwright/test';

export class CatalogPage {
    readonly page: Page;
    
    // Base URL
    private readonly baseURL = 'https://team-challange-front.vercel.app/catalog';
    
    // Common selectors
    private readonly catalogContainer: Locator;
    private readonly productCards: Locator;
    private readonly searchInput: Locator;
    private readonly filterSection: Locator;
    private readonly sortingDropdown: Locator;
    private readonly paginationControls: Locator;
    
    constructor(page: Page) {
        this.page = page;
        
        // Initialize locators
        this.catalogContainer = page.locator('.catalog-container');
        this.productCards = page.locator('.product-card');
        this.searchInput = page.locator('input[type="search"]');
        this.filterSection = page.locator('.filter-section');
        this.sortingDropdown = page.locator('select[aria-label="Sort products"]');
        this.paginationControls = page.locator('.pagination');
    }
    
    // Navigation methods
    async goto() {
        await this.page.goto(this.baseURL);
    }
    
    // Search functionality
    async searchProducts(searchTerm: string) {
        await this.searchInput.fill(searchTerm);
        await this.searchInput.press('Enter');
    }
    
    // Filter methods
    async applyFilter(filterName: string, filterValue: string) {
        const filterOption = this.filterSection.locator(`[data-filter="${filterName}"]`);
        await filterOption.click();
    }
    
    // Sorting methods
    async sortProducts(sortOption: string) {
        await this.sortingDropdown.selectOption(sortOption);
    }
    
    // Product interaction methods
    async clickProductCard(productIndex: number) {
        await this.productCards.nth(productIndex).click();
    }
    
    async getProductTitle(productIndex: number): Promise<string> {
        return await this.productCards.nth(productIndex).locator('.product-title').textContent() || '';
    }
    
    async getProductPrice(productIndex: number): Promise<string> {
        return await this.productCards.nth(productIndex).locator('.product-price').textContent() || '';
    }
    
    // Pagination methods
    async goToNextPage() {
        await this.paginationControls.locator('button:has-text("Next")').click();
    }
    
    async goToPreviousPage() {
        await this.paginationControls.locator('button:has-text("Previous")').click();
    }
    
    async goToPage(pageNumber: number) {
        await this.paginationControls.locator(`button:has-text("${pageNumber}")`).click();
    }
    
    // Helper methods
    async getProductCount(): Promise<number> {
        return await this.productCards.count();
    }
    
    async isLoading(): Promise<boolean> {
        return await this.page.locator('.loading-indicator').isVisible();
    }
    
    async waitForProductsLoad() {
        await this.productCards.first().waitFor({ state: 'visible' });
    }
}