const { expect } = require('@playwright/test');
const { test } = require('../utils/EventHubFixtures');

test('created event appears on events page', async ({ authenticatedPage, createEvent }) => {
    
    await authenticatedPage.goto('https://eventhub.rahulshettyacademy.com/events');
    await expect(authenticatedPage.locator("[data-testid='event-card']").filter({ hasText: createEvent.data.title }).first()).toBeVisible();

});