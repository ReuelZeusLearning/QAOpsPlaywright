const { test, expect, request } = require('@playwright/test');
const { login, loginAndGoToBooking, loginAndGoToEvents, loginAs, USER_A, USER_B } = require('../utils/EventHubLogin');

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const API_URL = 'https://api.eventhub.rahulshettyacademy.com/api';

test('User B cannot access User A booking', async ({ page, request }) => {

  // Step 1 — Login as Yahoo user via API
  const loginRes = await request.post('https://api.eventhub.rahulshettyacademy.com/api/auth/login', {
    data: { email: USER_A.email, password: USER_A.password }
  });
  expect(loginRes.ok()).toBeTruthy();
  const loginResJson = await loginRes.json();
  const token = loginResJson.token;

  // Step 2 — Fetch events via API to get a valid event ID
    const eventRes = await request.get('https://api.eventhub.rahulshettyacademy.com/api/events', {
    headers: { 'Authorization': `Bearer ${token}`}});
    expect(eventRes.ok()).toBeTruthy();
    const eventResJson = await eventRes.json();
    const eventId = eventResJson.data[0].id;

  // Step 3 — Create a booking via API as Yahoo user
  const bookingRes = await request.post('https://api.eventhub.rahulshettyacademy.com/api/bookings', {
    headers: {'Authorization': `Bearer ${token}`},
    data: { 
        eventId: eventId, 
        customerName: 'Yahoo User', 
        customerEmail: USER_A.email,
        customerPhone: '1234567890',
        quantity: 1,
    }
  });
    expect(bookingRes.ok()).toBeTruthy();
    const bookingResJson = await bookingRes.json();
    const yahooBookingId= bookingResJson.data.id;

  // Step 4 — Login as Gmail user via browser UI
  await loginAs(page, USER_B);

  // Step 5 — Navigate to Yahoo's booking URL as Gmail user
  await page.goto(`${BASE_URL}/bookings/${yahooBookingId}`, { waitUntil: 'networkidle' });

  // Step 6 — Validate Access Denied
  await expect(page.getByText('Access Denied')).toBeVisible();
  await expect(page.getByText('You are not authorized to view this booking')).toBeVisible();

}); 