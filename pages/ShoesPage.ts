import {Page} from 'playwright/test'
import { SnapdealHomePage } from '../pages/snapdealHomePage';
import { SnapdealResultsPage } from '../pages/snapdealResultsPage';

export class Shoes{
    readonly page:Page;
    readonly homePage: SnapdealHomePage;
    readonly resultsPage: SnapdealResultsPage;
    readonly results: { category: string; rank: number; name: string; price: string }[];
    readonly firstProduct: { category: string; name: string; price: string }[] = [];
    readonly shoes: {category: string; name: string; price: string }[] = []

    constructor(page:Page){
        this.page = page
        this.homePage = new SnapdealHomePage(page);
        this.resultsPage = new SnapdealResultsPage(page)
        this.results = [];
        this.firstProduct = [];
        this.shoes =  []
    }

    async handleShoes(){
        await this.homePage.goToHomePage();
        await this.homePage.searchProduct('Shoes');
        await this.resultsPage.sortBy('Relevance');
        await this.resultsPage.applyPriceRange('1000', '2000');
        await this.resultsPage.filterByRating4Plus();
    }

    async addTopFiveResultsInJsonShoes(){
         const shoes = await this.resultsPage.getTopFiveProductDetails();
        shoes.forEach((item, index) => {
        this.results.push({
        category: 'Shoes',
        rank: index + 1,
        name: item.name,
        price: item.price
    });
  });
    }

    async addProductToCartJsonShoes(){
        const shoes = await this.resultsPage.getTopFiveProductDetails();
          this.firstProduct.push({
    category: 'Shoes',
    name: shoes[0].name,
    price: shoes[0].price
  });
    }
}