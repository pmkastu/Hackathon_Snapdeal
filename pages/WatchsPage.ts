import {Page} from '@playwright/test'
import { SnapdealHomePage } from '../pages/snapdealHomePage';
import { SnapdealResultsPage } from '../pages/snapdealResultsPage';

export class Watches{
    readonly page:Page;
    readonly homePage: SnapdealHomePage;
    readonly resultsPage: SnapdealResultsPage;
    readonly results: { category: string; rank: number; name: string; price: string }[];
    readonly firstProduct: { category: string; name: string; price: string }[] = [];
    readonly watches: {category: string; name: string; price: string }[] = [];

    constructor(page: Page){
        this.page = page;
        this.homePage = new SnapdealHomePage(page);
        this.resultsPage = new SnapdealResultsPage(page)
        this.results = [];
        this.firstProduct = [];
        this.watches = [];
    }

    async handleWatches(){
        await this.homePage.goToHomePage();
  await this.homePage.searchProduct('Watch');
  //  await page.getByPlaceholder('Enter your pincode').fill('411051');
  // await page.getByRole('button', {name:'Check'}).click()
  await this.resultsPage.sortByDiscount();
  await this.resultsPage.applyPriceRange('500', '1500');
  await this.resultsPage.filterByRating4Plus();
  await this.page.waitForLoadState('networkidle');

    }

    async addTopFiveResultsInJsonWatch(){
         const watches = await this.resultsPage.getTopFiveProductDetails();
  watches.forEach((item, index) => {
    this.results.push({
      category: 'Watch',
      rank: index + 1,
      name: item.name,
      price: item.price
    });
  });
    }

    async addProductToCartJsonWatch(){
         const watches = await this.resultsPage.getTopFiveProductDetails();
         this.firstProduct.push({
    category: 'Watch',
    name: watches[0].name,
    price: watches[0].price
  });
    }
}