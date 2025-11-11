///<reference types="cypress"/>

describe("Test with APIS", () => {
  it.only("Create and Delete Article API Headless Authorization", () => {
    cy.loginToApp();
    cy.get("@accessToken").then((accessToken) => {
      cy.request({
        url: "https://conduit-api.bondaracademy.com/api/articles/",
        method: "POST",
        body: {
          article: {
            title: "Test title Cypress -API",
            description: "Some description",
            body: "This is a body",
            tagList: ["testTag"],
          },
        },
        headers: { Authorization: "Token " + accessToken },
      }).then((response) => {
        expect(response.status).to.equal(201);
        expect(response.body.article.title).to.equal("Test title Cypress -API");
      });
      cy.request({
        url: "https://conduit-api.bondaracademy.com/api/articles?limit=1&offset=0",
        method: "GET",
        headers: { Authorization: "Token " + accessToken },
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.articles[0].title).to.equal(
          "Test title Cypress -API"
        );
        const slugId = response.body.articles[0].slug;
        cy.request({
          url: `https://conduit-api.bondaracademy.com/api/articles/${slugId}`,
          method: "DELETE",
          headers: { Authorization: "Token " + accessToken },
        }).then((response) => {
          expect(response.status).to.equal(204);
        });
        cy.request({
          url: "https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0",
          method: "GET",
          headers: { Authorization: "Token " + accessToken },
        }).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body.articles[0].title).to.not.equal(
            "Test title Cypress -API"
          );
        });
      });
    });
  });
});
