const { expect } = require('@playwright/test');

async function login(page) {
    const email = "reuelgracias21@gmail.com";
    const password = "Alien@1716";
    await page.goto("https://eventhub.rahulshettyacademy.com");
    await page.getByPlaceholder("you@email.com").fill(email);
    await page.getByLabel("Password").fill(password);
    await page.locator("#login-btn").click();
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
}

async function loginAndGoToBooking(page) {
    await login(page);
}

async function loginAndGoToEvents(page) {
  await login(page);
  await page.locator("#nav-events").click();
  await page.waitForLoadState('networkidle');
}

async function loginAs(page, user) {
  await page.goto('https://eventhub.rahulshettyacademy.com');
  await page.getByPlaceholder('you@email.com').fill(user.email);
  await page.getByLabel('Password').fill(user.password);
  await page.locator('#login-btn').click();
  await page.waitForLoadState('networkidle');
}

const USER_A = { email: 'reuel@yahoo.com', password: 'Alien@1716' };
const USER_B = { email: 'reuel@gmail.com', password: 'Alien@1716' };

module.exports = { login, loginAndGoToBooking, loginAndGoToEvents, loginAs, USER_A, USER_B };
