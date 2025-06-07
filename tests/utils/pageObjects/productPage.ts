import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export const ProductPageSelectors = {
    // Product Information
    PRODUCT_TITLE: '[data-testid="product-title"]',
    PRODUCT_PRICE: '[data-testid="product-price"]',
    PRODUCT_DESCRIPTION: '[data-testid="product-description"]',
    PRODUCT_IMAGE: '[data-testid="product-image"]',
    PRODUCT_GALLERY: '[data-testid="product-gallery"]',
    
    // Product Options
    SIZE_SELECTOR: '[data-testid="size-selector"]',
    COLOR_SELECTOR: '[data-testid="color-selector"]',
    QUANTITY_INPUT: '[data-testid="quantity-input"]',
    QUANTITY_INCREMENT: '[data-testid="quantity-increment"]',
    QUANTITY_DECREMENT: '[data-testid="quantity-decrement"]',
    
    // Actions
    ADD_TO_CART_BUTTON: '[data-testid="add-to-cart-button"]',
    BUY_NOW_BUTTON: '[data-testid="buy-now-button"]',
    WISHLIST_BUTTON: '[data-testid="wishlist-button"]',
    
    // Additional Information
    AVAILABILITY_STATUS: '[data-testid="availability-status"]',
    DELIVERY_INFO: '[data-testid="delivery-info"]',
    RETURN_POLICY: '[data-testid="return-policy"]',
    
    // Reviews
    REVIEWS_SECTION: '[data-testid="reviews-section"]',
    RATING_STARS: '[data-testid="rating-stars"]',
    REVIEW_COUNT: '[data-testid="review-count"]',
    
    // Related Items
    RELATED_PRODUCTS: '[data-testid="related-products"]',
    
    // Breadcrumbs
    BREADCRUMB_NAV: '[data-testid="breadcrumb-nav"]'
} as const;

export class ProductPage extends BasePage {
    // Product Information
    private productTitle: Locator;
    private productPrice: Locator;
    private productDescription: Locator;
    private productImage: Locator;
    private productGallery: Locator;
    
    // Product Options
    private sizeSelector: Locator;
    private colorSelector: Locator;
    private quantityInput: Locator;
    private quantityIncrement: Locator;
    private quantityDecrement: Locator;
    
    // Actions
    private addToCartButton: Locator;
    private buyNowButton: Locator;
    private wishlistButton: Locator;
    
    // Additional Information
    private availabilityStatus: Locator;
    private deliveryInfo: Locator;
    private returnPolicy: Locator;
    
    // Reviews
    private reviewsSection: Locator;
    private ratingStars: Locator;
    private reviewCount: Locator;
    
    // Related Items
    private relatedProducts: Locator;
    
    // Breadcrumbs
    private breadcrumbNav: Locator;

    constructor(page: Page) {
        super(page);
        
        // Initialize Product Information
        this.productTitle = page.locator(ProductPageSelectors.PRODUCT_TITLE);
        this.productPrice = page.locator(ProductPageSelectors.PRODUCT_PRICE);
        this.productDescription = page.locator(ProductPageSelectors.PRODUCT_DESCRIPTION);
        this.productImage = page.locator(ProductPageSelectors.PRODUCT_IMAGE);
        this.productGallery = page.locator(ProductPageSelectors.PRODUCT_GALLERY);
        
        // Initialize Product Options
        this.sizeSelector = page.locator(ProductPageSelectors.SIZE_SELECTOR);
        this.colorSelector = page.locator(ProductPageSelectors.COLOR_SELECTOR);
        this.quantityInput = page.locator(ProductPageSelectors.QUANTITY_INPUT);
        this.quantityIncrement = page.locator(ProductPageSelectors.QUANTITY_INCREMENT);
        this.quantityDecrement = page.locator(ProductPageSelectors.QUANTITY_DECREMENT);
        
        // Initialize Actions
        this.addToCartButton = page.locator(ProductPageSelectors.ADD_TO_CART_BUTTON);
        this.buyNowButton = page.locator(ProductPageSelectors.BUY_NOW_BUTTON);
        this.wishlistButton = page.locator(ProductPageSelectors.WISHLIST_BUTTON);
        
        // Initialize Additional Information
        this.availabilityStatus = page.locator(ProductPageSelectors.AVAILABILITY_STATUS);
        this.deliveryInfo = page.locator(ProductPageSelectors.DELIVERY_INFO);
        this.returnPolicy = page.locator(ProductPageSelectors.RETURN_POLICY);
        
        // Initialize Reviews
        this.reviewsSection = page.locator(ProductPageSelectors.REVIEWS_SECTION);
        this.ratingStars = page.locator(ProductPageSelectors.RATING_STARS);
        this.reviewCount = page.locator(ProductPageSelectors.REVIEW_COUNT);
        
        // Initialize Related Items
        this.relatedProducts = page.locator(ProductPageSelectors.RELATED_PRODUCTS);
        
        // Initialize Breadcrumbs
        this.breadcrumbNav = page.locator(ProductPageSelectors.BREADCRUMB_NAV);
    }

