/// <reference types="cypress" />

describe("About page testing", () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })
    it("Go to About page", () => {

        cy.get("button#menu").click();
        cy.get("div.navbar-list").should("have.class", "h-{165px}");
        cy.get("a[href='/about']").click().location("pathname").should("eq", "/about");
        cy.get("button#menu").click();
    })

    it("Links check", () => {
        cy.get("button#menu").click();
        cy.get("div.navbar-list").should("have.class", "h-{165px}");
        cy.get("a[href='/about']").click().location("pathname").should("eq", "/about");
        cy.get("button#menu").click();
        let arr = ["highlightjs.org", "vuejs.org", "typescriptlang.org", "vitejs.dev", "tailwindcss.com", "nuxt.com"]

        cy.wrap(arr).each((item, index) => {
            cy.get("a.goto-sites").eq(index).invoke("attr", "href").should("eq", `https://${item}`);
        })
    })
})