import { test, expect } from '@playwright/test';
test('Sauce Demo Login ', async ({ page }) => {
    const username = "standard_user";
    const password = "secret_sauce";    
    await page.goto("https://www.saucedemo.com/");
    await expect(page.getByText("Swag Labs")).toBeVisible();


    // Attempt login with empty credentials
    await page.getByPlaceholder("Username").fill("");
    await page.getByPlaceholder("Password").fill("");
    await page.locator(".submit-button").click();
    await expect(page.getByText("Epic sadface: Username is required")).toBeVisible();
    await page.locator(".error-button").click();
    await expect(page.getByText("Epic sadface: Username is required")).not.toBeVisible();


    // Attempt login with username filled and empty password input
    await page.getByPlaceholder("Username").fill(username);
    await page.getByPlaceholder("Password").fill("");
    await page.locator(".submit-button").click();
    await expect(page.getByText("Epic sadface: Password is required")).toBeVisible();
    await page.locator(".error-button").click();
    await expect(page.getByText("Epic sadface: Password is required")).not.toBeVisible();

    // Attempt login with empty username and password filled
    await page.getByPlaceholder("Username").fill("");
    await page.getByPlaceholder("Password").fill(password);
    await page.locator(".submit-button").click();
    await expect(page.getByText("Epic sadface: Username is required")).toBeVisible();
    await page.locator(".error-button").click();
    await expect(page.getByText("Epic sadface: Username is required")).not.toBeVisible();

     // Attempt login with invalid credentials
    await page.getByPlaceholder("Username").fill("invalid_user");
    await page.getByPlaceholder("Password").fill("invalid_password");
    await page.locator(".submit-button").click();
    await expect(page.getByText("Epic sadface: Username and password do not match any user in this service")).toBeVisible();
    await page.locator(".error-button").click();
    await expect(page.getByText("Epic sadface: Username and password do not match any user in this service")).not.toBeVisible();

    // Attempt login with valid credentials
    await page.getByPlaceholder("Username").fill(username);
    await page.getByPlaceholder("Password").fill(password);
    await page.locator(".submit-button").click();
    await page.waitForLoadState('networkidle');
});