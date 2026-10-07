const { test, expect } = require('@playwright/test');
const { loginAndGoToBooking } = require('../utils/EventHubLogin');

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';

// -- Test 1: Single ticket - eligible for refund
test('single ticket booking shows eligible for refund', async ({ page }) => {

    // Step 1 - Login
    await loginAndGoToBooking(page);

    //Step 2 - Book first event with 1 ticket (default)
    await page.locator("#nav-events").click();
    await page.waitForLoadState('networkidle');
    const firstCard = page.locator("[data-testid='event-card']").first();
    await expect(firstCard).toBeVisible();
    await firstCard.locator("[data-testid='book-now-btn']").click();
    await page.waitForLoadState('networkidle');

    await expect(page.locator("#ticket-count")).toHaveText("1");
    await page.getByLabel("Full Name").fill('Reuel Gracias');
    await page.locator("#customer-email").fill('reuelgracias21@gmail.com');
    await page.getByPlaceholder("+91 98765 43210").fill('9876543210');
    await page.locator('.confirm-booking-btn').click();

    // Read booking ref from confirmation page before navigating away
    const bookingRefEl = page.locator('.booking-ref').first();
    await expect(bookingRefEl).toBeVisible();
    const bookingRef = (await bookingRefEl.innerText()).trim();

    // Step 3 - Navigate to booking detail
    await page.getByRole('link', { name: 'View My Bookings' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);
    await page.getByRole('link', { name: 'View Details' }).first().click();
    await expect(page.getByText('Booking Information')).toBeVisible();

    //Step 4 - Validate booking ref
    const eventTitle = (await page.locator('h1').first().innerText()).trim();
    expect(bookingRef.charAt(0).toUpperCase()).toBe(eventTitle.charAt(0).toUpperCase());

    // Step 5 - Check refund eligibility
    await page.getByRole('button', { name: 'Check eligibility for refund?' }).click();
    await expect(page.locator("#refund-spinner")).toBeVisible();
    await expect(page.locator("#refund-spinner")).not.toBeVisible({timeout: 6000});

    // Step 6 - Validate result
    const result = page.locator('#refund-result');
    await expect(result).toBeVisible();
    await expect(result).toContainText("Eligible for refund");
    await expect(result).toContainText("Single-ticket bookings qualify for a full refund.");

});

// -- Test 2: Group ticket (3 tickets) - not eligible for refund
test('group ticket booking (3 tickets) shows not eligible for refund', async ({ page }) => {

    // Step 1 - Login
    await loginAndGoToBooking(page);

    // Step 2 - Book first event with 3 tickets
    await page.locator("#nav-events").click();
    await page.waitForLoadState('networkidle');
    const firstCard = page.locator("[data-testid='event-card']").first();
    await expect(firstCard).toBeVisible();
    await firstCard.locator("[data-testid='book-now-btn']").click();
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await expect(page.locator("#ticket-count")).toHaveText("3");
    await page.getByLabel("Full Name").fill('Reuel Gracias');
    await page.locator("#customer-email").fill('reuelgracias21@gmail.com');
    await page.getByPlaceholder("+91 98765 43210").fill('9876543210');
    await page.locator('.confirm-booking-btn').click();

    // Read booking ref from confirmation page before navigating away
    const bookingRefEl = page.locator('.booking-ref').first();
    await expect(bookingRefEl).toBeVisible();
    const bookingRef = (await bookingRefEl.innerText()).trim();

    //Steps 3–5 — Identical to Test 1
    await page.getByRole('link', { name: 'View My Bookings' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);
    await page.getByRole('link', { name: 'View Details' }).first().click();
    await expect(page.getByText('Booking Information')).toBeVisible();

    const eventTitle = (await page.locator('h1').first().innerText()).trim();
    expect(bookingRef.charAt(0).toUpperCase()).toBe(eventTitle.charAt(0).toUpperCase());

    await page.getByRole('button', { name: 'Check eligibility for refund?' }).click();
    await expect(page.locator("#refund-spinner")).toBeVisible();
    await expect(page.locator("#refund-spinner")).not.toBeVisible({timeout: 6000});


    // Step 6 — Validate result
    const result = page.locator('#refund-result');
    await expect(result).toBeVisible();
    await expect(result).toContainText("Not eligible for refund");
    await expect(result).toContainText("Group bookings (3 tickets) are non-refundable");
});
