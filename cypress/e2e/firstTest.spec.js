///<reference types="cypress"/>
describe("Test with backend", () => {
  beforeEach("login to app", () => {
    cy.uiLogin();
  });
  it("verify correct request and response",{ tags: "@smoke" }, () => {
    cy.contains("New Article").click();
    cy.get('[placeholder="Article Title"]').type("New Post");
    cy.get('[formcontrolname="description"]').type("New Description");
    cy.get("textarea").type("Test");
    cy.get('[placeholder="Enter tags"]').type("NewTest");
    cy.get("button").contains(".btn-primary", "Publish Article").click();
  });
  it("verify correct request and response", () => {
    cy.contains("New Article").click();
    cy.get('[placeholder="Article Title"]').type("New Post");
    cy.get('[formcontrolname="description"]').type("New Description");
    cy.get("textarea").type("Test");
    cy.get('[placeholder="Enter tags"]').type("NewTest");
    cy.get("button").contains(".btn-primary", "Publish Article").click();
  });
});
