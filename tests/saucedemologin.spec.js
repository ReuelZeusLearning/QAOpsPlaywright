import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/SauceDemoLoginPage';
import { HomePage } from './pages/HomePage';
const { LoginUtils } = require('../utils/LoginUtils');
let loginUtils;

test.describe('Homepage', () => {

    test.beforeEach(async ({ page }) => {
        loginUtils = new LoginUtils(page);
        await loginUtils.login();
    });

    test('Products page is visible after login', async ({ page }) => {
        const homePage = new HomePage(page);
        await expect(homePage.productsTitle).toBeVisible();
        await expect(homePage.swagLabsHeader).toBeVisible();

        // Non-retrying: reads the text once, no waiting
        expect(await homePage.productsTitle.textContent()).toBe('Products');
    });

});


test.describe('Login page', () => {
    const username = 'standard_user';
    const password = 'secret_sauce';
    let loginPage;
    let homePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        await loginPage.goto();
    });

    test('TC-01 login page loads', async ({ page }) => {
        await expect(page.getByText("Swag Labs")).toBeVisible();
        await expect(loginPage.usernameInput).toBeVisible();
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();
    });

    test('TC-02 valid credentials', async ({ page }) => {
        await loginPage.login(username, password);
        await expect(page).toHaveURL(/inventory/);
        await expect(homePage.productsTitle).toBeVisible();
    });

    test('TC-03 empty username and password', async ({ page }) => {
        const error = page.getByText("Epic sadface: Username is required");
        await loginPage.login("", "");
        await expect(error).toBeVisible();
        await loginPage.dismissError();
        await expect(error).not.toBeVisible();
    });

    test('TC-04 username only, empty password', async ({ page }) => {
        const error = page.getByText("Epic sadface: Password is required");
        await loginPage.login(username, "");
        await expect(error).toBeVisible();
        await loginPage.dismissError();
        await expect(error).not.toBeVisible();
    });

    test('TC-05 password only, empty username', async ({ page }) => {
        const error = page.getByText("Epic sadface: Username is required");
        await loginPage.login("", password);
        await expect(error).toBeVisible();
        await loginPage.dismissError();
        await expect(error).not.toBeVisible();
    });

    test('TC-06 invalid credentials', async ({ page }) => {
        const error = page.getByText("Epic sadface: Username and password do not match any user in this service");
        await loginPage.login("invalid_user", "invalid_password");
        await expect(error).toBeVisible();
        await loginPage.dismissError();
        await expect(error).not.toBeVisible();
    });

    test('Sauce Demo Login Locked User', async ({ page }) => {
        const error = page.getByText('Epic sadface: Sorry, this user has been locked out.');
        await loginPage.login('locked_out_user', password);
        await expect(error).toBeVisible();
        await loginPage.dismissError();
        await expect(error).not.toBeVisible();
    });

    test('Logout', async ({ page }) => {
        await loginPage.login(username, password);

        await homePage.menuButton.click();
        await homePage.logoutLink.click();

        await expect(page).toHaveURL("https://www.saucedemo.com/");
        await expect(loginPage.loginButton).toBeVisible();
    });
});

