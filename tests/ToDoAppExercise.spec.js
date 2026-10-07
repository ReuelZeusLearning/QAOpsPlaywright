const { test, expect } = require('@playwright/test');

const TODO_URL = 'https://todomvc.com/examples/react/dist/#/';

test.describe('TodoMVC - Dynamic Assertions', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(TODO_URL);
  });

 test('Add a single todo', async ({ page }) => {
    const todoInput = page.getByPlaceholder('What needs to be done?');
    const todoItems = page.locator('.todo-list li');

    await todoInput.fill('Buy groceries');
    await todoInput.press('Enter');

    await expect(todoItems).toHaveCount(1);
    await expect(todoItems.first()).toContainText('Buy groceries');
  });

  test('Add multiple todos', async ({ page }) => {
    const todoInput = page.getByPlaceholder('What needs to be done?');
    const todoItems = page.locator('.todo-list li');

    const todos = ["item 1", "item 2", "item 3"];
    for (let i = 0; i < todos.length; i++) {
      await todoInput.fill(todos[i]);
      await todoInput.press('Enter');
    }
    await expect(todoItems).toHaveCount(todos.length);

    for(let i = 0; i < todos.length; i++) {
        await expect(todoItems.nth(i)).toContainText(todos[i]);
    }
  });

  test('Remove a todo', async ({ page }) => {
    const todoInput = page.getByPlaceholder('What needs to be done?');
    const todoItems = page.locator('.todo-list li');

    await todoInput.fill('Task to delete');
    await todoInput.press('Enter');

    await expect(todoItems).toHaveCount(1);

    await todoItems.first().hover();
    await todoItems.first().locator('.destroy').click();
    await expect(todoItems).toHaveCount(0);
    await expect(page.locator(".footer")).not.toBeVisible();
  });
});

test.describe('Problem 1 - Element Not Available', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(TODO_URL);
  });

  // BAD - footer does not exist yet, assertion times out and fails
  test('BAD - assert footer before adding any todos', async ({ page }) => {
    await expect(page.locator('.todo-count')).toBeVisible({ timeout: 3000 });
  });

  // GOOD - add a todo first so the footer is rendered
  test('GOOD - add todo first then assert footer', async ({ page }) => {
    const todoInput = page.getByPlaceholder('What needs to be done?');
    const todoItems = page.locator('.todo-list li');

    await todoInput.fill('New Task');
    await todoInput.press('Enter');

    await expect(todoItems).toHaveCount(1);
    await expect(page.locator(".todo-count")).toBeVisible();
    await expect(page.locator(".todo-count")).toContainText('1 item left');
    await expect(page.locator(".footer")).toBeVisible();
  });

});

test.describe('Problem 2 - Non Retrying Assertions', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(TODO_URL);
    });

     // BAD - count() is a snapshot, plain expect() does not retry
     test('BAD - using count() snapshot with plain expect', async ({ page }) => {
        const todoInput = page.getByPlaceholder('What needs to be done?');
        const todoItems = page.locator('.todo-list li');

        await todoInput.fill('New Task');
        await todoInput.press('Enter');
        await expect(page.locator(".todo-count")).toBeVisible();

        const count = await todoItems.count();
        expect(count).toBe(2);
     });

     // GOOD - toHaveCount() retries until the count matches or timeout
     test('GOOD - using toHaveCount() with retry', async ({ page }) => {
        const todoInput = page.getByPlaceholder('What needs to be done?');
        const todoItems = page.locator('.todo-list li');

        await todoInput.fill('New Task');
        await todoInput.press('Enter');
        await expect(page.locator(".todo-count")).toBeVisible();

        await expect(todoItems).toHaveCount(1);
     });

});

test.describe('Problem 3 - Using then.catch', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(TODO_URL);
    });

    // BAD - assertion inside .then() fails but .catch() swallows the error
    // test silently PASSES even though the assertion is wrong

    test('BAD - assertion error swallowed by catch', async ({ page }) => {
        const todoInput = page.getByPlaceholder('What needs to be done?');
        const todoItems = page.locator('.todo-list li');

        await todoInput.fill('New Task');
        await todoInput.press('Enter');

        // BAD - using then.catch to handle assertion
        await todoItems.count().then(count => {
            expect(count).toBe(2);
        }).catch(err => {
            console.log('Assertion failed but was caught:', err);
        });
    });

    // GOOD - await every assertion so failures propagate to the test runner
    test('GOOD - using await with assertion', async ({ page }) => {
        const todoInput = page.getByPlaceholder('What needs to be done?');
        const todoItems = page.locator('.todo-list li');

        await todoInput.fill('New Task');
        await todoInput.press('Enter');

        await expect(todoItems).toHaveCount(1);
        await expect(todoItems.first()).toContainText('New Task');
    });
});

