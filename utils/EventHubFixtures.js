const { test: base, expect } = require('@playwright/test');
const email = "reuelgracias21@gmail.com";
const password = "Alien@1716";

exports.test = base.extend({

    authenticatedPage: async ({ browser }, use) => {
        
        const context = await browser.newContext();
        const page    = await context.newPage();

        
        await page.goto("https://eventhub.rahulshettyacademy.com/login");
        await page.getByPlaceholder("you@email.com").fill(email);
        await page.getByLabel("Password").fill(password);
        await page.locator("#login-btn").click();
        await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
        await use(page);
        await context.close();
    },

    createEvent: async ({ request }, use) => {
    
        const loginRes = await request.post(
            'https://api.eventhub.rahulshettyacademy.com/api/auth/login',
            {data: {email: email, password: password}}
        );
        const loginResJson = await loginRes.json();
        const loginToken = loginResJson.token;


        const eventRes = await request.post(
        'https://api.eventhub.rahulshettyacademy.com/api/events',
        {
        headers: { Authorization: `Bearer ${loginToken}` },
        data: {
        title: `Fixture Event ${Date.now()}`,
        description: 'Created by Playwright fixture',
        city: 'Test City',
        venue: 'Test Venue',
        eventDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        category: 'Music',
        price: 50,
        totalSeats: 10
        }
        }
        )
        const eventData = await eventRes.json();
        await use(eventData);
    }
});