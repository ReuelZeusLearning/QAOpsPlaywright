import { test, expect } from '@playwright/test';
import { customtest1 } from '../utilsTS/test-base';
import { POManager } from '../PageObjects/POManager';

const dataset =  JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));


test('@smoke Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "reuelgracias21@gmail.com";
   const password = "Alien@1716";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   const poManager = new POManager(page);
   const loginPage = poManager.getLoginPage();
   await loginPage.goTo();
   await loginPage.validLogin(email, password);
   const dashboardPage = poManager.getDashboardPage();
   await dashboardPage.searchProductAddCart(productName);
   await dashboardPage.navigateToCart();


   const cartPage = poManager.getCartPage();
   await cartPage.VerifyProductIsDisplayed(productName);
   await cartPage.Checkout();


   const ordersReviewPage = poManager.getOrdersReviewPage();
   await ordersReviewPage.searchCountryAndSelect("ind","India");
   let orderId: any;
   orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);
   await dashboardPage.navigateToOrders();
   const ordersHistoryPage = poManager.getOrdersHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();


 });

 customtest1(`Client App login`, async ({page,testDataForOrder})=>
 {
   const poManager = new POManager(page);
    //js file- Login js, DashboardPage
     const products = page.locator(".card-body");
     const loginPage = poManager.getLoginPage();
     await loginPage.goTo();
     await loginPage.validLogin(testDataForOrder.username,testDataForOrder.password);
     const dashboardPage = poManager.getDashboardPage();
     await dashboardPage.searchProductAddCart(testDataForOrder.productName);
     await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
    await cartPage.Checkout();


})







