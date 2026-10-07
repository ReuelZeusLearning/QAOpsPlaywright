const { test, expect } = require('@playwright/test');




test('@Webst Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "anshikaw@yahoo.com";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.getByPlaceholder("email@example.com").fill(email);
   await page.getByPlaceholder("enter your passsword").fill("Learning@830$3mK3");
   await page.getByRole("button", {name: "Login"}).click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles); 

   await page.locator(".card-body").filter({hasText: "ZARA COAT 3"}).getByRole("button", {name: "Add To Cart"}).click();
   await page.getByRole("listitem").getByRole("button", {name: "Cart"}).click();
   //await page.pause();

   await page.locator("div li").first().waitFor();
   await expect(page.getByText("ZARA COAT 3")).toBeVisible();
   await page.getByRole("button", {name: "Checkout"}).click();


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



   await page.getByPlaceholder("Select Country").pressSequentially("ind");
   await page.getByRole("button", {name: " India"}).nth(1).click();

   await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   await page.getByText("PLACE ORDER").click();
   await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
   
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








