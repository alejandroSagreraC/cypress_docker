///<reference types="cypress"/>

describe("Test with APIS", () => {
  it("Delete Article", () => {
    cy.loginToApp();
    cy.get("@accessToken").then((accessToken) => {
      cy.request({
        url: Cypress.env("api_url") + "/articles/",
        method: "POST",
        body: {
          article: {
            title: "Test title Cypress -API",
            description: "Some description",
            body: "This is a body",
            tagList: ["testTag"],
          },
        },
        headers: { Authorization: "Token "+accessToken },
      }).then((response) => {
        expect(response.status).to.equal(201);
        expect(response.body.article.title).to.equal("Test title Cypress -API");
      });
      cy.request({
        url: Cypress.env("api_url") + "/articles?limit=1&offset=0",
        method: "GET",
        headers: { Authorization: "Token "+accessToken },
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.articles[0].title).to.equal(
          "Test title Cypress -API"
        );
        const slugId = response.body.articles[0].slug;
        console.log(slugId);
        cy.request({
          url: Cypress.env("api_url") + `/articles/${slugId}`,
          method: "DELETE",
          headers: { Authorization: "Token "+accessToken },
        }).then((response) => {
          expect(response.status).to.equal(204);
        });
      });
      cy.request({
        url: Cypress.env("api_url") + "/articles?limit=10&offset=0",
        method: "GET",
        headers: { Authorization: accessToken },
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.articles[0].title).to.not.equal(
          "Test title Cypress -API"
        );
      });
    });
  });
});
