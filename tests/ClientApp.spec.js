const { test, expect } = require('@playwright/test');




test('@Web Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "reuelgracias21@gmail.com";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill("Alien@1716");
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles); 
   const count = await products.count();
   for (let i = 0; i < count; ++i) {
      if (await products.nth(i).locator("b").textContent() === productName) {
         //add to cart
         await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
   }

   await page.locator("[routerlink*='cart']").click();
   //await page.pause();

   await page.locator("div li").first().waitFor();
   const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   expect(bool).toBeTruthy();
   await page.locator("text=Checkout").click();


   const cardname = "reuel";
   const cvvno = 123;
   const ccn="4542 9931 9292 2293";
   const expdatedd1=page.locator('select.input').first();
   const expdatedd2=page.locator('select.input').last();
   const expdatedd1opt = expdatedd1.locator('option');
   const expdatedd2opt = expdatedd2.locator('option');
   for (let i=0;i<await expdatedd1opt.count();++i) {
      const text = await expdatedd1opt.nth(i).textContent();
      if (text === "03") {
         await expdatedd1.selectOption({ index: i });
         break;
      }
   }
   for (let i=0;i<await expdatedd2opt.count();++i) {
      const text = await expdatedd2opt.nth(i).textContent();
      if (text === "16") {
         await expdatedd2.selectOption({ index: i });
         break;
      }
   }



   await page.locator('.field', { hasText: 'Name on Card' }).locator('input').fill(cardname);
   await page.locator('.field', { hasText: 'CVV Code ' }).locator('input').fill(cvvno.toString());
   await expect(page.locator('.field', { hasText: 'Credit Card Number ' }).locator('input')).toHaveValue(ccn);



   await page.locator("[placeholder*='Country']").pressSequentially("ind");
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }

   expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);

   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");


   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();

});








