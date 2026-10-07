const { test, expect, request } = require('@playwright/test');

test("network intercept 2", async ({ page }) => {

    const email = "reuelgracias21@gmail.com";
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Alien@1716");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    await page.locator("button[routerlink*='myorders']").click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        async route => {
            await route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6abd5ce22be7a4bc2b7e1f3f" });
        }
    )

    await page.getByRole('button', { name: 'View' }).first().click();
    await expect(page.getByText("You are not authorize to view this order")).toBeVisible();
});