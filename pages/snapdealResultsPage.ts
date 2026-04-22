import { Page, Locator } from '@playwright/test';

export class SnapdealResultsPage {
  readonly page: Page;
  readonly fromPrice: Locator;
  readonly toPrice: Locator;
  readonly goButton: Locator;
  readonly products: Locator;
  readonly sortButton: Locator;
  readonly rating4Plus: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortButton = page.locator('div.sort-selected');
    this.fromPrice = page.locator('input[name="fromVal"]');
    this.toPrice = page.locator('input[name="toVal"]');
    this.goButton = page.locator('.price-go-arrow');
    this.products = page.locator('.product-tuple-listing');
    this.rating4Plus = page.locator('label[for="avgRating-4\\.0"]');
  }

  async sortBy(option: 'Popularity' | 'Relevance'): Promise<void> {
    await this.products.first().waitFor({ timeout: 15000 });
    await this.sortButton.click();
    await this.page.locator('li', { hasText: option }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async sortByDiscount(): Promise<void> {
    await this.products.first().waitFor({ timeout: 15000 });
    await this.sortButton.click();
    await this.page.locator('li', { hasText: 'Discount' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async sortByLowToHigh(): Promise<void> {
    await this.products.first().waitFor({ timeout: 15000 });
    await this.sortButton.click();
    await this.page.locator('li', { hasText: 'Low to High' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async applyPriceRange(minPrice: string, maxPrice: string): Promise<void> {
    await this.fromPrice.fill(minPrice);
    await this.toPrice.fill(maxPrice);
    await this.goButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async filterByRating4Plus(): Promise<void> {
    const ratingFilter = this.page.locator(
      'label[for="avgRating-4\\.0"]'
    );

    await ratingFilter.waitFor({ state: 'visible', timeout: 15000 });
    await ratingFilter.click({ force: true });

    // Wait for results to refresh instead of networkidle
    await this.products.first().waitFor({ state: 'visible', timeout: 15000 });
  }

 async getTopFiveProductDetails(): Promise<{ name: string; price: string }[]> {
  const productDetails: { name: string; price: string }[] = [];

  const count = await this.products.count();
  const limit = Math.min(5, count);

  for (let i = 0; i < limit; i++) {
    const product = this.products.nth(i);

    const name = await product.locator('.product-title').innerText();
    const price = await product.locator('.product-price').innerText();

    productDetails.push({
      name: name.trim(),
      price: price.trim()
    });
  }

  return productDetails;
}
}


