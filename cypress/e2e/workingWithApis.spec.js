///<reference types="cypress"/>

describe("Test with APIS", () => {
  it("Firs API test", () => {
    cy.visit("/");
    cy.intercept("GET", "**/tags", {
      fixture: "tags.json",
    });
    cy.intercept("GET", "**/articles?limit=10&offset=0", {
      fixture: "articles.json",
    });
    cy.loginToApp();
  });

  it("Intercept modify API response", () => {
    cy.visit("/");
    cy.intercept("GET", "**/articles?limit=10&offset=0", (req) => {
      req.continue((res) => {
        res.body.articles[0].favoritesCount = 9999999;
        res.send(res.body);
      });
    });
    cy.loginToApp();
    cy.get("app-favorite-button").first().should("contain.text", "9999999");
  });
  it("Intercept API response using RouteMatcher", () => {
    cy.visit("/");
    cy.intercept(
      { method: "GET", pathname: "tags" },
      {
        fixture: "tags.json",
      }
    );
    cy.loginToApp();
  });
  it("verify correct request and response", () => {
    cy.contains("New Article").click();
    cy.get('[placeholder="Article Title"]').type("New Post");
    cy.get('[formcontrolname="description"]').type("New Description");
    cy.get("textarea").type("Test");
    cy.get('[placeholder="Enter tags"]').type("NewTest");
    cy.get("button").contains(".btn-primary", "Publish Article").click();
  });
  it("Waiting for AP response", () => {
    cy.visit("/");
    cy.loginToApp();
    cy.intercept("GET", "**/articles*").as("articleAPICall");
    cy.wait("@articleAPICall").then((articleObject) => {
      expect(articleObject.response.body.articles[0].title).to.contain(
        "New Post"
      );
    });
    cy.get("app-article-list")
      .invoke("text")
      .then((allArticleTexts) => {
        expect(allArticleTexts).to.contain("Bondar Academy");
      });
  });

  it("Delete Article", () => {
    cy.request({
      url: "https://conduit-api.bondaracademy.com/api/users/login",
      method: "POST",
      body: {
        user: {
          email: "cyTestAle1@test.com",
          password: "Zf743563eKqVs@d",
        },
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      const accessToken = "Token " + response.body.user.token;

      cy.request({
        url: "https://conduit-api.bondaracademy.com/api/articles/",
        method: "POST",
        body: {
          article: {
            title: "Test title Cypress -3",
            description: "Some description",
            body: "This is a body",
            tagList: ["testTag"],
          },
        },
        headers: { Authorization: accessToken },
      }).then((response) => {
        expect(response.status).to.equal(201);
        expect(response.body.article.title).to.equal("Test title Cypress -3");
      });
    });
    cy.loginToApp();
    cy.contains("Test title Cypress -3").click();
    cy.intercept("GET", "**/articles*").as("artcileApiCall");
    cy.contains("button", "Delete Article").first().click();
    cy.wait("@artcileApiCall");
    cy.get("app-article-list").should("not.contain.text", "Test title Cypress -3");
  });
});
