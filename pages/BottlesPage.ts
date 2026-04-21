import {Page} from 'playwright/test'
import { SnapdealHomePage } from '../pages/snapdealHomePage';
import { SnapdealResultsPage } from '../pages/snapdealResultsPage';

export class Bottles{
    readonly page:Page;
    readonly homePage: SnapdealHomePage;
    readonly resultsPage: SnapdealResultsPage;
    readonly results: { category: string; rank: number; name: string; price: string }[];
    readonly firstProduct: { category: string; name: string; price: string }[] = [];
    readonly bottles: {category: string; name: string; price: string }[] = []

    constructor(page:Page){
        this.page = page
        this.homePage = new SnapdealHomePage(page);
        this.resultsPage = new SnapdealResultsPage(page)
        this.results = [];
        this.firstProduct = [];
        this.bottles =  []
    }

    async handleBottles(){
         const bottles = await this.resultsPage.getTopFiveProductDetails();
  bottles.forEach((item, index) => {
    this.results.push({
      category: 'Bottle',
      rank: index + 1,
      name: item.name,
      price: item.price
    });
  });

    }

    async addTopFiveResultsInJsonBottles(){
        await this.homePage.goToHomePage();
        await this.homePage.searchProduct('Milton Bottle');
        await this.resultsPage.sortByLowToHigh();
        await this.resultsPage.filterByRating4Plus();

    }

    async addProductToCartJsonBottles(){
        const bottles = await this.resultsPage.getTopFiveProductDetails();
        this.firstProduct.push({
    category: 'Bottle',
    name: bottles[0].name,
    price: bottles[0].price
  });
    }
}