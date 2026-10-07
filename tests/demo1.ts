import { expect, type Locator, type Page } from '@playwright/test';

let message1: string = "test message";
message1="test 2";
console.log(message1);

let age1: number = 25;
age1=26;
console.log(age1);

let isActive1: boolean = true;
console.log(isActive1);

let numbers1: number[] = [1,2,3,4,5];
console.log(numbers1);

let data1: any = { name: "John", age: 30 };
data1 = { name: "Jane", age: 25 };
console.log(data1);

function add(a: number,b: number): number
{
    return a+b;
}
console.log(add(5, 3));

let user1: { name: string, age: number, location: string } = { name: "Alice", age: 28, location: "location" };
console.log(user1);

class CartPage
{
    page: Page;
    cartProducts: Locator;
    productsText: Locator;
    cart: Locator;
    orders: Locator;
    checkout: Locator;

constructor(page: Page)
{
    this.page = page;
    this.cartProducts = page.locator("div li").first();
    this.productsText = page.locator(".card-body b");
    this.cart =  page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
    this.checkout = page.locator("text=Checkout");

}
};

console.log(CartPage);