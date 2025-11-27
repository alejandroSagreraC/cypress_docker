// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("loginToApp", () => {
  cy.request({
    url: "https://conduit-api.bondaracademy.com/api/users/login",
    method: "POST",
    body: {
      user: {
        email: Cypress.env("email"),
        password: Cypress.env("password"),
      },
    },
  }).then((response) => {
    expect(response.status).to.equal(200);
    const accessToken = response.body.user.token;
    Cypress.env("token", accessToken);
    cy.wrap(accessToken).as("accessToken");
    cy.visit("https://conduit.bondaracademy.com", {
      onBeforeLoad(win) {
        win.localStorage.setItem("jwToken", accessToken);
      },
    });
  });
});

Cypress.Commands.add("loginToApplication", () => {
  cy.visit("/");
  cy.contains("Sign in").click();
  cy.get('[placeholder="Email"]').type(Cypress.env("email"));
  cy.get('[placeholder="Password"]').type(Cypress.env("password"));
  cy.contains("button", "Sign in").click();
}); 

Cypress.Commands.add("uiLogin", () => {
  cy.session("user", () => {
    cy.visit("/");
    cy.contains("Sign in").click();
    cy.get('[placeholder="Email"]').type(Cypress.env("email"));
    cy.get('[placeholder="Password"]').type(Cypress.env("password"));
    cy.contains("button", "Sign in").click();
    cy.location('pathname').should('eq','/')
  },
{
  cacheAcrossSpecs:true //allows to use the session across files
});
  cy.visit("/");
});
