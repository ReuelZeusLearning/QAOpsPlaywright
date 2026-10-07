class LoginUtils {

    constructor(page) {
        this.page = page;
    }

    async login(username = 'standard_user', password = 'secret_sauce') {
        await this.page.goto("https://www.saucedemo.com/");
        await this.page.getByPlaceholder("Username").fill(username);
        await this.page.getByPlaceholder("Password").fill(password);
        await this.page.locator(".submit-button").click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = { LoginUtils };
