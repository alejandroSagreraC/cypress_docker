///<reference types="cypress"/>
describe("Test DDT", () => {
  const testData = [
    {
      username: "12",
      erroMessage: "username is too short (minimum is 3 characters)",
      errorIsDisplayed: true,
    },
    {
      username: "123",
      erroMessage: "username",
      errorIsDisplayed: false,
    },
    {
      username: "12345678901234567890",
      erroMessage: "username",
      errorIsDisplayed: false,
    },
    {
      username: "123456789012345678901",
      erroMessage: "username is too long (maximum is 20 characters)",
      errorIsDisplayed: true,
    },
  ];

  testData.forEach((data) => {
    it(`Data Driven for ${data.username}`, () => {
      cy.visit("/");
      cy.contains("Sign up").click();
      cy.get('[placeholder="Username"]').type(data.username);
      cy.get('[formcontrolname="email"]').type("12");
      cy.get('[placeholder="Password"]').type("12");
      cy.contains("button", "Sign up").click();
      if (data.errorIsDisplayed) {
        cy.get(".error-messages").should("contain.text", data.erroMessage);
      }else{
         cy.get(".error-messages").should("not.contain.text", data.erroMessage);
      }
    });
  });
});
