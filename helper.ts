import {Page, BrowserContext, expect} from '@playwright/test'

export async function handleCart(page:Page, context: BrowserContext):Promise<void>{
    const item = page.locator('[class*="centerCardAfterLoadWidgets"] section div')
    const [newpage] = await Promise.all([
        context.waitForEvent('page'),
        item.nth(0).click()
    ])
    //await newpage.pause();
    await newpage.waitForLoadState();
 
    await newpage.locator('#add-cart-button-id').click();

    await newpage.waitForLoadState('networkidle')

    await newpage.close();
} 


export async function AssertCartSum(page:Page){

    await page.waitForLoadState('networkidle')

    await page.locator("[class='cartContainer col-xs-11 reset-padding']").click();

    await page.waitForTimeout(3000);

    await page.locator('#rzp-cart-button').click()

    await page.waitForLoadState('networkidle');

    const getCartItems = await page.locator('.item-subtotal-black').allTextContents();

    console.log(getCartItems)

    let total = 0;
    for(let i=0; i<getCartItems.length; i++){
        let price = getCartItems[i];

       let np = price.split(" ")[1]

       let newPrice = "";
       let numArr = np.split(',')
       for(let i=0; i<numArr.length; i++){
            newPrice += numArr[i];
       }
       let nPrice = parseInt(newPrice);
       if(isNaN(nPrice)){
            total += 0;
       } else {
            total += nPrice;
       }
    }

    // await page.pause()

    const finalprice = total.toLocaleString('en-US');
    console.log(total.toLocaleString('en-US'));
    // console.log(await page.locator('iframe').nth(1).contentFrame().getByTestId('cart-amount').textContent())
    console.log('\u20B9'+finalprice)
    // expect(await page.locator('iframe').nth(1).contentFrame().getByTestId('cart-amount').textContent()).toEqual("\u20B9"+finalprice)
}