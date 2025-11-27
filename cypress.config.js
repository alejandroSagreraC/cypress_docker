const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    email: "cyTestAle1@test.com",
    password: "Zf743563eKqVs@d",
    api_url: "https://conduit-api.bondaracademy.com/api",
  },
  viewportHeight: 1080,
  viewportWidth: 1920,
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    configFile: "cypress/reporter-config.json",
  },
  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      const { plugin: cypressGrepPlugin } = require("@cypress/grep/plugin");
      cypressGrepPlugin(config);
      return config
      // implement node event listeners here
    },
    baseUrl: "https://conduit.bondaracademy.com/",
    specPattern: "cypress/e2e/**/*.spec.{js,jsx,ts,tsx}",
  },
});