    // Navigation Methods
    async navigateToProduct(productId: string) {
        await this.page.goto(`/product/${productId}`);
    }

    // Product Information Methods
    async getProductTitle(): Promise<string | null> {
        return await this.productTitle.textContent();
    }

    async getProductPrice(): Promise<string | null> {
        return await this.productPrice.textContent();
    }

    async getProductDescription(): Promise<string | null> {
        return await this.productDescription.textContent();
    }

    // Product Options Methods
    async selectSize(size: string) {
        await this.sizeSelector.selectOption(size);
    }

    async selectColor(color: string) {
        await this.colorSelector.selectOption(color);
    }

    async setQuantity(quantity: number) {
        await this.quantityInput.fill(quantity.toString());
    }

    async incrementQuantity() {
        await this.quantityIncrement.click();
    }

    async decrementQuantity() {
        await this.quantityDecrement.click();
    }

    async getCurrentQuantity(): Promise<number> {
        const value = await this.quantityInput.inputValue();
        return parseInt(value, 10);
    }

    // Action Methods
    async addToCart() {
        await this.addToCartButton.click();
    }

    async buyNow() {
        await this.buyNowButton.click();
    }

    async toggleWishlist() {
        await this.wishlistButton.click();
    }

    async isInWishlist(): Promise<boolean> {
        const classNames = await this.wishlistButton.getAttribute('class') || '';
        return classNames.includes('active');
    }

    // Product Status Methods
    async isProductAvailable(): Promise<boolean> {
        const status = await this.availabilityStatus.textContent();
        return status?.toLowerCase().includes('in stock') ?? false;
    }

    async getDeliveryInfo(): Promise<string | null> {
        return await this.deliveryInfo.textContent();
    }

    async getReturnPolicy(): Promise<string | null> {
        return await this.returnPolicy.textContent();
    }

    // Review Methods
    async getRating(): Promise<number> {
        const ratingText = await this.ratingStars.getAttribute('data-rating');
        return ratingText ? parseFloat(ratingText) : 0;
    }

    async getReviewCount(): Promise<number> {
        const countText = await this.reviewCount.textContent();
        return countText ? parseInt(countText, 10) : 0;
    }

    // Image Gallery Methods
    async getMainImageSrc(): Promise<string | null> {
        return await this.productImage.getAttribute('src');
    }

    async clickGalleryImage(index: number) {
        await this.page.locator(`${ProductPageSelectors.PRODUCT_GALLERY} img`).nth(index).click();
    }

    // Breadcrumb Methods
    async getBreadcrumbPath(): Promise<string[]> {
        const breadcrumbs = await this.breadcrumbNav.locator('li').allTextContents();
        return breadcrumbs;
    }

    // Validation Methods
    async isProductPageLoaded(): Promise<boolean> {
        await this.productTitle.waitFor({ state: 'visible', timeout: 30000 });
        return await this.productTitle.isVisible();
    }

    // Related Products Methods
    async getRelatedProductsCount(): Promise<number> {
        return await this.page.locator(`${ProductPageSelectors.RELATED_PRODUCTS} .product-card`).count();
    }

    async clickRelatedProduct(index: number) {
        await this.page.locator(`${ProductPageSelectors.RELATED_PRODUCTS} .product-card`).nth(index).click();
    }

    // Error Handling
    async getErrorMessage(): Promise<string | null> {
        const errorLocator = this.page.locator('.error-message');
        return await errorLocator.isVisible() ? errorLocator.textContent() : null;
    }
}