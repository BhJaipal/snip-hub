/// <reference types="cypress" />

describe('Start', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })
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
})