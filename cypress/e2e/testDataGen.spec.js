///<reference types="cypress"/>
import { faker } from "@faker-js/faker";

describe("Test with APIS - Test Data Generator", () => {
  it("Using Faker JS", () => {
    cy.loginToApp();
    const personName = faker.person.fullName();
    cy.get("@accessToken").then((accessToken) => {
      cy.request({
        url: Cypress.env("api_url") + "/articles/",
        method: "POST",
        body: {
          article: {
            title: personName,
            description: faker.person.jobTitle(),
            body: faker.lorem.paragraph(10),
            tagList: ["test"],
          },
        },
        headers: { Authorization: "Token "+accessToken },
      }).then((response) => {
        expect(response.status).to.equal(201);
        expect(response.body.article.title).to.equal(personName);
      });
      cy.request({
        url: Cypress.env("api_url") + "/articles?limit=10&offset=0",
        method: "GET",
        headers: { Authorization: "Token "+accessToken },
      }).then((response) => {
        expect(response.status).to.equal(200);
      });
    });
  });
});
