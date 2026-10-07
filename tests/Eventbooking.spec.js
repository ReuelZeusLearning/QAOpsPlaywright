const { test, expect } = require('@playwright/test');
const { login } = require('../utils/EventHubLogin');
function futureDateValue() {
    return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16);
}

test('Booking Workflow', async ({ page }) => {
    
    //step 1 - login
    await login(page);
    await page.getByRole('button', {name: 'Admin'}).click();
    await page.getByRole('navigation').getByRole('link', {name: 'Manage Events'}).click();
    await page.waitForLoadState('networkidle');

    //step 2 - create a new event
    const eventTitle = `Test Event ${Date.now()}`;
    await page.locator("#event-title-input").fill(eventTitle);
    await page.locator("#admin-event-form textarea").fill("A test event description");
    await page.getByLabel("City").fill("Mumbai");
    await page.getByLabel("Venue").fill("Mumbai Convention Center");
    await page.getByLabel('Event Date & Time').fill(futureDateValue());
    await page.getByLabel("Price ($)").fill("100");
    await page.getByLabel("Total Seats").fill("50");
    await page.locator('#add-event-btn').click();
    await expect(page.getByText("Event created!")).toBeVisible();

    //Step 3 — Find the event card and capture seats
    await page.locator("#nav-events").click();
    await page.waitForLoadState('networkidle');
    const allCards = page.locator("[data-testid='event-card']");
    await expect(allCards.first()).toBeVisible();
    const eventCard = allCards.filter({hasText: eventTitle});
    await expect(eventCard.first()).toBeVisible({timeout: 5000});
    const seatsText = await eventCard.getByText("seats").last().innerText();
    const seatsBeforeBooking = parseInt(seatsText);

    //step 4 — Book a seat for the event
    await eventCard.locator('[data-testid="book-now-btn"]').click();
    await page.waitForLoadState('networkidle');
  

    //Step 5 — Fill booking form
    await expect(page.locator("#ticket-count")).toHaveText("1");
    await page.getByLabel("Full Name").fill('Reuel Gracias');
    await page.locator("#customer-email").fill('reuelgracias21@gmail.com');
    await page.getByPlaceholder("+91 98765 43210").fill('9876543210');
    await page.locator('.confirm-booking-btn').click();

    //step 6 — Verify booking confirmation
    const bookingRefElement = page.locator(".booking-ref").first();
    await expect(bookingRefElement).toBeVisible();
    const bookingRef = (await bookingRefElement.innerText()).trim();
    console.log("Booking Reference:", bookingRef);

    //Step 7 — Verify in My Bookings
    await page.getByRole('link', { name: 'View My Bookings' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('https://eventhub.rahulshettyacademy.com/bookings');
    const bookingCards = page.locator('#booking-card');
    await expect(bookingCards.first()).toBeVisible();
    const matchedbookingCard = bookingCards.filter({hasText: bookingRef});
    await expect(matchedbookingCard).toBeVisible({timeout: 5000});
    await expect(matchedbookingCard).toContainText(eventTitle);

    //Step 8 — Verify seat reduction
    await page.locator("#nav-events").click();
    await page.waitForLoadState('networkidle');
    const allCardsAfter = page.locator("[data-testid='event-card']");
    await expect(allCardsAfter.first()).toBeVisible();
    const eventCardAfter = allCardsAfter.filter({hasText: eventTitle});
    await expect(eventCardAfter.first()).toBeVisible({timeout: 5000});
    const seatsTextAfter = await eventCardAfter.getByText("seats").last();
    await expect(seatsTextAfter).toContainText(`${seatsBeforeBooking - 1} seats`);
});