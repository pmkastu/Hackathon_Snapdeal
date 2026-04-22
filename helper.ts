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
    console.log(finalprice);
    // console.log(await page.locator('iframe').nth(1).contentFrame().getByTestId('cart-amount').textContent())
    console.log('\u20B9'+finalprice)
    // expect(await page.locator('iframe').nth(1).contentFrame().getByTestId('cart-amount').textContent()).toEqual("\u20B9"+finalprice)
}

export async function removeitemsFromCart(page: Page) {
    // Get count first
    const cartItems = page.getByText('REMOVE', {exact:true});
    let count = await cartItems.count();
    console.log(count)
    
    while (count > 0) {
        await page.waitForTimeout(2000);
        // Always click the first visible REMOVE button
        if(!(await cartItems.first().isVisible())){
            break;
        }
        await cartItems.first().click();
        // Wait for DOM to update after removal
        await page.waitForLoadState('networkidle');
        // Recount remaining items
        count = await cartItems.count();
    }

    await page.locator('.icon-font-grey-size24 > .sd-icon').first().click();
}

export async function loginPopUp(page:Page, phone:number){
    page.setDefaultTimeout(60000);

    await page.goto("https://www.snapdeal.com");
    await page.locator("[class*='dhQjLN']").nth(0).click();
    await page.getByRole('button',{name:"LOGIN"}).click();
    await page.getByPlaceholder("Mobile Number/ Email").pressSequentially(phone.toString(),{delay:150});
    await page.getByRole('button',{name:"CONTINUE"}).click();
    await page.waitForTimeout(25000);// waiting to fill otp
    await page.getByRole('button',{name:'CONTINUE'}).click();
}

export async function logoutDropdown(page:Page){
    await page.locator('[class*="accountInner"]').hover();
    await page.getByRole('link', { name: 'Logout' }).click();
}