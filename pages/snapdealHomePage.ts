import { Page, Locator } from '@playwright/test';

export class SnapdealHomePage {
  readonly page: Page;
  readonly popupCloseBtn: Locator;
  readonly searchBox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.popupCloseBtn = page.locator('.pushRejectLogin');
    this.searchBox = page.locator('#search-box-input');
  }

  async openSnapdeal(): Promise<void> {
    await this.page.goto('https://www.snapdeal.com/', {
      waitUntil: 'domcontentloaded'
    });
    await this.page.setViewportSize({ width: 1980, height: 1100 });
  }

  async goToHomePage(): Promise<void> {
    await this.page.goto('https://www.snapdeal.com/', {
      waitUntil: 'domcontentloaded'
    });
  }

  async closeLoginPopupIfVisible(): Promise<void> {
    if (await this.popupCloseBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await this.popupCloseBtn.click();
    }
  }

  async searchProduct(productName: string): Promise<void> {
    await this.searchBox.waitFor({ state: 'visible', timeout: 10000 });
    await this.searchBox.fill(productName);
    await this.searchBox.press('Enter');
  }
}