"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var message1 = "test message";
message1 = "test 2";
console.log(message1);
var age1 = 25;
age1 = 26;
console.log(age1);
var isActive1 = true;
console.log(isActive1);
var numbers1 = [1, 2, 3, 4, 5];
console.log(numbers1);
var data1 = { name: "John", age: 30 };
data1 = { name: "Jane", age: 25 };
console.log(data1);
function add(a, b) {
    return a + b;
}
console.log(add(5, 3));
var user1 = { name: "Alice", age: 28, location: "location" };
console.log(user1);
var CartPage = /** @class */ (function () {
    function CartPage(page) {
        this.page = page;
        this.cartProducts = page.locator("div li").first();
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");
        this.checkout = page.locator("text=Checkout");
    }
    return CartPage;
}());
;
console.log(CartPage);
