import {Page} from '@playwright/test'
import { SnapdealHomePage } from '../pages/snapdealHomePage';
import { SnapdealResultsPage } from '../pages/snapdealResultsPage';

export class Headphones{
    readonly page:Page;
    readonly homePage: SnapdealHomePage;
    readonly resultsPage: SnapdealResultsPage;
    readonly results: { category: string; rank: number; name: string; price: string }[];
    readonly firstProduct: { category: string; name: string; price: string }[] = [];
    readonly headphns: {category: string; name: string; price: string }[] = [];

    constructor(page: Page){
        this.page = page;
        this.homePage = new SnapdealHomePage(page);
        this.resultsPage = new SnapdealResultsPage(page)
        this.results = [];
        this.firstProduct = [];
        this.headphns = [];
    }

    async headphones(){
        await this.homePage.openSnapdeal();
        await this.homePage.closeLoginPopupIfVisible();
        await this.homePage.searchProduct('Bluetooth headphone');
        await this.page.getByPlaceholder('Enter your pincode').fill('411051');
        await this.page.getByRole('button', {name:'Check'}).click()
        await this.resultsPage.sortBy('Popularity');
        await this.resultsPage.applyPriceRange('700', '1400');
        await this.resultsPage.filterByRating4Plus();
    }

    async addTopFiveResultsInJson(){
    const headphones = await this.resultsPage.getTopFiveProductDetails();
     headphones.forEach((item, index) => {
        this.results.push({
        category: 'Headphones',
        rank: index + 1,
        name: item.name,
        price: item.price
    });
  });
    
}

    async addProductToCartJson(){
        const headphones = await this.resultsPage.getTopFiveProductDetails();
          this.firstProduct.push({
            category: 'Headphones',
            name: headphones[0].name,
            price: headphones[0].price
  });
    }
}