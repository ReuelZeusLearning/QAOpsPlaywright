# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ClientAppRewritten.spec.js >> @Webst Client App login
- Location: tests\ClientAppRewritten.spec.js:6:1

# Error details

```
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Login' })
    - locator resolved to <input id="login" name="login" type="submit" value="Login" _ngcontent-rdw-c43="" class="btn btn-block login-btn"/>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - performing click action

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e5]:
    - generic [ref=e7]:
      - link "Automation Automation Practice":
        - /url: ""
        - generic [ref=e8]:
          - heading "Automation" [level=3] [ref=e9]
          - paragraph [ref=e10]: Automation Practice
    - text: 
    - link "🎯 I'll help you prepare for your next QA job — Explore the QA Career Accelerator." [ref=e11] [cursor=pointer]:
      - /url: https://rahulshettyacademy.com/qa-career-accelerator-job-ready
    - list [ref=e12]:
      - listitem [ref=e13] [cursor=pointer]:
        - button " HOME" [ref=e14]:
          - generic [ref=e15]: 
          - text: HOME
      - listitem
      - listitem [ref=e16] [cursor=pointer]:
        - button " ORDERS" [ref=e17]:
          - generic [ref=e18]: 
          - text: ORDERS
      - listitem [ref=e19] [cursor=pointer]:
        - button " Cart" [ref=e20]:
          - generic [ref=e21]: 
          - text: Cart
      - listitem [ref=e22] [cursor=pointer]:
        - button "Sign Out" [ref=e23]:
          - generic [ref=e24]: 
          - text: Sign Out
  - text:    
  - generic [ref=e25]:
    - paragraph [ref=e26]: Home | Search
    - heading "Filters" [level=4] [ref=e28]
    - generic [ref=e29]:
      - textbox "search" [ref=e31]
      - generic [ref=e32]:
        - heading "Price Range" [level=6] [ref=e33]
        - generic [ref=e34]:
          - textbox "Min Price" [ref=e36]
          - textbox "Max Price" [ref=e38]
      - generic [ref=e39]:
        - heading "Categories" [level=6] [ref=e40]
        - generic [ref=e42]: 
        - generic [ref=e43]:
          - checkbox [ref=e44]
          - generic [ref=e45]: fashion
        - generic [ref=e46]:
          - checkbox [ref=e47]
          - generic [ref=e48]: electronics
        - generic [ref=e49]:
          - checkbox [ref=e50]
          - generic [ref=e51]: household
      - generic [ref=e52]:
        - heading "Sub Categories" [level=6] [ref=e53]
        - generic [ref=e55]: 
        - generic [ref=e56]:
          - checkbox [ref=e57]
          - generic [ref=e58]: t-shirts
        - generic [ref=e59]:
          - checkbox [ref=e60]
          - generic [ref=e61]: shirts
        - generic [ref=e62]:
          - checkbox [ref=e63]
          - generic [ref=e64]: shoes
        - generic [ref=e65]:
          - checkbox [ref=e66]
          - generic [ref=e67]: mobiles
        - generic [ref=e68]:
          - checkbox [ref=e69]
          - generic [ref=e70]: laptops
      - generic [ref=e71]:
        - heading "Search For" [level=6] [ref=e72]
        - generic [ref=e74]: 
        - generic [ref=e75]:
          - checkbox [ref=e76]
          - generic [ref=e77]: men
        - generic [ref=e78]:
          - checkbox [ref=e79]
          - generic [ref=e80]: women
  - generic [ref=e81]:
    - generic [ref=e82]:
      - generic [ref=e83]:
        - generic [ref=e84]: Showing 3 results |
        - generic [ref=e85]: User can only see maximum 9 products on a page
      - generic [ref=e86]:
        - generic [ref=e88]:
          - img [ref=e89]
          - generic [ref=e90]:
            - heading "ADIDAS ORIGINAL" [level=5] [ref=e91]
            - generic [ref=e93]: $ 11500
            - button "View" [ref=e94] [cursor=pointer]:
              - generic [ref=e95]: 
              - text: View
            - button " Add To Cart" [ref=e96] [cursor=pointer]:
              - generic [ref=e97]: 
              - text: Add To Cart
        - generic [ref=e99]:
          - img [ref=e100]
          - generic [ref=e101]:
            - heading "ZARA COAT 3" [level=5] [ref=e102]
            - generic [ref=e104]: $ 11500
            - button "View" [ref=e105] [cursor=pointer]:
              - generic [ref=e106]: 
              - text: View
            - button " Add To Cart" [ref=e107] [cursor=pointer]:
              - generic [ref=e108]: 
              - text: Add To Cart
        - generic [ref=e110]:
          - img [ref=e111]
          - generic [ref=e112]:
            - heading "iphone 13 pro" [level=5] [ref=e113]
            - generic [ref=e115]: $ 55000
            - button "View" [ref=e116] [cursor=pointer]:
              - generic [ref=e117]: 
              - text: View
            - button " Add To Cart" [ref=e118] [cursor=pointer]:
              - generic [ref=e119]: 
              - text: Add To Cart
    - list "Pagination" [ref=e124]:
      - listitem [ref=e125]:
        - text: «
        - generic [ref=e126]:
          - text: Previous
          - generic [ref=e127]: page
      - listitem [ref=e128]:
        - generic [ref=e129]: You're on page
        - text: "1"
      - listitem [ref=e130]:
        - generic [ref=e131]:
          - text: Next
          - generic [ref=e132]: page
        - text: »
  - generic [ref=e133]: Design and Developed By - Kunal Sharma
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | 
  3  | 
  4  | 
  5  | 
  6  | test('@Webst Client App login', async ({ page }) => {
  7  |    //js file- Login js, DashboardPage
  8  |    const email = "anshikaw@yahoo.com";
  9  |    const productName = 'ZARA COAT 3';
  10 |    const products = page.locator(".card-body");
  11 |    await page.goto("https://rahulshettyacademy.com/client");
  12 |    await page.getByPlaceholder("email@example.com").fill(email);
  13 |    await page.getByPlaceholder("enter your passsword").fill("Learning@830$3mK3");
> 14 |    await page.getByRole("button", {name: "Login"}).click();
     |                                                    ^ TimeoutError: locator.click: Timeout 10000ms exceeded.
  15 |    await page.waitForLoadState('networkidle');
  16 |    await page.locator(".card-body b").first().waitFor();
  17 |    const titles = await page.locator(".card-body b").allTextContents();
  18 |    console.log(titles); 
  19 | 
  20 |    await page.locator(".card-body").filter({hasText: "ZARA COAT 3"}).getByRole("button", {name: "Add To Cart"}).click();
  21 |    await page.getByRole("listitem").getByRole("button", {name: "Cart"}).click();
  22 |    //await page.pause();
  23 | 
  24 |    await page.locator("div li").first().waitFor();
  25 |    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
  26 |    await page.getByRole("button", {name: "Checkout"}).click();
  27 | 
  28 | 
  29 |    const cardname = "reuel";
  30 |    const cvvno = 123;
  31 |    const ccn="4542 9931 9292 2293";
  32 |    const expdatedd1=page.locator('select.input').first();
  33 |    const expdatedd2=page.locator('select.input').last();
  34 |    const expdatedd1opt = expdatedd1.locator('option');
  35 |    const expdatedd2opt = expdatedd2.locator('option');
  36 |    for (let i=0;i<await expdatedd1opt.count();++i) {
  37 |       const text = await expdatedd1opt.nth(i).textContent();
  38 |       if (text === "03") {
  39 |          await expdatedd1.selectOption({ index: i });
  40 |          break;
  41 |       }
  42 |    }
  43 |    for (let i=0;i<await expdatedd2opt.count();++i) {
  44 |       const text = await expdatedd2opt.nth(i).textContent();
  45 |       if (text === "16") {
  46 |          await expdatedd2.selectOption({ index: i });
  47 |          break;
  48 |       }
  49 |    }
  50 | 
  51 |    await page.locator('.field', { hasText: 'Name on Card' }).locator('input').fill(cardname);
  52 |    await page.locator('.field', { hasText: 'CVV Code ' }).locator('input').fill(cvvno.toString());
  53 |    await expect(page.locator('.field', { hasText: 'Credit Card Number ' }).locator('input')).toHaveValue(ccn);
  54 | 
  55 | 
  56 | 
  57 |    await page.getByPlaceholder("Select Country").pressSequentially("ind");
  58 |    await page.getByRole("button", {name: " India"}).nth(1).click();
  59 | 
  60 |    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
  61 |    await page.getByText("PLACE ORDER").click();
  62 |    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
  63 |    
  64 |    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  65 |    console.log(orderId);
  66 | 
  67 |    await page.locator("button[routerlink*='myorders']").click();
  68 |    await page.locator("tbody").waitFor();
  69 |    const rows = await page.locator("tbody tr");
  70 | 
  71 | 
  72 |    for (let i = 0; i < await rows.count(); ++i) {
  73 |       const rowOrderId = await rows.nth(i).locator("th").textContent();
  74 |       if (orderId.includes(rowOrderId)) {
  75 |          await rows.nth(i).locator("button").first().click();
  76 |          break;
  77 |       }
  78 |    }
  79 |    const orderIdDetails = await page.locator(".col-text").textContent();
  80 |    expect(orderId.includes(orderIdDetails)).toBeTruthy();
  81 | 
  82 | });
  83 | 
  84 | 
  85 | 
  86 | 
  87 | 
  88 | 
  89 | 
  90 | 
  91 | 
```