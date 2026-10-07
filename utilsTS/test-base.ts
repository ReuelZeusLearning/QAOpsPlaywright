// const base = require('@playwright/test');
import { test as base } from '@playwright/test';
interface TestDataForOrder {
    username: string;
    password: string;
    productName: string;
}

export const customtest1 = base.extend<{testDataForOrder: TestDataForOrder}>(
{
testDataForOrder :    {
    username : "anshikaw@gmail.com",
    password : "Learning@830$3mK3",
    productName:"ADIDAS ORIGINAL"
    
    }

}

)




