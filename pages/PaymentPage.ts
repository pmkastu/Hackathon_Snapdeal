import {Page, Locator} from '@playwright/test'

export class PaymentPage{
    readonly page:Page;
    readonly frameLocator:any;
    readonly address: Locator;
    readonly name: Locator;
    readonly zipcode: Locator;
    readonly line1: Locator;
    readonly line2: Locator;
    readonly cardNumber: Locator;
    readonly cardExpiry: Locator;
    readonly cardCvv: Locator;
    readonly closeBtn: Locator;
    readonly cancel: Locator;

    constructor(page:Page){
        this.page = page
        this.frameLocator = page.locator('iframe').first().contentFrame()
        this.address = this.frameLocator.locator('#address-add')
        this.name = this.frameLocator.locator('#name')
        this.zipcode = this.frameLocator.locator('#zipcode');
        this.line1 = this.frameLocator.locator('#line1')
        this.line2 = this.frameLocator.locator('#line2')
        this.cardNumber =  this.frameLocator.locator('#card_number')
        this.cardExpiry = this.frameLocator.locator('#card_expiry')
        this.cardCvv =  this.frameLocator.locator('#card_cvv')
        this.closeBtn = this.frameLocator.locator('#header-1cc')
        this.cancel = this.frameLocator.getByText('Yes, cancel')
    }

    async addAddress(fname:string, zip:string, ad1:string, ad2:string){
        await this.frameLocator.getByRole('button', { name: 'Continue' }).click()
        await this.page.waitForTimeout(3000)
        await this.address.click();
        await this.name.fill(fname);
        await this.zipcode.fill(zip);
        await this.line1.fill(ad1);
        await this.line2.fill(ad2);
        await this.page.waitForTimeout(3000);
        await this.frameLocator.getByRole('button', { name: 'Continue' }).click();
    }

    async enterCardDetailsAndAssert(cardnumber:string, expiry:string, cvv:string){
        await this.page.waitForLoadState();
        await this.frameLocator.getByRole('listitem').filter({ hasText: 'Card .e{fill:#f79e1b}' }).click();
        await this.cardNumber.fill(cardnumber);
        await this.cardExpiry.pressSequentially(expiry,{delay:150});
        await this.cardCvv.fill(cvv);
        const errormessage = this.frameLocator.getByText('Please enter a valid card');
        // //await expect.soft(errormessage).toHaveText("Please enter a valid card");
    }

    async closePopUp(){
        await this.closeBtn.getByRole('button').click();
        await this.cancel.getByText('Yes, cancel').click();
    }
}