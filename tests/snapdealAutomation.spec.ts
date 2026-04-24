import { test } from '@playwright/test';
import * as fs from 'fs';
import { Headphones } from '../pages/HeadphonesPage';
import { Shoes } from '../pages/ShoesPage';
import { Watches } from '../pages/WatchsPage';
import { Bottles } from '../pages/BottlesPage';
import { PaymentPage } from '../pages/PaymentPage';
import  addressData  from '../data/data.json';
import { AssertCartSum, handleCart, loginPopUp, logoutDropdown, removeitemsFromCart} from '../helper';

test.beforeEach(async({page})=>{
  const phone = 9119479982;
  await loginPopUp(page,phone);
})

 test('Snapdeal capture top five product details and save to JSON', async ({ page, context }) => {

  // -------- Headphones --------
  const headphn = new Headphones(page)
  await headphn.headphones()
  await headphn.addTopFiveResultsInJson()
  await headphn.addProductToCartJson()
  await handleCart(page, context);

  // -------- Shoes --------
  const shoe = new Shoes(page)
  await shoe.handleShoes()
  await shoe.addTopFiveResultsInJsonShoes()
  await shoe.addProductToCartJsonShoes()
  await handleCart(page, context);

  // -------- Watch --------
  const watch = new Watches(page)
  await watch.handleWatches()
  await watch.addTopFiveResultsInJsonWatch();
  await watch.addProductToCartJsonWatch()
  await handleCart(page, context);
 
  // await newpage.pause();


  // -------- Bottle --------
  const bottle = new Bottles(page)
  await bottle.handleBottles()
  await bottle.addTopFiveResultsInJsonBottles()
  await bottle.addProductToCartJsonBottles()
  await handleCart(page, context);

   const results = [
    ...headphn.results,
    ...shoe.results,
    ...watch.results,
    ...bottle.results,
  ];

  const firstProducts = [
    ...headphn.firstProduct,
    ...shoe.firstProduct,
    ...watch.firstProduct,
    ...bottle.firstProduct,
  ];

  // ✅ Write JSON output
  fs.writeFileSync('snapdealProducts.json', JSON.stringify(results, null, 2), 'utf-8');
  fs.writeFileSync('snapdealFirstProducts.json', JSON.stringify(firstProducts, null, 2), 'utf-8');

  await AssertCartSum(page);

  const payment = new PaymentPage(page)
  const name:string = addressData.address.name
  const zip:string = addressData.address.zip
  const ad1:string = addressData.address.ad1
  const ad2:string = addressData.address.ad2;
  await payment.addAddress(name, zip, ad1,ad2)

  const cardNum:string = addressData.cardDetails.cardNum;
  const expiry:string = addressData.cardDetails.expiry;
  const cvv:string = addressData.cardDetails.cvv;

  await payment.enterCardDetailsAndAssert(cardNum, expiry, cvv)

  await payment.closePopUp()

  await removeitemsFromCart(page);
  
});

test.afterEach(async({page}) => {
   await logoutDropdown(page)
})