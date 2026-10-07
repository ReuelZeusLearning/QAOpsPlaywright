export class HomePage {
    constructor(page) {
        this.page = page;
        this.swagLabsHeader = page.getByText("Swag Labs");
        this.productsTitle = page.locator(".title");
        this.menuButton = page.getByRole("button", { name: "Open Menu" });
        this.logoutLink = page.locator("#logout_sidebar_link");
    }
}
