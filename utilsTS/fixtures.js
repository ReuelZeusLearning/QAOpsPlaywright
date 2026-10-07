const base = require('@playwright/test');
const { test, request } = require('@playwright/test');

const { APIUtils } = require('./APIUtils.js');
const loginPayload = {
  userEmail: "reuelgracias21@gmail.com",
  userPassword: "Alien@1716"
}

const orderPayload = {
   orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]
}


exports.customtest = base.test.extend({
    authenticatedPage: async({browser}, use)=>
    {
    const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(loginPayload.userEmail);
   await page.locator("#userPassword").fill("Alien@1716");
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');
   await use(page);
    //tear down
    await context.close();
    },
    createOrder: async({}, use) => {
    const apiContext = await request.newContext();
   const apiUtils = new APIUtils(apiContext, loginPayload);
   const response =  await apiUtils.createOrder(orderPayload);
   await use(response);
   await apiContext.dispose();
    },
    testDataForOrder : {

    productName : 'ADIDAS ORIGINAL'
  }
});