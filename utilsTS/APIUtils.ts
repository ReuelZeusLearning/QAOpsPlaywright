export class APIUtils {
    apiContext: any;
    loginPayload: any;
    constructor(apiContext: any, loginPayload: any){
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    
    
    async getToken(){
        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {data: this.loginPayload});
           const loginResponseJson = await loginResponse.json();
           const token = loginResponseJson.token;
           console.log(token);
           return token;
    }

    async createOrder(orderPayload: any){
        let response: {token: string, orderId: string} = {token: '', orderId: ''};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
              {
              data: orderPayload, 
              headers: {
                 'Authorization': response.token,
                 'Content-Type': 'application/json'
              }
           })
           const orderResponseJson = await orderResponse.json();
           let orderId = orderResponseJson.orders[0];
           response.orderId = orderId;
           console.log(orderResponseJson);
           return response;
    }
}
