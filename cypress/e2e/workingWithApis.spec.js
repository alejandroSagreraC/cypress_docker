/// <reference types="cypress" />
import { faker } from "@faker-js/faker";
beforeEach(() => {
  cy.loginToApp();
});

it("first test", { tags: "@smoke" }, () => {
  cy.intercept({ method: "GET", pathname: "tags" }, { fixture: "tags.json" });
  cy.intercept("GET", "**/articles*", { fixture: "articles.json" });
});

it("modify api response", { retries: 2 }, () => {
  cy.intercept("GET", "**/articles*", (req) => {
    req.continue((res) => {
      res.body.articles[0].favoritesCount = 9999999;
      res.send(res.body);
    });
  });
  cy.get("app-favorite-button").first().should("contain.text", "9999999");
});

it("waiting for apis", () => {
  cy.intercept("GET", "**/articles*").as("artcileApiCall");
  cy.wait("@artcileApiCall").then((apiArticleObject) => {
    expect(apiArticleObject.response.body.articles[0].title).to.contain(
      "Bondar Academy"
    );
  });
  cy.get("app-article-list")
    .invoke("text")
    .then((allArticleTexts) => {
      expect(allArticleTexts).to.contain("Bondar Academy");
    });
});

it("delete article", { tags: "@smoke" },() => {
  const titleOfTheArticle = faker.person.fullName();
  cy.get("@accessToken").then((accessToken) => {
    cy.request({
      url: Cypress.env("api_url") + "/articles/",
      method: "POST",
      body: {
        article: {
          title: titleOfTheArticle,
          description: faker.person.jobTitle(),
          body: faker.lorem.paragraph(10),
          tagList: [],
        },
      },
      headers: { Authorization: "Token " + accessToken },
    }).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.article.title).to.equal(titleOfTheArticle);
    });
  });
  cy.loginToApplication();
  cy.intercept("GET", "**/articles*").as("artcileApiCall");
  cy.wait("@artcileApiCall");
  cy.contains(titleOfTheArticle).click();
  cy.contains("button", "Delete Article").first().click();
  cy.get("app-article-list").should("not.contain.text", titleOfTheArticle);
});

it("api testing", () => {
  const accessToken = "Token " + Cypress.env("token");
  cy.request({
    url: Cypress.env("api_url") + "/articles/",
    method: "POST",
    body: {
      article: {
        title: "Test title Cypress API Testing",
        description: "Some description",
        body: "This is a body",
        tagList: [],
      },
    },
    headers: { Authorization: accessToken },
  }).then((response) => {
    expect(response.status).to.equal(201);
    expect(response.body.article.title).to.equal(
      "Test title Cypress API Testing"
    );
  });

  cy.request({
    url: Cypress.env("api_url") + "/articles?limit=10&offset=0",
    method: "GET",
    headers: { Authorization: accessToken },
  }).then((response) => {
    expect(response.status).to.equal(200);
    expect(response.body.articles[0].title).to.equal(
      "Test title Cypress API Testing"
    );
    const slugID = response.body.articles[0].slug;

    cy.request({
      url: `${Cypress.env("api_url")}/articles/${slugID}`,
      method: "DELETE",
      headers: { Authorization: accessToken },
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
      "Test title Cypress API Testing"
    );
  });
});
