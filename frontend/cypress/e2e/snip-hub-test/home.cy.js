/// <reference types="cypress" />

describe('Home Page testing', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })
    context("Home Page components testing", () => {
        it("Should copy text", () => {
            cy.get("button.copy-btn").click({ multiple: true })
                .last().should("have.text", "copied")
        })
        it("Input should work", () => {
            cy.wait(100);
            cy.get("input#search").type("hello").should("have.value", "hello");
            cy.get("button#search-btn").click().location("href").should("eq", "http://localhost:3000/search/hello");
        })
        it("Go to search page and come back", () => {
            cy.get("input#search").type("hello{enter}").location("href").should("contain", "http://localhost:3000/search/hello");
            cy.get("button#go-back").click().location("pathname").should("eq", "/");
        })
    });
    context("Navbar Testing", () => {
        it("Navbar open", () => {
            cy.get("button#menu").click();
            cy.get("div.navbar-list").should("have.class", "h-{165px}");
        })
        it("Navbar toggle", () => {
            cy.get("button#menu").click();
            cy.get("div.navbar-list").should("have.class", "h-{165px}");
            cy.get("button#menu").click();
            cy.get("div.navbar-list").should("have.class", "h-0");
        })
        it("Go to About page", () => {
            cy.get("button#menu").click();
            cy.get("div.navbar-list").should("have.class", "h-{165px}");
            cy.get("a[href='/about']").click().location("pathname").should("eq", "/about");
            cy.get("button#menu").click();
        })
    })
})