

import { test } from '@playwright/test';
import * as fs from 'fs';
import { Headphones } from '../pages/HeadphonesPage';
import { Shoes } from '../pages/ShoesPage';
import { Watches } from '../pages/WatchsPage';
import { Bottles } from '../pages/BottlesPage';
import { AssertCartSum, handleCart } from '../helper';

test.beforeEach(async({page})=>{
    // const phone = 8483862726;
    // const phone = 9119479982;
    const phone = 8483862726;
    // const phone = 8767950663;

    page.setDefaultTimeout(60000);
    await page.goto("https://www.snapdeal.com");
    await page.locator("[class*='dhQjLN']").nth(0).click();
    await page.getByRole('button',{name:"LOGIN"}).click();
    await page.getByPlaceholder("Mobile Number/ Email").pressSequentially(phone.toString(),{delay:150});
    await page.getByRole('button',{name:"CONTINUE"}).click();
    await page.waitForTimeout(25000);// waiting to fill otp
    await page.getByRole('button',{name:'CONTINUE'}).click();
})

 test('Snapdeal capture top five product details and save to JSON', async ({ page, context }) => {

  // const results: { category: string; rank: number; name: string; price: string }[] = [];
  
  // const firstProducts : { category: string; rank: number; name: string; price: string }[] = [];

  // -------- Headphones --------
  const headphn = new Headphones(page)
  
  await headphn.headphones()

  await headphn.addTopFiveResultsInJson()

  headphn.addProductToCartJson()

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

  watch.addProductToCartJsonWatch()
 
  // await page.getByPlaceholder('Enter your pincode').fill('411051');
 
  // await page.getByRole('button', {name:'Check'}).click()
 
  await handleCart(page, context);
 
  // await newpage.pause();


  // -------- Bottle --------
  const bottle = new Bottles(page)
 
  await bottle.handleBottles()

  await bottle.addTopFiveResultsInJsonBottles()

  bottle.addProductToCartJsonBottles()

  await handleCart(page, context);

  // // ✅ Write JSON output
  // fs.writeFileSync(
  //   'snapdealProducts.json',
  //   JSON.stringify(results, null, 2),
  //   'utf-8'
  // );

  // // Write ONLY first product of each category
  // fs.writeFileSync(
  //   'snapdealFirstProducts.json',
  //   JSON.stringify(firstProducts, null, 2),
  //   'utf-8'
  // );
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

  // Asserting the Cart Sum after adding all the items in cart
  await AssertCartSum(page);

    // await newpage.getByText("Proceed To Checkout").click();
  
   // await page.pause();
// await page.goto("https://www.snapdeal.com/product/nitti-men-cotton-oversized-fit/642101537830#bcrumbLabelId:3033");
// //await page.getByRole('link',{name:"buy now"}).click();
    const frameLocator = page.locator('iframe').first().contentFrame();
    // await frameLocator.getByRole('button', { name: 'Continue' }).click();
    await page.waitForTimeout(5000); // waiting to fill otp
    //filling the payment details
    // await page.locator('iframe').nth(1).contentFrame().locator('#contact').fill("")
    // await page.locator('iframe').nth(1).contentFrame().locator('#contact').fill("9119479982")
    // await page.pause()
    await page.locator('iframe').first().contentFrame().getByRole('button', { name: 'Continue' }).click()

    await page.waitForTimeout(3000)

    await frameLocator.locator('#address-add').click();
    await frameLocator.locator('#name').fill("Prathamesh Milind Kasture");
    await frameLocator.locator('#zipcode').fill("411051");
    await frameLocator.locator('#line1').fill("Hyderabad");
    await frameLocator.locator('#line2').fill("banjara hills");
    //await frameLocator.getByRole('button', { name: 'Continue' }).click();
    await page.waitForTimeout(3000);
    await frameLocator.getByRole('button', { name: 'Continue' }).click();
    await page.waitForLoadState();
    await frameLocator.getByRole('listitem').filter({ hasText: 'Card .e{fill:#f79e1b}' }).click();
     await frameLocator.locator('#card_number').fill("1234567891234567");
    await frameLocator.locator('#card_expiry').pressSequentially("1234",{delay:150});
    await frameLocator.locator('#card_cvv').fill("123");
    const errormessage = page.locator('iframe').first().contentFrame().getByText('Please enter a valid card');
    //await expect.soft(errormessage).toHaveText("Please enter a valid card");
    await frameLocator.locator('#header-1cc').getByRole('button').click();
    await frameLocator.getByText('Yes, cancel').click();

    await page.locator('.icon-font-grey-size24 > .sd-icon').first().click()

    const logout = page.locator('[class*="accountInner"]').hover();
   // await newpage.getByRole('[class*="logout-account"]').click();
   //await newpage.getByRole('link',{name:"LOGOUT"}).click();
   await page.getByRole('link', { name: 'Logout' }).click();

});